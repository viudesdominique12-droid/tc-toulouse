"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#produit", label: "Le crousty" },
  { href: "#viral", label: "Phénomène" },
  { href: "#ride", label: "Take a ride" },
  { href: "#restos", label: "Notre resto" },
];

type Variant = "transparent" | "ink" | "turquoise";

export function Nav() {
  const [variant, setVariant] = useState<Variant>("transparent");

  // Track scroll position for the "ink solid" treatment
  useEffect(() => {
    const onScroll = () => {
      // Default: transparent at top, ink-solid once user scrolled
      // (turquoise overrides this when over the showcase section)
      setVariant((prev) =>
        prev === "turquoise"
          ? prev
          : window.scrollY > 24
            ? "ink"
            : "transparent"
      );
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track when the turquoise section (Showcase Produit) is "behind" the nav
  useEffect(() => {
    const showcase = document.getElementById("showcase");
    if (!showcase) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.45) {
          setVariant("turquoise");
        } else {
          setVariant(window.scrollY > 24 ? "ink" : "transparent");
        }
      },
      {
        // Top below nav (64px), bottom mid-screen → "active" when section
        // covers the upper half
        rootMargin: "-64px 0px -45% 0px",
        threshold: [0, 0.45, 0.7, 1],
      }
    );

    observer.observe(showcase);
    return () => observer.disconnect();
  }, []);

  const isTurquoise = variant === "turquoise";
  const isInk = variant === "ink";

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: isTurquoise
          ? "linear-gradient(180deg, rgba(91, 201, 229, 0.95) 0%, rgba(168, 225, 240, 0.88) 100%)"
          : isInk
            ? "rgba(10, 4, 20, 0.85)"
            : "transparent",
        backdropFilter: isTurquoise || isInk ? "blur(14px)" : "blur(0px)",
        WebkitBackdropFilter: isTurquoise || isInk ? "blur(14px)" : "blur(0px)",
        borderBottom: isTurquoise
          ? "1px solid rgba(43, 168, 199, 0.4)"
          : isInk
            ? "1px solid var(--color-line)"
            : "1px solid transparent",
        boxShadow: isTurquoise
          ? "0 8px 28px -10px rgba(43, 168, 199, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.4)"
          : "none",
        transition: "background 400ms ease, backdrop-filter 400ms ease, border-color 400ms ease, box-shadow 400ms ease",
      }}
    >
      <div className="container-page flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span
            className="heading-script text-3xl leading-none"
            style={{
              color: isTurquoise ? "#C71585" : "var(--color-magenta)",
              transition: "color 400ms ease",
            }}
          >
            Tasty
          </span>
          <span
            className="heading-display text-xl tracking-wider"
            style={{
              color: isTurquoise ? "#1A0B2E" : "var(--color-cream)",
              transition: "color 400ms ease",
            }}
          >
            Crousty
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm">
          {links.map((l) => (
            <NavLink key={l.href} href={l.href} isTurquoise={isTurquoise}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <a href="#restos" className="btn-primary text-xs md:text-sm">
          Voir le resto
        </a>
      </div>
    </header>
  );
}

function NavLink({
  href,
  isTurquoise,
  children,
}: {
  href: string;
  isTurquoise: boolean;
  children: React.ReactNode;
}) {
  const [hover, setHover] = useState(false);

  const baseColor = isTurquoise
    ? "rgba(26, 11, 46, 0.78)"
    : "rgba(245, 230, 201, 0.7)";
  const hoverColor = isTurquoise ? "#C71585" : "var(--color-cyan)";

  return (
    <a
      href={href}
      className="font-semibold"
      style={{
        color: hover ? hoverColor : baseColor,
        transition: "color 200ms ease",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </a>
  );
}
