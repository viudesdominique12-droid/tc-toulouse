"use client";

import { useEffect, useState } from "react";

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      target = { x: e.clientX, y: e.clientY };
      if (hidden) setHidden(false);
    };
    const onLeave = () => setHidden(true);

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      setPos({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [hidden]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[100] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: "translate(-50%, -50%)",
        opacity: hidden ? 0 : 1,
        transition: "opacity 200ms ease",
      }}
    >
      <div className="h-3 w-3 rounded-full bg-cream" />
      <div
        className="absolute inset-0 -m-3 rounded-full border border-magenta/60"
        style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
      />
    </div>
  );
}
