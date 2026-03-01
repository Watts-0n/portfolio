"use client";

import { memo, useCallback, useRef } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TiltedCardProps {
    children?: React.ReactNode;
    containerHeight?: React.CSSProperties["height"];
    containerWidth?: React.CSSProperties["width"];
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    className?: string;
    springOptions?: SpringOptions;
}

// ─── Constants ────────────────────────────────────────────────────────────────

// High stiffness + low mass = snappy response with no initial lag
const DEFAULT_SPRING: SpringOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
};

const FIGURE_BASE_CLASS =
    "relative w-full h-full [perspective:800px] flex flex-col items-center justify-center";

const MOTION_DIV_CLASS =
    "relative [transform-style:preserve-3d] w-full h-full";

// ─── Component ────────────────────────────────────────────────────────────────

function TiltedCard({
    children,
    containerHeight = "300px",
    containerWidth = "100%",
    scaleOnHover = 1.05,
    rotateAmplitude = 14,
    showMobileWarning = false,
    className = "",
    springOptions = DEFAULT_SPRING,
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);

    // Cache the bounding rect so getBoundingClientRect() is only called
    // once per hover session (on enter), not on every mousemove frame.
    const rectCache = useRef<{ left: number; top: number; halfW: number; halfH: number } | null>(null);

    // Plain motion values fed into springs — no chaining useMotionValue inside useSpring
    const rotateXRaw = useMotionValue(0);
    const rotateYRaw = useMotionValue(0);
    const scaleRaw = useMotionValue(1);

    const rotateX = useSpring(rotateXRaw, springOptions);
    const rotateY = useSpring(rotateYRaw, springOptions);
    const scale = useSpring(scaleRaw, springOptions);

    // ── Handlers ──────────────────────────────────────────────────────────────

    const handleMouseEnter = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        // Cache rect once — avoids forced layout reflow on every mousemove
        const { left, top, width, height } = el.getBoundingClientRect();
        rectCache.current = { left, top, halfW: width / 2, halfH: height / 2 };
        scaleRaw.set(scaleOnHover);
    }, [scaleRaw, scaleOnHover]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            const r = rectCache.current;
            if (!r) return;
            rotateXRaw.set(((e.clientY - r.top - r.halfH) / r.halfH) * -rotateAmplitude);
            rotateYRaw.set(((e.clientX - r.left - r.halfW) / r.halfW) * rotateAmplitude);
        },
        [rotateAmplitude, rotateXRaw, rotateYRaw]
    );

    const handleMouseLeave = useCallback(() => {
        rectCache.current = null;
        scaleRaw.set(1);
        rotateXRaw.set(0);
        rotateYRaw.set(0);
    }, [scaleRaw, rotateXRaw, rotateYRaw]);

    // ── Render ─────────────────────────────────────────────────────────────────

    return (
        <figure
            ref={ref}
            className={`${FIGURE_BASE_CLASS}${className ? ` ${className}` : ""}`}
            style={{ height: containerHeight, width: containerWidth }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="presentation"
        >
            {showMobileWarning && (
                <p className="absolute top-4 text-center text-sm block sm:hidden select-none pointer-events-none">
                    This effect is not optimized for mobile. Check on desktop.
                </p>
            )}

            <motion.div
                className={MOTION_DIV_CLASS}
                style={{ rotateX, rotateY, scale, willChange: "transform" }}
            >
                {children}
            </motion.div>
        </figure>
    );
}

export default memo(TiltedCard);