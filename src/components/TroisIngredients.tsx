"use client";

import { motion } from "motion/react";

const ingredients = [
  {
    n: "01",
    eyebrow: "La base",
    title: "Riz basmati",
    body: "Cuit à la vapeur, fondant en bouche. La base parfaite, neutre, qui laisse parler le reste.",
    color: "#2BA8C7",
    side: "left" as const,
  },
  {
    n: "02",
    eyebrow: "Le héros",
    title: "Poulet pané",
    body: "Aiguillettes au panko, friture express, croustillant légendaire. Coupé en chunks, généreux.",
    color: "#C71585",
    side: "right" as const,
  },
  {
    n: "03",
    eyebrow: "Le secret",
    title: "Sauce maison",
    body: "Recette propriétaire, inspiration thaï. Crémeuse, addictive. La signature de la maison.",
    color: "#C66A1A",
    side: "left" as const,
  },
];

export function TroisIngredients() {
  return (
    <section
      id="produit"
      className="relative md:sticky md:top-0 min-h-[100svh] md:min-h-screen bg-kraft overflow-hidden py-20 md:py-24"
      style={{
        zIndex: 3,
        boxShadow: "0 -3px 0 rgba(201, 179, 147, 1), 0 -28px 70px rgba(0, 0, 0, 0.6)",
      }}
    >
      <div className="container-page relative">
        {/* Editorial intro */}
        <div className="max-w-3xl">
          <span
            className="font-mono text-[0.7rem] tracking-[0.3em] uppercase"
            style={{ color: "#7A5A2E" }}
          >
            Le crousty en 3 temps
          </span>
          <h2
            className="heading-display mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] text-balance leading-[0.9]"
            style={{ color: "#1A0B2E" }}
          >
            Trois éléments. <br />
            <span
              className="heading-script text-6xl md:text-7xl lg:text-9xl block ml-1 mt-1"
              style={{
                color: "#C71585",
                textShadow: "0 0 18px rgba(199, 21, 133, 0.25)",
              }}
            >
              Une obsession.
            </span>
          </h2>
        </div>

        {/* Editorial alternating rows — NO grid of cards */}
        <div className="mt-20 md:mt-28 space-y-20 md:space-y-32">
          {ingredients.map((ing, i) => (
            <motion.article
              key={ing.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.9,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`grid grid-cols-12 gap-6 items-center ${
                ing.side === "right" ? "md:text-right" : ""
              }`}
            >
              {ing.side === "left" ? (
                <>
                  <div className="col-span-12 md:col-span-2">
                    <BigNumber n={ing.n} color={ing.color} />
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <Eyebrow color={ing.color}>{ing.eyebrow}</Eyebrow>
                    <Title>{ing.title}</Title>
                    <Body>{ing.body}</Body>
                  </div>
                  <div className="col-span-12 md:col-span-3 hidden md:flex justify-end">
                    <DecorativeMark color={ing.color} />
                  </div>
                </>
              ) : (
                <>
                  <div className="col-span-12 md:col-span-3 hidden md:flex">
                    <DecorativeMark color={ing.color} />
                  </div>
                  <div className="col-span-12 md:col-span-7">
                    <Eyebrow color={ing.color}>{ing.eyebrow}</Eyebrow>
                    <Title>{ing.title}</Title>
                    <Body>{ing.body}</Body>
                  </div>
                  <div className="col-span-12 md:col-span-2 flex md:justify-end">
                    <BigNumber n={ing.n} color={ing.color} />
                  </div>
                </>
              )}
            </motion.article>
          ))}
        </div>

        {/* Pull quote — handwriting accent */}
        <div className="mt-24 md:mt-32 max-w-4xl mx-auto text-center relative">
          <div
            className="h-px mb-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #1A0B2E 35%, #1A0B2E 65%, transparent 100%)",
              opacity: 0.3,
            }}
          />
          <p
            className="heading-display text-3xl md:text-5xl text-balance leading-[1.05]"
            style={{ color: "#1A0B2E" }}
          >
            &ldquo;Le bonheur est dans <br />
            les choses simples.
            <br />
            <span
              className="heading-script text-4xl md:text-6xl"
              style={{
                color: "#C71585",
                textShadow: "0 0 18px rgba(199, 21, 133, 0.3)",
              }}
            >
              C&apos;est réconfortant. C&apos;est addictif.
            </span>
            &rdquo;
          </p>
          <div
            className="h-px mt-10"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, #1A0B2E 35%, #1A0B2E 65%, transparent 100%)",
              opacity: 0.3,
            }}
          />
        </div>
      </div>
    </section>
  );
}

function BigNumber({ n, color }: { n: string; color: string }) {
  return (
    <div
      className="heading-display text-7xl md:text-8xl lg:text-9xl leading-none tracking-tighter"
      style={{
        color: "transparent",
        WebkitTextStroke: `2px ${color}`,
      }}
    >
      {n}
    </div>
  );
}

function Eyebrow({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="font-mono text-[0.7rem] tracking-[0.3em] uppercase"
      style={{ color }}
    >
      {children}
    </span>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h3
      className="heading-display mt-3 text-4xl md:text-5xl lg:text-6xl"
      style={{ color: "#1A0B2E" }}
    >
      {children}
    </h3>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mt-4 leading-relaxed text-base md:text-lg max-w-md"
      style={{ color: "rgba(26, 11, 46, 0.7)" }}
    >
      {children}
    </p>
  );
}

function DecorativeMark({ color }: { color: string }) {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden>
      <circle
        cx="40"
        cy="40"
        r="32"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="3 5"
        opacity="0.6"
      />
      <circle cx="40" cy="40" r="6" fill={color} opacity="0.8" />
    </svg>
  );
}
