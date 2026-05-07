"use client";

import { motion } from "motion/react";

const press = [
  "CNN", "Stratégies", "Le JDD", "Capital", "BFM TV", "Le Figaro", "Ouest France", "Libération",
];

export function IlsEnParlent() {
  // Doubled list for marquee
  const list = [...press, ...press, ...press];

  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden border-t border-line">
      <div className="container-page relative">
        {/* GIANT pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center relative"
        >
          <div className="font-mono text-xs tracking-[0.4em] uppercase text-magenta-soft">
            Ils en parlent
          </div>

          <p className="heading-display mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] text-cream text-balance leading-[1]">
            <span className="text-magenta opacity-80">«</span> Le crousty,{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px var(--color-cyan)",
              }}
            >
              nouveau roi
            </span>{" "}
            <br className="hidden md:block" />
            de la fast-food qui détrône{" "}
            <span className="heading-script text-5xl md:text-7xl text-magenta">
              burgers et kebabs.
            </span>{" "}
            <span className="text-magenta opacity-80">»</span>
          </p>

          <div className="mt-10 inline-flex items-center gap-3 text-sm">
            <div
              className="h-px w-12"
              style={{ background: "var(--color-cyan)" }}
            />
            <span className="text-cream/70 font-mono uppercase tracking-widest text-xs">
              Stratégies, 2025
            </span>
            <div
              className="h-px w-12"
              style={{ background: "var(--color-cyan)" }}
            />
          </div>
        </motion.div>

        {/* Press logos as marquee */}
        <div className="mt-20 md:mt-24 overflow-hidden">
          <div className="font-mono text-[0.65rem] tracking-[0.4em] uppercase text-cream/40 text-center mb-6">
            On parle de nous dans
          </div>
          <div className="marquee-track" style={{ animationDuration: "40s" }}>
            {list.map((name, i) => (
              <span
                key={i}
                className="heading-display text-3xl md:text-5xl tracking-wider whitespace-nowrap px-8 text-cream/30 hover:text-cream/90 transition-colors duration-300 cursor-default"
              >
                {name}
                <span className="text-magenta-soft mx-6 opacity-50">★</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
