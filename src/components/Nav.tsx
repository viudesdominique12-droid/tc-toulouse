"use client";

const links = [
  { href: "#produit", label: "Le crousty" },
  { href: "#viral", label: "Phénomène" },
  { href: "#ride", label: "Take a ride" },
  { href: "#restos", label: "Notre resto" },
];

export function Nav() {
  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[calc(100%-1.25rem)]">
      <div
        className="flex items-center gap-3 md:gap-7 h-12 md:h-14 pl-5 pr-2 md:pl-6 md:pr-2 rounded-full"
        style={{
          background:
            "linear-gradient(180deg, rgba(91, 201, 229, 0.97) 0%, rgba(168, 225, 240, 0.93) 100%)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          boxShadow:
            "0 12px 36px -12px rgba(43, 168, 199, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.45)",
        }}
      >
        {/* Logo */}
        <a href="#top" className="flex items-center gap-1.5 shrink-0">
          <span
            className="heading-script text-2xl md:text-3xl leading-none"
            style={{ color: "#C71585" }}
          >
            Tasty
          </span>
          <span
            className="heading-display text-sm md:text-base tracking-wider"
            style={{ color: "#1A0B2E" }}
          >
            Crousty
          </span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <a
          href="#restos"
          className="shrink-0 inline-flex items-center justify-center rounded-full font-semibold text-xs md:text-sm transition-all duration-200 h-8 md:h-10 px-4 md:px-5"
          style={{
            background: "rgba(20, 9, 31, 0.95)",
            color: "var(--color-cream)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow:
              "0 4px 14px -6px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.06)",
          }}
        >
          Voir le resto
        </a>
      </div>
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="font-semibold transition-colors duration-200"
      style={{ color: "rgba(26, 11, 46, 0.78)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#C71585";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(26, 11, 46, 0.78)";
      }}
    >
      {children}
    </a>
  );
}
