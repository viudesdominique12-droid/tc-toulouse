"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, VideoHTMLAttributes } from "react";

/**
 * Renders a <video> on desktop and a <img> (animated GIF) on mobile.
 *
 * Why: iOS Safari frequently refuses to autoplay video even with the right
 * attributes (Low Power Mode, strict autoplay policies, off-screen-at-load
 * blocking, decoder pool limits when several videos compete). An animated
 * GIF is rendered by the image pipeline — it always plays, no user gesture
 * needed, no decoder limits, and the browser pauses it automatically when
 * out of viewport.
 *
 * Mobile = (max-width: 767px) — touch-only treatment, desktop keeps the
 * cinematic video.
 */
export function ResponsiveBg({
  videoSrc,
  gifSrc,
  className,
  style,
  videoProps,
}: {
  videoSrc: string;
  gifSrc: string;
  className?: string;
  style?: CSSProperties;
  videoProps?: Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "className" | "style">;
}) {
  // Default to "video" so SSR / first paint = desktop-friendly. Flips to
  // "gif" once we know we're on a small screen.
  const [mode, setMode] = useState<"video" | "gif">("video");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setMode(mq.matches ? "gif" : "video");
    const update = (e: MediaQueryListEvent) => setMode(e.matches ? "gif" : "video");
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (mode === "gif") {
    return (
      <img
        src={gifSrc}
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className={className}
        style={style}
      />
    );
  }

  return (
    <video
      src={videoSrc}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className={className}
      style={style}
      {...videoProps}
    />
  );
}
