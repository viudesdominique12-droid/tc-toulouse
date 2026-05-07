"use client";

import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { asset } from "@/lib/asset";

function AnimatedCounter({
  value,
  suffix = "",
  duration = 1800,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame = 0;
    function tick(now: number) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(value * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      {display.toLocaleString("fr-FR")}
      {suffix}
    </span>
  );
}

export function PhenomeneViral() {
  const wrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end start"],
  });

  const bgX = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.2]);

  return (
    <section
      id="viral"
      ref={wrap}
      className="relative md:sticky md:top-0 min-h-[100svh] md:min-h-screen bg-night md:overflow-hidden flex items-center"
      style={{
        zIndex: 1,
        boxShadow: "0 -1px 0 rgba(255, 46, 147, 0.4), 0 -20px 60px rgba(0, 0, 0, 0.6)",
      }}
    >
      {/* Background video — feels alive */}
      <motion.div
        style={{ x: bgX, scale: bgScale }}
        className="absolute inset-0 -z-10"
      >
        <video
          src={asset("/videos/pink-cadillac.mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/40 to-ink" />
        <div className="grain" />
      </motion.div>

      <div className="container-page py-20 md:py-24 w-full relative">
        {/* THE GIANT NUMBER — break the pattern */}
        <div className="text-center">
          <span className="eyebrow text-magenta-soft">Phénomène viral</span>
          <h2 className="heading-display mt-4 text-5xl sm:text-6xl md:text-7xl text-cream leading-[0.9]">
            Les réseaux <br />
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px var(--color-magenta)",
                filter: "drop-shadow(0 0 22px rgba(255, 46, 147, 0.45))",
              }}
            >
              s&apos;enflamment.
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-12 md:mt-16"
          >
            <div
              className="heading-display leading-[0.85] tracking-tighter"
              style={{
                fontSize: "clamp(8rem, 26vw, 22rem)",
                color: "transparent",
                WebkitTextStroke: "2px var(--color-magenta)",
                textShadow: "0 0 40px rgba(255, 46, 147, 0.4)",
              }}
            >
              <AnimatedCounter value={130} suffix="M" />
            </div>
            <div className="absolute inset-x-0 -bottom-2 md:-bottom-4 text-center">
              <span className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-cream/60">
                vues sur les réseaux
              </span>
            </div>
          </motion.div>

          {/* Smaller stats inline */}
          <div className="mt-16 md:mt-20 max-w-3xl mx-auto grid grid-cols-3 gap-3 md:gap-6">
            {[
              { v: 60, s: "+", l: "Restos" },
              { v: 1, s: "M", l: "Barquettes / mois" },
              { v: 2, s: " ans", l: "À peine" },
            ].map((stat, i) => (
              <motion.div
                key={stat.l}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="text-left md:text-center"
              >
                <div
                  className="heading-display text-3xl md:text-5xl text-cream leading-none"
                  style={{
                    color: i === 0 ? "var(--color-turquoise)" : i === 1 ? "var(--color-pink)" : "var(--color-orange-light)",
                  }}
                >
                  <AnimatedCounter value={stat.v} suffix={stat.s} />
                </div>
                <div className="mt-2 text-xs text-cream/55 uppercase tracking-wider font-mono">
                  {stat.l}
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 max-w-xl mx-auto text-cream/75 text-base md:text-lg leading-relaxed">
            TikTok, Instagram, files d&apos;attente devant chaque ouverture.
            <span className="text-cream font-semibold"> Et il est aussi à Toulouse.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
