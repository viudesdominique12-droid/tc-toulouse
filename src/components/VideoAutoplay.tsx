"use client";

import { useEffect } from "react";

/**
 * Mobile / iOS autoplay unlock + resume.
 *
 * iOS Safari (and Chrome Android in some configs) refuses to autoplay video
 * even with `muted playsInline autoplay` HTML attributes. The most reliable
 * pattern is to:
 *   1. Try to play() every <video> on mount.
 *   2. On the first user gesture (touchstart / click), force play() on every
 *      paused video — this is universally accepted as a "user-initiated"
 *      action.
 *   3. When the tab becomes visible again, retry.
 *   4. Use IntersectionObserver to resume any video that scrolls back into
 *      view (iOS often pauses out-of-view videos to save power).
 *
 * No-op on desktop where browsers honour the autoplay attribute.
 */
export function VideoAutoplay() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouch) return;

    const playAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
        if (v.paused) {
          v.play().catch(() => {});
        }
      });
    };

    // Wait one frame for hydration so all <video> elements are mounted
    const initial = window.requestAnimationFrame(() => playAll());

    const onGesture = () => playAll();
    const onVisibility = () => {
      if (document.visibilityState === "visible") playAll();
    };

    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("click", onGesture);
    document.addEventListener("visibilitychange", onVisibility);

    // Resume any video re-entering the viewport
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting && v.paused) {
            v.play().catch(() => {});
          }
        }
      },
      { threshold: 0.05 }
    );

    const observeAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => obs.observe(v));
    };
    observeAll();
    // Re-observe after first paint in case some videos rendered late
    const reobserve = window.setTimeout(observeAll, 1000);

    return () => {
      window.cancelAnimationFrame(initial);
      window.clearTimeout(reobserve);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
    };
  }, []);

  return null;
}
