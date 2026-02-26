"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ShadowSize = "none" | "sm" | "md" | "lg" | "xl" | "2xl";
type CornerSize = "sm" | "md" | "lg" | "xl";

const shadowMap: Record<ShadowSize, string> = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
    xl: "shadow-xl",
    "2xl": "shadow-2xl",
};

const cornerMap: Record<CornerSize, { size: string; t: string; b: string; l: string; r: string }> = {
    sm: { size: "size-2", t: "border-t", b: "border-b", l: "border-l", r: "border-r" },
    md: { size: "size-4", t: "border-t-2", b: "border-b-2", l: "border-l-2", r: "border-r-2" },
    lg: { size: "size-6", t: "border-t-2", b: "border-b-2", l: "border-l-2", r: "border-r-2" },
    xl: { size: "size-8", t: "border-t-[3px]", b: "border-b-[3px]", l: "border-l-[3px]", r: "border-r-[3px]" },
};

type GlassPanelProps<T extends React.ElementType = "div"> = {
    as?: T;
    corners?: boolean;
    cornerSize?: CornerSize;
    shadow?: ShadowSize;
    className?: string;
    children?: React.ReactNode;
    background?: string;
    inverted?: boolean;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

function GlassPanel<T extends React.ElementType = "div">({
    as,
    corners = true,
    cornerSize = "md",
    shadow = "xl",
    className,
    background,
    children,
    inverted = false,
    ...props
}: GlassPanelProps<T>) {
    const Tag = (as ?? "div") as React.ElementType;
    const { size, t, b, l, r } = cornerMap[cornerSize];
    const bgClass = background ? background : "bg-card/10";

    return (
        <Tag
            className={cn(
                "relative border border-border/30 z-10 backdrop-blur-md",
                shadowMap[shadow],
                className,
                bgClass
            )}
            {...props}
        >
            {corners && (
                <>
                    <span className={cn("pointer-events-none absolute top-0    left-0 ", inverted ? "border-white z-10" : "border-primary", size, t, l)} />
                    <span className={cn("pointer-events-none absolute top-0    right-0 ", inverted ? "border-white z-10" : "border-primary", size, t, r)} />
                    <span className={cn("pointer-events-none absolute bottom-0 left-0 ", inverted ? "border-white z-10" : "border-primary", size, b, l)} />
                    <span className={cn("pointer-events-none absolute bottom-0 right-0 ", inverted ? "border-white z-10" : "border-primary", size, b, r)} />
                </>
            )}
            {children}
        </Tag>
    );
}

export { GlassPanel };
export type { GlassPanelProps, ShadowSize, CornerSize };
