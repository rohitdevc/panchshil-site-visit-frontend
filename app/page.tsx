import type { Metadata } from "next";
import { HomePage } from "@/components/pages/home";

export const metadata: Metadata = {
  title: "Panchshil | Private Consultation",
  description: "Begin your Panchshil consultation.",
};

export default function Home() {
  return <HomePage />;
}
