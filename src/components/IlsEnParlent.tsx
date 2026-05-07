"use client";

import { motion } from "motion/react";

const press = [
  "CNN", "Stratégies", "Le JDD", "Capital", "BFM TV", "Le Figaro", "Ouest France", "Libération",
];

export function IlsEnParlent() {
  // Doubled list for marquee
  const list = [...press, ...press, ...press];

  return (
    <section
      className="sticky top-0 isolate min-h-[100svh] md:min-h-screen bg-turquoise-soft md:overflow-hidden flex items-center py-20 md:py-24 rounded-t-3xl md:rounded-t-[36px]"
      style={{
        zIndex: 4,
        boxShadow: "0 -3px 0 rgba(91, 201, 229, 0.7), 0 -28px 70px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="container-page relative w-full">
        {/* GIANT pull quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center relative"
        >
          <div
            className="font-mono text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--color-magenta-deep)" }}
          >
            Ils en parlent
          </div>

          <p
            className="heading-display mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] text-balance leading-[1]"
            style={{ color: "#1A0B2E" }}
          >
            <span style={{ color: "var(--color-magenta-deep)", opacity: 0.8 }}>«</span>{" "}
            Le crousty,{" "}
            <span
              className="text-transparent"
              style={{
                WebkitTextStroke: "1.5px var(--color-magenta-deep)",
              }}
            >
              nouveau roi
            </span>{" "}
            <br className="hidden md:block" />
            de la fast-food qui détrône{" "}
            <span
              className="heading-script text-5xl md:text-7xl"
              style={{
                color: "var(--color-magenta-deep)",
                textShadow: "0 0 18px rgba(199, 21, 133, 0.25)",
              }}
            >
              burgers et kebabs.
            </span>{" "}
            <span style={{ color: "var(--color-magenta-deep)", opacity: 0.8 }}>»</span>
          </p>

          <div className="mt-10 inline-flex items-center gap-3 text-sm">
            <div
              className="h-px w-12"
              style={{ background: "#1A0B2E", opacity: 0.4 }}
            />
            <span
              className="font-mono uppercase tracking-widest text-xs"
              style={{ color: "rgba(26, 11, 46, 0.7)" }}
            >
              Stratégies, 2025
            </span>
            <div
              className="h-px w-12"
              style={{ background: "#1A0B2E", opacity: 0.4 }}
            />
          </div>
        </motion.div>

        {/* Press logos as marquee */}
        <div className="mt-20 md:mt-24 overflow-hidden">
          <div
            className="font-mono text-[0.65rem] tracking-[0.4em] uppercase text-center mb-6"
            style={{ color: "rgba(26, 11, 46, 0.5)" }}
          >
            On parle de nous dans
          </div>
          <div className="marquee-track" style={{ animationDuration: "40s" }}>
            {list.map((name, i) => (
              <span
                key={i}
                className="heading-display text-3xl md:text-5xl tracking-wider whitespace-nowrap px-8 transition-colors duration-300 cursor-default"
                style={{ color: "rgba(26, 11, 46, 0.35)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "rgba(26, 11, 46, 0.95)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(26, 11, 46, 0.35)";
                }}
              >
                {name}
                <span
                  className="mx-6"
                  style={{ color: "var(--color-magenta-deep)", opacity: 0.5 }}
                >
                  ★
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
