"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

export function TakeARide() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (isMobile) return <TakeARideMobile />;
  return <TakeARideDesktop />;
}

/* ---------------- DESKTOP — sticky pin scroll-driven (unchanged) ----------- */

function TakeARideDesktop() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });

  const cadillacOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.25, 0.45, 0.55],
    [0, 1, 1, 0]
  );
  const cadillacScale = useTransform(scrollYProgress, [0, 0.5], [1.1, 1]);
  const cadillacX = useTransform(scrollYProgress, [0, 0.5], ["8%", "-8%"]);

  const povOpacity = useTransform(
    scrollYProgress,
    [0.45, 0.55, 0.85, 0.98],
    [0, 1, 1, 0]
  );
  const povScale = useTransform(scrollYProgress, [0.5, 1], [1.1, 1]);

  const titleY = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <section
      id="ride"
      ref={wrap}
      className="relative h-[260vh] border-y border-line bg-ink"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        <motion.div
          style={{ opacity: cadillacOpacity, scale: cadillacScale, x: cadillacX }}
          className="absolute inset-0"
        >
          <video
            src={asset("/videos/pink-cadillac.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
        </motion.div>

        <motion.div
          style={{ opacity: povOpacity, scale: povScale }}
          className="absolute inset-0"
        >
          <video
            src={asset("/videos/pov-drive.mp4")}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        </motion.div>

        <div className="grain absolute inset-0 z-[1] opacity-50" />
        <div className="scanlines absolute inset-0 z-[1]" />

        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="relative z-10 container-page w-full"
        >
          <div className="max-w-3xl">
            <span className="eyebrow text-cyan">Take a ride</span>
            <h2 className="heading-display mt-5 text-[14vw] md:text-[10rem] lg:text-[12rem] text-cream leading-[0.85] text-balance">
              Cruise.
              <br />
              <span className="heading-script text-magenta block text-[16vw] md:text-[12rem] lg:text-[15rem] -mt-4 ml-4">
                Eat.
              </span>
              <span className="block text-cyan -mt-2">Repeat.</span>
            </h2>
            <p className="mt-7 max-w-md text-cream/80 text-lg leading-relaxed">
              Le crousty est un mood. Une signature. Un état d&apos;esprit.
              <span className="text-cream"> Summer Vibes Only — 365 jours par an.</span>
            </p>
          </div>
        </motion.div>

        <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-3">
          <PhaseDot progress={scrollYProgress} from={0.1} to={0.45} label="Cadillac" />
          <PhaseDot progress={scrollYProgress} from={0.55} to={0.9} label="POV" />
        </div>
      </div>
    </section>
  );
}

function PhaseDot({
  progress,
  from,
  to,
  label,
}: {
  progress: MotionValue<number>;
  from: number;
  to: number;
  label: string;
}) {
  const opacity = useTransform(
    progress,
    [from - 0.05, from, to, to + 0.05],
    [0.3, 1, 1, 0.3]
  );
  return (
    <motion.div
      style={{ opacity }}
      className="flex items-center gap-2.5 text-xs font-mono tracking-widest uppercase text-cream/80"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
      <span className="hidden md:inline">{label}</span>
    </motion.div>
  );
}

/* ---------------- MOBILE — two full-bg cinematic chapters ---------------- */
/* Same ambiance as desktop: video lives behind text, not in a tiny card.    */

function TakeARideMobile() {
  return (
    <section id="ride" className="relative bg-ink border-y border-line">
      {/* Chapter 1 — Pink Cadillac as full background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
        className="relative isolate min-h-[85svh] flex items-end overflow-hidden"
      >
        <img
          src={asset("/videos/pink-cadillac.gif")}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/50 via-transparent to-transparent" />
        <div className="grain absolute inset-0 -z-10 opacity-50" />
        <div className="scanlines absolute inset-0 -z-10" />

        <div className="container-page py-16 relative z-10">
          <span className="eyebrow text-cyan">Take a ride</span>
          <h2 className="heading-display mt-4 text-[18vw] text-cream leading-[0.88] text-balance drop-shadow-lg">
            Cruise.
            <br />
            <span className="heading-script text-magenta block text-[22vw] -mt-2 ml-2">
              Eat.
            </span>
          </h2>
        </div>

        <div className="absolute top-5 right-5 tag z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-magenta animate-pulse" />
          Pink Cadillac
        </div>
      </motion.div>

      {/* Chapter 2 — POV Drive as full background */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9 }}
        className="relative isolate min-h-[85svh] flex items-end overflow-hidden"
      >
        <img
          src={asset("/videos/pov-drive.gif")}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-l from-ink/50 via-transparent to-transparent" />
        <div className="grain absolute inset-0 -z-10 opacity-50" />
        <div className="scanlines absolute inset-0 -z-10" />

        <div className="container-page py-16 relative z-10 text-right">
          <h2 className="heading-display text-[24vw] text-cyan leading-[0.85] drop-shadow-lg">
            Repeat.
          </h2>
          <p className="mt-5 text-cream/90 text-base leading-relaxed max-w-md ml-auto">
            Le crousty est un mood. Une signature. Un état d&apos;esprit.
            <span className="text-cream font-semibold"> Summer Vibes Only — 365 jours par an.</span>
          </p>
        </div>

        <div className="absolute top-5 left-5 tag z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-pulse" />
          POV Drive
        </div>
      </motion.div>
    </section>
  );
}
