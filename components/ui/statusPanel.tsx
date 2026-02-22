"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const METRICS = [
    { key: "CPU_LOAD", base: 95, variance: 5 },
    { key: "GPU_LOAD", base: 83, variance: 5 },
    { key: "RAM", base: 50, variance: 5 },
    { key: "MEMORY", base: 75, variance: 5 },
];

interface StatusPanelProps {
    projects: number;
}

export default function StatusPanel({ projects }:StatusPanelProps) {
    const [values, setValues] = useState(METRICS.map((m) => m.base));
    const [uptime, setUptime] = useState(99.9);
    const [tick, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setValues(
                METRICS.map((m) =>
                    Math.min(
                        100,
                        Math.max(
                            10,
                            m.base + Math.floor((Math.random() - 0.5) * 2 * m.variance)
                        )
                    )
                )
            );
        }, 1800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative h-[500px] w-full border border-border/30 bg-card/10 backdrop-blur-sm p-8 shadow-xl">
            <div className="absolute top-0 left-0 size-4 border-t-2 border-l-2 border-primary" />
            <div className="absolute top-0 right-0 size-4 border-t-2 border-r-2 border-primary" />
            <div className="absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-primary" />
            <div className="absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-primary" />

            <div className="h-full w-full flex flex-col justify-between font-mono text-xs text-muted-foreground">
                {/* Header */}
                <div className="flex justify-between">
                    <span>SYS.STATUS: NORMAL</span>
                    <span>
            UPTIME:{" "}
                        <span className="transition-all duration-700">{uptime}%</span>
          </span>
                </div>

                {/* Main content */}
                <div className="w-full flex flex-row-reverse justify-between gap-x-2">
                    {/* Image */}
                    <div className="w-[50%] relative rounded-2xl overflow-hidden ">
                        <Image src="/David2.png" alt="David" width={864} height={1184} />
                    </div>

                    {/* Metrics */}
                    <div className="w-[50%] h-full flex flex-col justify-center space-y-4">
                        {METRICS.map((metric, i) => (
                            <div
                                key={metric.key}
                                className="w-full bg-none overflow-hidden space-y-2"
                            >
                                {/* Bar container — full width track */}
                                <div className="h-1 w-full bg-primary/20 overflow-hidden">
                                    <div
                                        className="h-full bg-primary transition-all duration-700 ease-in-out"
                                        style={{ width: `${values[i]}%` }}
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span>{metric.key}</span>
                                    <span className="tabular-nums transition-all duration-700">
                    {values[i]}%
                  </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="text-right">
          <span className="block text-4xl font-bold text-foreground tabular-nums transition-all duration-500">
            {String(projects).padStart(2, "0")}
          </span>
                    <span>PROJECTS</span>
                </div>
            </div>
        </div>
    );
}