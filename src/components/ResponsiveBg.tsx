"use client";

import { useEffect, useState } from "react";
import type { CSSProperties, VideoHTMLAttributes } from "react";

/**
 * Renders the same <video>, but with a mobile-optimised source on small
 * screens (max-width: 767px). This keeps the video pipeline (full quality,
 * proper codec, no GIF compression artefacts) while serving a lighter
 * buffer on mobile networks — small buffers are key for iOS autoplay.
 *
 * Mobile MP4 = 720p, CRF 25, no audio, faststart (~700 KB - 2 MB).
 * Desktop MP4 = full quality original.
 */
export function ResponsiveBg({
  videoSrc,
  mobileVideoSrc,
  className,
  style,
  videoProps,
}: {
  videoSrc: string;
  mobileVideoSrc: string;
  className?: string;
  style?: CSSProperties;
  videoProps?: Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "className" | "style">;
}) {
  // SSR fallback = desktop. Switches at hydration if narrow viewport.
  const [src, setSrc] = useState<string>(videoSrc);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    setSrc(mq.matches ? mobileVideoSrc : videoSrc);
    const update = (e: MediaQueryListEvent) =>
      setSrc(e.matches ? mobileVideoSrc : videoSrc);
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [videoSrc, mobileVideoSrc]);

  return (
    <video
      src={src}
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
