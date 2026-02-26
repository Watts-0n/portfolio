"use client";

import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

interface TiltedCardProps {
    children?: React.ReactNode;
    containerHeight?: React.CSSProperties['height'];
    containerWidth?: React.CSSProperties['width'];
    scaleOnHover?: number;
    rotateAmplitude?: number;
    showMobileWarning?: boolean;
    className?: string;
}

const springValues: SpringOptions = {
    damping: 30,
    stiffness: 100,
    mass: 2
};

export default function TiltedCard({
    children,
    containerHeight = '300px',
    containerWidth = '100%',
    scaleOnHover = 1.05,
    rotateAmplitude = 10,
    showMobileWarning = false,
    className = '',
}: TiltedCardProps) {
    const ref = useRef<HTMLElement>(null);
    const rotateX = useSpring(useMotionValue(0), springValues);
    const rotateY = useSpring(useMotionValue(0), springValues);
    const scale = useSpring(1, springValues);

    function handleMouse(e: React.MouseEvent<HTMLElement>) {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const offsetX = e.clientX - rect.left - rect.width / 2;
        const offsetY = e.clientY - rect.top - rect.height / 2;

        const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
        const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

        rotateX.set(rotationX);
        rotateY.set(rotationY);
    }

    function handleMouseEnter() {
        scale.set(scaleOnHover);
    }

    function handleMouseLeave() {
        scale.set(1);
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <figure
            ref={ref}
            className={`relative w-full h-full [perspective:800px] flex flex-col items-center justify-center ${className}`}
            style={{
                height: containerHeight,
                width: containerWidth
            }}
            onMouseMove={handleMouse}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showMobileWarning && (
                <div className="absolute top-4 text-center text-sm block sm:hidden">
                    This effect is not optimized for mobile. Check on desktop.
                </div>
            )}

            <motion.div
                className="relative [transform-style:preserve-3d] w-full h-full"
                style={{
                    rotateX,
                    rotateY,
                    scale
                }}
            >
                {children}
            </motion.div>
        </figure>
    );
}
