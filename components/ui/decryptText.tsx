'use client';
import {
    useEffect,
    useState,
    useRef,
    useCallback,
    ReactNode,
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
} from 'react';
import { motion } from 'motion/react';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DecryptedContentProps {
    children: ReactNode;
    /** ms between each character shuffle tick */
    speed?: number;
    /** shuffle iterations before revealing (non-sequential mode) */
    maxIterations?: number;
    /** reveal characters one-by-one inside each text node */
    sequential?: boolean;
    revealDirection?: 'start' | 'end' | 'center';
    useOriginalCharsOnly?: boolean;
    characters?: string;
    encryptedClassName?: string;
    /** 'hover' | 'view' | 'both' | 'auto' — 'auto' starts immediately on mount */
    animateOn?: 'view' | 'hover' | 'both' | 'auto';
    className?: string;
    /** Fire each text-leaf one after the other instead of all at once */
    elementByElement?: boolean;
    /** ms gap between consecutive text-leaves when elementByElement=true */
    staggerDelay?: number;
    /**
     * Loop interval in ms — after the full animation finishes, wait this many ms
     * then re-run from the beginning. 0 (default) = no loop.
     */
    loop?: number;
}

interface ScrambledTextProps {
    text: string;
    speed: number;
    maxIterations: number;
    sequential: boolean;
    revealDirection: 'start' | 'end' | 'center';
    useOriginalCharsOnly: boolean;
    characters: string;
    encryptedClassName: string;
    /** isActive AND the current cycle key bundled together */
    activeCycle: number | null; // null = inactive; number = the cycle this leaf should respond to
    /** called when this node finishes its scramble-and-reveal, passes back the cycle key */
    onDone?: (cycle: number) => void;
}

// ─── ScrambledText leaf ───────────────────────────────────────────────────────

function ScrambledText({
                           text,
                           speed,
                           maxIterations,
                           sequential,
                           revealDirection,
                           useOriginalCharsOnly,
                           characters,
                           encryptedClassName,
                           activeCycle,
                           onDone,
                       }: ScrambledTextProps) {
    // Use a single compound state so resets are atomic
    const [state, setState] = useState<{
        displayText: string;
        isScrambling: boolean;
        revealedIndices: Set<number>;
    }>({ displayText: text, isScrambling: false, revealedIndices: new Set() });

    const onDoneRef = useRef(onDone);
    useEffect(() => { onDoneRef.current = onDone; }, [onDone]);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        let currentIteration = 0;
        const cycle = activeCycle; // capture at effect entry

        const getNextIndex = (revealed: Set<number>): number => {
            const len = text.length;
            switch (revealDirection) {
                case 'start': return revealed.size;
                case 'end': return len - 1 - revealed.size;
                case 'center': {
                    const mid = Math.floor(len / 2);
                    const offset = Math.floor(revealed.size / 2);
                    const next = revealed.size % 2 === 0 ? mid + offset : mid - offset - 1;
                    if (next >= 0 && next < len && !revealed.has(next)) return next;
                    for (let i = 0; i < len; i++) if (!revealed.has(i)) return i;
                    return 0;
                }
                default: return revealed.size;
            }
        };

        const avail = useOriginalCharsOnly
            ? Array.from(new Set(text.split(''))).filter(c => c !== ' ')
            : characters.split('');

        const shuffle = (orig: string, revealed: Set<number>): string => {
            if (useOriginalCharsOnly) {
                const positions = orig.split('').map((char, i) => ({
                    char, isSpace: char === ' ', index: i, isRevealed: revealed.has(i),
                }));
                const pool = positions.filter(p => !p.isSpace && !p.isRevealed).map(p => p.char);
                for (let i = pool.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [pool[i], pool[j]] = [pool[j], pool[i]];
                }
                let ci = 0;
                return positions.map(p => p.isSpace ? ' ' : p.isRevealed ? orig[p.index] : pool[ci++]).join('');
            }
            return orig.split('').map((char, i) =>
                char === ' ' ? ' ' : revealed.has(i) ? orig[i] : avail[Math.floor(Math.random() * avail.length)]
            ).join('');
        };

        if (cycle !== null) {
            // Hard reset first so we always start from a clean slate
            setState({ displayText: text, isScrambling: true, revealedIndices: new Set() });

            // Small defer so the reset render lands before the interval fires
            const startTimer = setTimeout(() => {
                interval = setInterval(() => {
                    setState(prev => {
                        if (sequential) {
                            if (prev.revealedIndices.size < text.length) {
                                const ni = getNextIndex(prev.revealedIndices);
                                const nr = new Set(prev.revealedIndices); nr.add(ni);
                                return { ...prev, displayText: shuffle(text, nr), revealedIndices: nr };
                            } else {
                                clearInterval(interval);
                                onDoneRef.current?.(cycle!);
                                return { ...prev, isScrambling: false };
                            }
                        } else {
                            currentIteration++;
                            if (currentIteration >= maxIterations) {
                                clearInterval(interval);
                                onDoneRef.current?.(cycle!);
                                return { displayText: text, isScrambling: false, revealedIndices: new Set() };
                            }
                            return { ...prev, displayText: shuffle(text, prev.revealedIndices) };
                        }
                    });
                }, speed);
            }, 0);

            return () => {
                clearTimeout(startTimer);
                if (interval) clearInterval(interval);
            };
        } else {
            // Deactivated — reset to plain text
            setState({ displayText: text, isScrambling: false, revealedIndices: new Set() });
        }
    }, [activeCycle]); // eslint-disable-line react-hooks/exhaustive-deps
    // ↑ intentionally only re-run when activeCycle changes; other props are stable per render

    const { displayText, isScrambling, revealedIndices } = state;
    const isActive = activeCycle !== null;

    return (
        <>
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">
        {displayText.split('').map((char, i) => {
            const revealed = revealedIndices.has(i) || !isScrambling || !isActive;
            return (
                <span key={i} className={revealed ? '' : encryptedClassName}>{char}</span>
            );
        })}
      </span>
        </>
    );
}

