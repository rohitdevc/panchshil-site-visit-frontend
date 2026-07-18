import type { Metadata } from "next";
import { CustomerFormPage } from "@/components/customer-form";

export const metadata: Metadata = {
  title: "Panchshil | Private Consultation",
  description: "Begin your Panchshil consultation.",
};

export default function CustomerForm() {
  return <CustomerFormPage />;
}
