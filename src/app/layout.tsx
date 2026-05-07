import type { Metadata } from "next";
import { Anton, Allura, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor } from "@/components/Cursor";
import { VideoAutoplay } from "@/components/VideoAutoplay";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const allura = Allura({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-allura",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tasty Crousty — L'original. Le seul. Le numéro 1.",
  description:
    "Une barquette chaude. Du riz fondant. Du poulet frit ultra croustillant. Une sauce maison devenue culte. +130 millions de vues. 60+ restaurants en France.",
  openGraph: {
    title: "Tasty Crousty — L'original. Le seul. Le numéro 1.",
    description:
      "Le bonheur est dans les choses simples. Une barquette, un crousty, zéro compromis.",
    type: "website",
    locale: "fr_FR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${anton.variable} ${allura.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <SmoothScroll />
        <VideoAutoplay />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
