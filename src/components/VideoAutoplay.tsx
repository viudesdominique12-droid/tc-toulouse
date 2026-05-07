"use client";

import { useEffect } from "react";

/**
 * Mobile / iOS autoplay strategy.
 *
 * Why this is hard on iOS:
 *  - iOS Safari only honours the `autoplay` HTML attribute for videos that
 *    are in the viewport at parse time. Off-screen videos are silent.
 *  - iOS limits the number of concurrent decoded videos. Pausing the ones
 *    out-of-view is mandatory for the visible ones to play smoothly.
 *  - Some Low Power / data-saving modes block autoplay entirely until a
 *    real user gesture happens.
 *
 * This component does:
 *   1. On mount + after hydration, try play() on the videos currently in
 *      the viewport.
 *   2. On the first touch / click anywhere, retry play() on visible videos.
 *   3. IntersectionObserver:
 *        - when a video enters the viewport → play()
 *        - when it leaves → pause()
 *   4. On visibility change (tab back to foreground), retry visible.
 *
 * No-op on desktop where browsers honour the autoplay attribute as is.
 */
export function VideoAutoplay() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    if (!isTouch) return;

    const isInViewport = (el: HTMLElement) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight && r.bottom > 0 && r.left < window.innerWidth && r.right > 0;
    };

    const playIfVisible = (v: HTMLVideoElement) => {
      if (!v.paused) return;
      if (isInViewport(v)) {
        v.play().catch(() => {});
      }
    };

    const playAllVisible = () => {
      document.querySelectorAll<HTMLVideoElement>("video").forEach(playIfVisible);
    };

    // IntersectionObserver: drive playback by viewport visibility
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) {
            if (v.paused) v.play().catch(() => {});
          } else {
            if (!v.paused) {
              try { v.pause(); } catch {}
            }
          }
        }
      },
      { threshold: 0.15 }
    );

    let observedSet = new WeakSet<HTMLVideoElement>();
    const observeAll = () => {
      document.querySelectorAll<HTMLVideoElement>("video").forEach((v) => {
        if (!observedSet.has(v)) {
          obs.observe(v);
          observedSet.add(v);
        }
      });
    };

    // Try first paint, then retry as videos hydrate
    const t1 = window.setTimeout(() => { observeAll(); playAllVisible(); }, 50);
    const t2 = window.setTimeout(() => { observeAll(); playAllVisible(); }, 600);
    const t3 = window.setTimeout(() => { observeAll(); playAllVisible(); }, 1800);

    // First user gesture unlocks strict autoplay policies
    const onGesture = () => playAllVisible();
    window.addEventListener("touchstart", onGesture, { passive: true });
    window.addEventListener("click", onGesture);

    const onVisibility = () => {
      if (document.visibilityState === "visible") playAllVisible();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.removeEventListener("touchstart", onGesture);
      window.removeEventListener("click", onGesture);
      document.removeEventListener("visibilitychange", onVisibility);
      obs.disconnect();
    };
  }, []);

  return null;
}
