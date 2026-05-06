import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { PhenomeneViral } from "@/components/PhenomeneViral";
import { Marquee } from "@/components/Marquee";
import { ShowcaseProduit } from "@/components/ShowcaseProduit";
import { TroisIngredients } from "@/components/TroisIngredients";
import { TakeARide } from "@/components/TakeARide";
import { IlsEnParlent } from "@/components/IlsEnParlent";
import { NotreAdresse } from "@/components/NotreAdresse";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative">
      <Nav />
      <Hero />

      {/* Stacking block: each section is sticky-top with rising z-index, so
          the next slides over the previous like turning pages of a book. */}
      <div className="relative">
        <PhenomeneViral />
        <ShowcaseProduit />
        <TroisIngredients />
      </div>

      <Marquee />
      <TakeARide />
      <IlsEnParlent />
      <NotreAdresse />
      <Footer />
    </main>
  );
}
