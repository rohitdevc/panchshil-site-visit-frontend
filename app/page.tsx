import type { Metadata } from "next";
import { HomeHero } from "@/components/home-hero";

export const metadata: Metadata = {
  title: "Panchshil | Private Consultation",
  description: "Begin your Panchshil consultation.",
};

export default function Home() {
  return <HomeHero />;
}
