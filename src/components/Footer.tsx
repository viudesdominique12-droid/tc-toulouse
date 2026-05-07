"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { asset } from "@/lib/asset";

export function Footer() {
  const wrap = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: wrap,
    offset: ["start end", "end end"],
  });

  const videoX = useTransform(scrollYProgress, [0, 1], ["6%", "-6%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15]);

  return (
    <footer
      ref={wrap}
      className="relative pt-24 md:pt-32 pb-10 overflow-hidden bg-sunset border-t border-line"
    >
      {/* POV Drive ambient — visible (50%) blended with sunset */}
      <motion.div
        style={{ x: videoX, scale: videoScale }}
        className="absolute inset-0 -z-10"
      >
        <video
          src={asset("/videos/pov-drive.mp4")}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover opacity-55 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet via-violet/40 to-transparent" />
        <div className="grain" />
      </motion.div>

      <div className="container-page relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p
            className="heading-display text-4xl md:text-6xl lg:text-7xl text-cream text-balance leading-[0.95]"
            style={{ textShadow: "0 4px 24px rgba(0, 0, 0, 0.6)" }}
          >
            Le bonheur <br />
            est dans <br />
            <span className="heading-script text-5xl md:text-7xl lg:text-8xl block mt-2">
              les choses simples.
            </span>
          </p>
          <a
            href="https://share.google/W6cgtk5IfCXDHnJqc"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-12"
          >
            Itinéraire
          </a>
        </div>

        <div className="hairline mt-20 mb-10" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 text-sm">
          <div>
            <div className="flex items-center gap-2">
              <span className="heading-script text-2xl">Tasty</span>
              <span className="heading-display text-base tracking-wider text-cream">
                Crousty
              </span>
            </div>
            <p className="mt-3 text-cream/70 text-xs leading-relaxed">
              31 Avenue de Muret
              <br />
              31300 Toulouse
              <br />
              Halal certifié.
            </p>
          </div>

          <div>
            <div className="eyebrow mb-3">Le resto</div>
            <ul className="space-y-2 text-cream/80">
              <li>
                <a href="#produit" className="hover:text-turquoise-soft transition-colors">
                  Le crousty
                </a>
              </li>
              <li>
                <a href="#viral" className="hover:text-turquoise-soft transition-colors">
                  Phénomène
                </a>
              </li>
              <li>
                <a href="#ride" className="hover:text-turquoise-soft transition-colors">
                  Take a ride
                </a>
              </li>
              <li>
                <a href="#restos" className="hover:text-turquoise-soft transition-colors">
                  Notre adresse
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Commander</div>
            <ul className="space-y-2 text-cream/80">
              <li>
                <a
                  href="tel:+33516346468"
                  className="hover:text-turquoise-soft transition-colors font-mono"
                >
                  05 16 34 64 68
                </a>
              </li>
              <li>
                <a
                  href="https://www.ubereats.com/fr/store/tasty-crousty-toulouse/TsLtDsU7WZKkh57Ff87mLw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-turquoise-soft transition-colors"
                >
                  Uber Eats
                </a>
              </li>
              <li>
                <a
                  href="https://share.google/W6cgtk5IfCXDHnJqc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-turquoise-soft transition-colors"
                >
                  Itinéraire Google Maps
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="eyebrow mb-3">Légal</div>
            <ul className="space-y-2 text-cream/80">
              <li>
                <a href="#" className="hover:text-turquoise-soft transition-colors">
                  Mentions légales
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-turquoise-soft transition-colors">
                  Confidentialité
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-turquoise-soft transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cream/15 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream/60">
          <span>© {new Date().getFullYear()} Tasty Crousty Toulouse. Tous droits réservés.</span>
          <span className="font-mono">Summer Vibes Only · 365 jours par an</span>
        </div>
      </div>
    </footer>
  );
}
