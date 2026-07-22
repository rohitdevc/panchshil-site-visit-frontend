import type { Metadata } from "next";
import { getMetaData, getBanner } from "@/lib/common";
import { getProperties, getInvestmentTimelines } from "@/lib/customer-form";
import { CustomerFormPage } from "@/components/pages/customer-form";

const [
  meta,
  banner,
  property_categories,
  investment_timelines
] = await Promise.all([
  getMetaData("Form"),
  getBanner("Home"),
  getProperties(),
  getInvestmentTimelines()
]);

export const revalidate = 0;

const basePath = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const canonical_tag = basePath + meta.canonical_tag;

export const metadata: Metadata = {
  title: meta.meta_title,
  description: meta.meta_description,
  alternates: {
    canonical: canonical_tag
  },
  openGraph: {
      title: meta.meta_title,
      description: meta.meta_description,
      type: "website",
      url: canonical_tag,
      siteName: "Panchshil Realty",
      images: [
        {
          url: banner.banner_image,
          width: 1200,
          height: 630,
          alt: meta.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.meta_title,
      description: meta.meta_description,
      images: [banner.banner_image],
    },
}

export default function CustomerForm() {
  return <CustomerFormPage property_categories={property_categories} investment_timelines={investment_timelines} />;
}
