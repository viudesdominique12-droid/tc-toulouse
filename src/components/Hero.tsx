"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";
import { PalmTree, SunGradient } from "./Decor";
import { asset } from "@/lib/asset";

export function Hero() {
  const wrap = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Scroll-driven scrubbing — direct RAF loop, no dep on Lenis/Motion sync.
  // On touch / mobile, we fall back to autoplay loop (scrub is jittery on mobile).
  useEffect(() => {
    const v = videoRef.current;
    const w = wrap.current;
    if (!v || !w) return;

    const isTouch =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (isTouch) {
      v.muted = true;
      v.loop = true;
      v.setAttribute("playsinline", "");
      v.play().catch(() => {});

      // iOS Safari likes to pause videos when they scroll out of viewport.
      // Resume play whenever the video becomes visible again, and re-kick on
      // any user gesture (tap on body) for the strictest autoplay policies.
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting && v.paused) {
              v.play().catch(() => {});
            }
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(v);

      const onGesture = () => {
        if (v.paused) v.play().catch(() => {});
      };
      window.addEventListener("touchstart", onGesture, { passive: true, once: true });
      window.addEventListener("click", onGesture, { once: true });

      return () => {
        obs.disconnect();
        window.removeEventListener("touchstart", onGesture);
        window.removeEventListener("click", onGesture);
      };
    }

    // Desktop scrub: needs all-keyframes mp4 + buffered video for smooth seeks.
    v.loop = false;
    v.muted = true;
    v.preload = "auto";

    // Kick play to authorize seeks, then pause once metadata loaded
    v.play().then(() => v.pause()).catch(() => {});

    // Wait until the browser says it can play the whole thing before scrubbing,
    // otherwise seeks block on network and look stuck.
    let canScrub = v.readyState >= 4; // HAVE_ENOUGH_DATA
    const onReady = () => { canScrub = true; };
    v.addEventListener("canplaythrough", onReady);
    v.addEventListener("loadeddata", onReady);

    let raf = 0;
    let lastSetT = -1;
    let lastSeekStamp = 0;
    let pendingProgress = -1;
    let isSeeking = false;

    const onSeeking = () => { isSeeking = true; };
    const onSeeked = () => { isSeeking = false; };
    v.addEventListener("seeking", onSeeking);
    v.addEventListener("seeked", onSeeked);

    const applySeek = (now: number) => {
      const dur = v.duration;
      if (!dur || isNaN(dur) || pendingProgress < 0) return;
      const t = pendingProgress * dur;
      // Skip if change too small or browser still seeking previous
      if (isSeeking) return;
      if (Math.abs(t - lastSetT) < 0.04) return;
      try {
        v.currentTime = t;
        lastSetT = t;
        lastSeekStamp = now;
      } catch {}
    };

    const tick = () => {
      const rect = w.getBoundingClientRect();
      const sectionH = w.offsetHeight;
      const scrolled = -rect.top;
      const range = Math.max(1, sectionH - window.innerHeight);
      pendingProgress = Math.max(0, Math.min(1, scrolled / range));

      if (canScrub) {
        const now = performance.now();
        // Throttle: at most ~25 seeks/s — gives the decoder time to render
        if (now - lastSeekStamp >= 40) applySeek(now);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      v.removeEventListener("canplaythrough", onReady);
      v.removeEventListener("loadeddata", onReady);
      v.removeEventListener("seeking", onSeeking);
      v.removeEventListener("seeked", onSeeked);
    };
  }, []);

  // Parallax for decor + headline (Motion-based, lighter)
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start start", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const palmL = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const palmR = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      id="top"
      ref={wrap}
      className="relative min-h-[100svh] md:h-[280vh]"
    >
      <div className="md:sticky md:top-0 min-h-[100svh] md:h-screen md:overflow-hidden pt-24 md:pt-28">
      {/* Facade background — atmospheric, "viens chez nous" */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <img
          src={asset("/images/facade.png")}
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-50 scale-[1.04]"
        />
        {/* Gradient overlays — keep text readable, especially on left where copy lives */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/50 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink" />
        <div className="grain" />
      </div>

      {/* Sun background — signature Vice City, blended over facade */}
      <motion.div
        style={{ y: sunY }}
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[120%] max-w-[1100px] aspect-square pointer-events-none opacity-30 mix-blend-screen"
      >
        <SunGradient className="w-full h-full" />
      </motion.div>

      {/* Palm trees — silhouettes */}
      <motion.div
        style={{ y: palmL }}
        className="absolute bottom-0 -left-10 w-44 md:w-56 lg:w-72 pointer-events-none opacity-90 z-[1]"
      >
        <PalmTree className="w-full h-auto" />
      </motion.div>
      <motion.div
        style={{ y: palmR }}
        className="absolute bottom-0 -right-10 w-40 md:w-52 lg:w-64 pointer-events-none opacity-90 z-[1]"
      >
        <PalmTree className="w-full h-auto" flip />
      </motion.div>

      {/* Editorial layout — broken grid */}
      <div className="container-page relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[80vh]">
        <motion.div
          style={{ y: headlineY }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 relative"
        >
          <RevealText className="eyebrow block">
            Toulouse · 31 av. de Muret · Halal
          </RevealText>

          <h1 className="heading-display mt-5 text-[14vw] sm:text-7xl md:text-8xl lg:text-[10rem] text-cream text-balance leading-[0.85]">
            <RevealLine delay={0.05}>L&apos;original.</RevealLine>
            <RevealLine delay={0.18}>Le seul.</RevealLine>
          </h1>

          <motion.div
            initial={{ opacity: 0, x: -40, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -3 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="heading-script text-[18vw] sm:text-[10rem] md:text-[12rem] lg:text-[15rem] block leading-[0.8] -mt-4 ml-2 md:ml-6 origin-left"
            style={{ display: "inline-block" }}
          >
            Le n°1
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-7 max-w-xl text-base md:text-lg text-cream/75 leading-relaxed"
          >
            Une barquette chaude. Du riz fondant. Du poulet pané ultra
            croustillant. Une sauce maison devenue culte.
            <span className="text-cream"> Zéro compromis.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <a href="#restos" className="btn-primary">
              Voir le resto
            </a>
            <a
              href="https://www.ubereats.com/fr/store/tasty-crousty-toulouse/TsLtDsU7WZKkh57Ff87mLw"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              Commander en livraison
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-12 flex items-center gap-4 text-sm text-cream/60 font-mono"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-magenta pulse-ring" />
            <span>
              SCROLL · La box se construit sous tes yeux
            </span>
          </motion.div>
        </motion.div>

        {/* Right: video card with overhang and tilt */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative mt-10 lg:mt-0"
        >
          <div className="neon-card aspect-video sm:aspect-[3/4] lg:aspect-[5/6] relative lg:rotate-2 origin-bottom-left">
            <video
              ref={videoRef}
              src={asset("/videos/box-assembly.mp4")}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="grain" />
            <div className="scanlines" />

            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              className="absolute top-4 left-4 tag"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
              REC · 0001
            </motion.div>

            <div className="absolute bottom-4 right-4 tag">
              <span className="text-cyan font-bold">9 €</span> la barquette
            </div>
          </div>

          {/* Overlapping sticker — kept inside the card on mobile to avoid touching text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -25 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            transition={{ duration: 0.8, delay: 1, type: "spring", bounce: 0.4 }}
            className="absolute top-2 -left-2 md:-top-6 md:-left-16 z-20 bg-cyan text-ink heading-display text-base md:text-2xl px-3 md:px-5 py-1.5 md:py-3 rounded-2xl"
            style={{ boxShadow: "var(--shadow-neon-cyan)" }}
          >
            Summer
            <br />
            Vibes Only
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 30 }}
            animate={{ opacity: 1, scale: 1, rotate: 14 }}
            transition={{ duration: 0.8, delay: 1.15, type: "spring", bounce: 0.4 }}
            className="absolute -bottom-2 right-2 md:-bottom-4 md:-right-10 z-20 bg-ink border-2 border-magenta text-magenta heading-display text-sm md:text-lg px-3 md:px-4 py-1.5 md:py-2.5 rounded-full"
            style={{ boxShadow: "var(--shadow-neon-magenta)" }}
          >
            +130M vues
          </motion.div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

function RevealText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.05 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

function RevealLine({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        transition={{
          duration: 0.95,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="block"
      >
        {children}
      </motion.span>
    </span>
  );
}
