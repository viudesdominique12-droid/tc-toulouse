"use client";

import { motion } from "motion/react";
import { asset } from "@/lib/asset";

export function ShowcaseProduit() {
  return (
    <section
      id="showcase"
      data-nav-variant="turquoise"
      className="relative md:sticky md:top-0 min-h-[100svh] md:min-h-screen bg-turquoise-soft overflow-hidden flex items-center py-20 md:py-24"
      style={{
        zIndex: 2,
        boxShadow: "0 -3px 0 rgba(91, 201, 229, 0.7), 0 -28px 70px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Decorative palms — black silhouettes pop on pastel bg */}
      <div className="absolute -top-10 -left-10 w-32 md:w-44 opacity-90 z-[1] pointer-events-none">
        <svg viewBox="0 0 200 320" className="w-full h-auto" aria-hidden>
          <path d="M100 320 Q98 240 102 160 Q105 110 108 70 Q112 40 115 18" stroke="#0A0414" strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M115 18 C 60 10, 30 30, 12 70 Q 38 50 80 55 Q 110 50 115 18 Z" fill="#0A0414" />
          <path d="M115 18 C 170 10, 195 35, 200 78 Q 175 55 145 60 Q 120 55 115 18 Z" fill="#0A0414" />
          <path d="M115 22 C 40 30, 0 90, 0 140 Q 35 100 78 92 Q 110 80 115 22 Z" fill="#0A0414" />
          <path d="M115 22 C 195 30, 220 110, 200 165 Q 175 110 145 95 Q 120 80 115 22 Z" fill="#0A0414" />
        </svg>
      </div>

      <div className="container-page relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Polaroid-style image */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -8 }}
            whileInView={{ opacity: 1, y: 0, rotate: -4 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -6 }}
            className="lg:col-span-7 order-2 lg:order-1 relative"
          >
            <div
              className="relative bg-cream p-3 md:p-4 pb-16 md:pb-20 mx-auto max-w-2xl"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.35), 0 0 0 1px rgba(0, 0, 0, 0.06)",
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-ink">
                <img
                  src={asset("/images/crousty-product.jpg")}
                  alt="Le Crousty — riz, poulet pané, sauce, ciboulette"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="grain opacity-[0.08]" />
              </div>
              <div className="absolute bottom-3 left-0 right-0 text-center">
                <span
                  className="heading-script text-2xl md:text-3xl"
                  style={{ color: "#1A0B2E" }}
                >
                  9 € la barquette
                </span>
              </div>

              {/* Tape pieces */}
              <div className="tape" style={{ top: -14, left: "12%", transform: "rotate(-8deg)" }} />
              <div className="tape" style={{ top: -14, right: "15%", transform: "rotate(6deg)" }} />
            </div>

            {/* "5/5 Halal" stamp overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: 25 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 12 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring", bounce: 0.5 }}
              className="absolute -top-3 -right-2 md:-right-6 z-10 stamp text-magenta-deep"
              style={{ transform: "rotate(12deg)" }}
            >
              ★★★★½ Google
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -8 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.55, type: "spring", bounce: 0.5 }}
              className="absolute -bottom-2 left-2 md:left-8 z-10 stamp"
              style={{ color: "#0A6B3A", transform: "rotate(-8deg)" }}
            >
              Halal · Toulouse
            </motion.div>
          </motion.div>

          {/* Editorial copy */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <span
              className="font-mono text-[0.7rem] tracking-[0.3em] uppercase"
              style={{ color: "var(--color-magenta-deep)" }}
            >
              Une seule barquette
            </span>
            <h2
              className="heading-display mt-4 text-5xl md:text-6xl lg:text-7xl text-balance leading-[0.92]"
              style={{ color: "#1A0B2E" }}
            >
              Pas 40 plats. <br />
              <span style={{ color: "var(--color-magenta-deep)" }}>
                Une obsession.
              </span>
            </h2>
            <p className="mt-6 text-base md:text-lg leading-relaxed" style={{ color: "rgba(26, 11, 46, 0.75)" }}>
              Riz fondant, poulet pané croustillant, sauce maison crémeuse,
              ciboulette ciselée. Servi en moins d&apos;une minute. Toujours
              chaud. Toujours généreux.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "730 g", v: "Portion XXL" },
                { k: "<1 min", v: "Service" },
                { k: "9 €", v: "Sur place" },
              ].map((s) => (
                <div
                  key={s.k}
                  className="border-l-2 pl-3"
                  style={{ borderColor: "var(--color-magenta-deep)" }}
                >
                  <div
                    className="heading-display text-xl md:text-2xl leading-none"
                    style={{ color: "#1A0B2E" }}
                  >
                    {s.k}
                  </div>
                  <div
                    className="text-xs mt-1.5 uppercase tracking-wider"
                    style={{ color: "rgba(26, 11, 46, 0.55)" }}
                  >
                    {s.v}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
