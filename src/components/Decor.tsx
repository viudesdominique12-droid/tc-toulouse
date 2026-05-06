"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function PalmTree({
  className = "",
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 200 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      <defs>
        <linearGradient id="palm-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0A0414" />
          <stop offset="100%" stopColor="#000" />
        </linearGradient>
      </defs>
      <path
        d="M100 320 Q98 240 102 160 Q105 110 108 70 Q112 40 115 18"
        stroke="url(#palm-grad)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M115 18 C 60 10, 30 30, 12 70 Q 38 50 80 55 Q 110 50 115 18 Z"
        fill="url(#palm-grad)"
      />
      <path
        d="M115 18 C 170 10, 195 35, 200 78 Q 175 55 145 60 Q 120 55 115 18 Z"
        fill="url(#palm-grad)"
      />
      <path
        d="M115 22 C 40 30, 0 90, 0 140 Q 35 100 78 92 Q 110 80 115 22 Z"
        fill="url(#palm-grad)"
      />
      <path
        d="M115 22 C 195 30, 220 110, 200 165 Q 175 110 145 95 Q 120 80 115 22 Z"
        fill="url(#palm-grad)"
      />
    </svg>
  );
}

export function SunGradient({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="sun-grad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFB627" />
          <stop offset="35%" stopColor="#FF6B35" />
          <stop offset="70%" stopColor="#FF2E93" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>
        <mask id="sun-mask">
          <rect width="600" height="600" fill="white" />
          {Array.from({ length: 18 }).map((_, i) => (
            <rect
              key={i}
              x="0"
              y={210 + i * 14}
              width="600"
              height="3"
              fill="black"
              opacity={(i + 1) / 22}
            />
          ))}
        </mask>
      </defs>
      <circle
        cx="300"
        cy="300"
        r="240"
        fill="url(#sun-grad)"
        mask="url(#sun-mask)"
      />
    </svg>
  );
}

export function ParallaxLayer({
  children,
  speed = 0.3,
  className = "",
}: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${speed * 100}%`]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
