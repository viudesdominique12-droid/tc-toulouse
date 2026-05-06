const items = [
  "Zéro compromis",
  "Halal certifié",
  "Sauce maison",
  "60+ restos",
  "L'original",
  "+130M de vues",
];

const itemsB = [
  "Summer Vibes Only",
  "1M barquettes / mois",
  "Le n°1",
  "Made in France",
  "Pas un menu de 40 lignes",
  "Une obsession",
];

export function Marquee() {
  const list = [...items, ...items, ...items, ...items];
  const listB = [...itemsB, ...itemsB, ...itemsB, ...itemsB];

  return (
    <section aria-hidden className="border-y border-line overflow-hidden">
      {/* Top — magenta, scrolls left */}
      <div className="bg-gradient-to-r from-magenta via-magenta-deep to-magenta py-5 overflow-hidden">
        <div className="marquee-track">
          {list.map((item, i) => (
            <span
              key={i}
              className="heading-display text-2xl md:text-4xl tracking-widest text-ink whitespace-nowrap px-8 flex items-center gap-8"
            >
              {item}
              <span aria-hidden className="text-ink/50">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom — ink with cyan outline text, scrolls opposite */}
      <div className="bg-ink py-4 overflow-hidden border-t border-line">
        <div
          className="marquee-track"
          style={{
            animationDirection: "reverse",
            animationDuration: "44s",
          }}
        >
          {listB.map((item, i) => (
            <span
              key={i}
              className="heading-display text-xl md:text-3xl tracking-widest whitespace-nowrap px-7 flex items-center gap-7 text-transparent"
              style={{
                WebkitTextStroke: "1px var(--color-cyan)",
              }}
            >
              {item}
              <span aria-hidden className="text-cyan/40">★</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