// ─── Tree walker helpers ──────────────────────────────────────────────────────

function countLeaves(node: ReactNode): number {
    if (typeof node === 'string') return node.trim() ? 1 : 0;
    if (typeof node === 'number') return 1;
    if (isValidElement(node)) {
        const kids = (node as ReactElement<{ children?: ReactNode }>).props?.children;
        if (!kids) return 0;
        let count = 0;
        Children.forEach(kids, child => { count += countLeaves(child); });
        return count;
    }
    if (Array.isArray(node)) {
        return node.reduce<number>((acc, child) => acc + countLeaves(child), 0);
    }
    return 0;
}

function processNode(
    node: ReactNode,
    scrambleProps: Omit<ScrambledTextProps, 'text' | 'activeCycle' | 'onDone'>,
    // Map from leaf index → cycle number it's currently running (null = inactive)
    leafCycles: Map<number, number>,
    leafIndex: { current: number },
    onLeafDone: (idx: number, cycle: number) => void,
): ReactNode {
    if (typeof node === 'string') {
        if (!node.trim()) return node;
        const idx = leafIndex.current++;
        const cycle = leafCycles.get(idx) ?? null;
        return (
            <ScrambledText
                key={`leaf-${idx}`}
                text={node}
                {...scrambleProps}
                activeCycle={cycle}
                onDone={(c) => onLeafDone(idx, c)}
            />
        );
    }
    if (typeof node === 'number') {
        const idx = leafIndex.current++;
        const cycle = leafCycles.get(idx) ?? null;
        return (
            <ScrambledText
                key={`leaf-${idx}`}
                text={String(node)}
                {...scrambleProps}
                activeCycle={cycle}
                onDone={(c) => onLeafDone(idx, c)}
            />
        );
    }
    if (isValidElement(node)) {
        const el = node as ReactElement<{ children?: ReactNode }>;
        const kids = el.props?.children;
        if (kids == null) return node;
        const processed = Children.map(kids, child =>
            processNode(child, scrambleProps, leafCycles, leafIndex, onLeafDone)
        );
        return cloneElement(el, {}, ...(processed ?? []));
    }
    if (Array.isArray(node)) {
        return node.map((child, i) => (
            <span key={i}>{processNode(child, scrambleProps, leafCycles, leafIndex, onLeafDone)}</span>
        ));
    }
    return node;
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function DecryptedContent({
                                             children,
                                             speed = 50,
                                             maxIterations = 10,
                                             sequential = false,
                                             revealDirection = 'start',
                                             useOriginalCharsOnly = false,
                                             characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
                                             encryptedClassName = '',
                                             animateOn = 'hover',
                                             className = '',
                                             elementByElement = false,
                                             staggerDelay = 120,
                                             loop = 0,
                                         }: DecryptedContentProps) {
    const totalLeaves = countLeaves(children);

    // leafCycles: leaf index → the cycle number it's currently assigned (null absent = inactive)
    const [leafCycles, setLeafCycles] = useState<Map<number, number>>(new Map());
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Mutable refs — never cause re-renders
    const cycleCounter = useRef(0);      // monotonically increasing cycle ID
    const currentCycle = useRef(0);      // which cycle is currently "live"
    const doneCount = useRef(0);
    const loopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const staggerTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

    // ── internal helpers ─────────────────────────────────────────────────────────

    const clearTimers = useCallback(() => {
        staggerTimers.current.forEach(clearTimeout);
        staggerTimers.current = [];
        if (loopTimer.current) { clearTimeout(loopTimer.current); loopTimer.current = null; }
    }, []);

    const runAnimation = useCallback(() => {
        clearTimers();
        doneCount.current = 0;

        // New unique cycle ID — any onDone from a previous cycle carries the old ID and will be ignored
        cycleCounter.current += 1;
        const cycle = cycleCounter.current;
        currentCycle.current = cycle;

        if (totalLeaves === 0) return;

        if (!elementByElement) {
            const next = new Map<number, number>();
            for (let i = 0; i < totalLeaves; i++) next.set(i, cycle);
            setLeafCycles(next);
        } else {
            setLeafCycles(new Map()); // clear first
            for (let i = 0; i < totalLeaves; i++) {
                const t = setTimeout(() => {
                    setLeafCycles(prev => {
                        const next = new Map(prev);
                        next.set(i, cycle);
                        return next;
                    });
                }, i * staggerDelay);
                staggerTimers.current.push(t);
            }
        }
    }, [totalLeaves, elementByElement, staggerDelay, clearTimers]);

    const stopAnimation = useCallback(() => {
        clearTimers();
        cycleCounter.current += 1; // invalidate any in-flight onDone callbacks
        currentCycle.current = cycleCounter.current;
        doneCount.current = 0;
        setLeafCycles(new Map());
    }, [clearTimers]);

    // Called by each ScrambledText when it finishes. cycle param lets us discard stale calls.
    const onLeafDone = useCallback((leafIdx: number, cycle: number) => {
        if (cycle !== currentCycle.current) return; // stale — ignore
        doneCount.current += 1;
        if (doneCount.current >= totalLeaves && loop > 0) {
            doneCount.current = 0; // reset so it can't fire twice
            loopTimer.current = setTimeout(() => runAnimation(), loop);
        }
    }, [totalLeaves, loop, runAnimation]);

    // ── animateOn: view ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (animateOn !== 'view' && animateOn !== 'both') return;
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (e.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    runAnimation();
                }
            });
        }, { threshold: 0.1 });
        const el = containerRef.current;
        if (el) obs.observe(el);
        return () => { if (el) obs.unobserve(el); };
    }, [animateOn, hasAnimated, runAnimation]);

    // ── animateOn: auto ──────────────────────────────────────────────────────────
    useEffect(() => {
        if (animateOn !== 'auto') return;
        runAnimation();
        return () => stopAnimation();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // ── cleanup on unmount ───────────────────────────────────────────────────────
    useEffect(() => () => clearTimers(), [clearTimers]);

    // ── hover ────────────────────────────────────────────────────────────────────
    const hoverProps =
        animateOn === 'hover' || animateOn === 'both'
            ? {
                onMouseEnter: () => runAnimation(),
                onMouseLeave: () => stopAnimation(),
            }
            : {};

    // ── render ───────────────────────────────────────────────────────────────────
    const scrambleProps: Omit<ScrambledTextProps, 'text' | 'activeCycle' | 'onDone'> = {
        speed, maxIterations, sequential, revealDirection, useOriginalCharsOnly, characters, encryptedClassName,
    };

    const leafIndex = { current: 0 };
    const processed = processNode(children, scrambleProps, leafCycles, leafIndex, onLeafDone);

    return (
        <motion.div ref={containerRef} className={className} {...hoverProps}>
            {processed}
        </motion.div>
    );
}