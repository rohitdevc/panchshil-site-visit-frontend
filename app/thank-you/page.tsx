import type { Metadata } from "next";
import { ThankYouPage } from "@/components/pages/thank-you";

export const metadata: Metadata = {
  title: "Panchshil | Private Consultation",
  description: "Begin your Panchshil consultation.",
};

export default function ThankYou() {
  return <ThankYouPage />;
}
