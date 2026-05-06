"use client";

import { motion } from "motion/react";

const HOURS = [
  { day: "Lun – Jeu", time: "11h30 – 01h50" },
  { day: "Vendredi", time: "16h00 – 02h50" },
  { day: "Samedi", time: "11h30 – 02h50" },
  { day: "Dimanche", time: "11h30 – 01h50" },
];

const ADDRESS = "31 Avenue de Muret, 31300 Toulouse";
const PHONE_DISPLAY = "05 16 34 64 68";
const PHONE_CALL = "+33516346468";
const GOOGLE_BUSINESS = "https://share.google/W6cgtk5IfCXDHnJqc";
const UBER_EATS = "https://www.ubereats.com/fr/store/tasty-crousty-toulouse/TsLtDsU7WZKkh57Ff87mLw";

export function NotreAdresse() {
  return (
    <section
      id="restos"
      className="relative py-24 md:py-32 bg-ink overflow-hidden border-t border-line"
    >
      {/* Facade image as atmospheric background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/images/facade.png"
          alt=""
          aria-hidden
          className="h-full w-full object-cover opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/65 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/80" />
        <div className="grain" />
      </div>

      {/* Massive background TOULOUSE text */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-end pr-4 md:pr-12 pointer-events-none select-none"
      >
        <span
          className="heading-display text-[28vw] md:text-[18rem] lg:text-[22rem] tracking-tight"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px rgba(91, 201, 229, 0.06)",
          }}
        >
          TLSE
        </span>
      </div>

      <div className="container-page relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          <div className="lg:col-span-5">
            <span className="eyebrow text-turquoise">31 Avenue de Muret</span>
            <h2 className="heading-display mt-4 text-5xl sm:text-6xl md:text-7xl text-cream text-balance leading-[0.92]">
              Le Tasty <br />
              <span className="heading-script text-magenta text-6xl md:text-7xl block leading-none mt-1">
                de Toulouse.
              </span>
            </h2>
            <p className="mt-6 text-cream/80 text-base md:text-lg leading-relaxed max-w-md">
              Sur place, à emporter, ou livré chez toi. La même barquette
              légendaire — chaude, croustillante, généreuse.
              <span className="text-cream"> Tous les jours, jusqu&apos;à 2h du mat&apos;.</span>
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={GOOGLE_BUSINESS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Itinéraire <span aria-hidden>↗</span>
              </a>
              <a
                href={UBER_EATS}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Livraison Uber Eats
              </a>
            </div>

            {/* Rating with stamp */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
              className="mt-10 inline-block stamp text-orange-light"
            >
              ★★★★½ · 1 000+ avis Google
            </motion.div>
          </div>

          <div className="lg:col-span-3 space-y-6">
            <InfoBlock label="Adresse" accent="turquoise">
              <div className="text-cream font-medium leading-tight">
                Tasty Crousty — Toulouse
              </div>
              <div className="text-cream/75 text-sm mt-1.5 leading-relaxed">
                {ADDRESS}
              </div>
            </InfoBlock>

            <InfoBlock label="Téléphone" accent="pink">
              <a
                href={`tel:${PHONE_CALL}`}
                className="text-cream hover:text-turquoise transition-colors font-mono text-lg tracking-wider"
              >
                {PHONE_DISPLAY}
              </a>
            </InfoBlock>

            <InfoBlock label="Horaires" accent="orange">
              <ul className="space-y-1.5 text-sm">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex justify-between gap-4 text-cream/80"
                  >
                    <span className="font-medium">{h.day}</span>
                    <span className="font-mono text-cream/65">{h.time}</span>
                  </li>
                ))}
              </ul>
            </InfoBlock>

            <InfoBlock label="Services" accent="turquoise">
              <div className="flex flex-wrap gap-1.5">
                {["Sur place", "À emporter", "Livraison", "Halal", "Tickets restau"].map(
                  (s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 text-xs rounded-full border border-line bg-ink/60 backdrop-blur-sm text-cream/80"
                    >
                      {s}
                    </span>
                  )
                )}
              </div>
            </InfoBlock>
          </div>

          {/* Map preview as polaroid */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 2 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -4 }}
            className="lg:col-span-4 relative"
          >
            <a
              href={GOOGLE_BUSINESS}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-cream p-3 pb-12 group"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="aspect-[4/5] relative overflow-hidden">
                {/* Stylized Toulouse map */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 65% 60%, rgba(255, 46, 147, 0.3) 0%, transparent 55%), radial-gradient(ellipse at 30% 25%, rgba(91, 201, 229, 0.25) 0%, transparent 55%), linear-gradient(135deg, #1A0B2E 0%, #0A0414 100%)",
                  }}
                />

                <svg
                  className="absolute inset-0 w-full h-full opacity-25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern
                      id="map-grid"
                      width="40"
                      height="40"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 40 0 L 0 0 0 40"
                        fill="none"
                        stroke="#FF2E93"
                        strokeWidth="0.5"
                      />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />
                </svg>

                <svg
                  className="absolute inset-0 w-full h-full opacity-35"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 400 500"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M 80 0 Q 130 120, 100 220 Q 70 320, 130 420 L 160 500"
                    stroke="#5BC9E5"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="absolute" style={{ left: "55%", top: "62%" }}>
                  <div className="relative">
                    <div className="absolute inset-0 -m-4 rounded-full border-2 border-magenta animate-ping opacity-60" />
                    <div className="absolute inset-0 -m-2 rounded-full border border-magenta opacity-40" />
                    <div
                      className="relative h-5 w-5 rounded-full bg-magenta"
                      style={{ boxShadow: "var(--shadow-neon-magenta)" }}
                    />
                  </div>
                </div>

                <div className="absolute top-5 left-5 tag">
                  <span className="h-1.5 w-1.5 rounded-full bg-turquoise animate-pulse" />
                  Saint-Michel
                </div>

                <div className="grain" />
                <div className="scanlines opacity-10" />
              </div>

              {/* Tape pieces */}
              <div className="tape" style={{ top: -14, left: "10%", transform: "rotate(-6deg)" }} />
              <div className="tape" style={{ top: -14, right: "12%", transform: "rotate(8deg)" }} />

              <div className="absolute bottom-2 left-0 right-0 text-center">
                <span
                  className="heading-script text-xl"
                  style={{ color: "#1A0B2E" }}
                >
                  Voir sur Google Maps ↗
                </span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  label,
  accent,
  children,
}: {
  label: string;
  accent: "turquoise" | "pink" | "orange";
  children: React.ReactNode;
}) {
  const color =
    accent === "turquoise"
      ? "var(--color-turquoise)"
      : accent === "pink"
        ? "var(--color-pink)"
        : "var(--color-orange-light)";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="border-l-2 pl-4"
      style={{ borderColor: color }}
    >
      <div
        className="font-mono text-[0.65rem] tracking-[0.3em] uppercase mb-2"
        style={{ color }}
      >
        {label}
      </div>
      {children}
    </motion.div>
  );
}
