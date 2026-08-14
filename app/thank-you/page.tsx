import type { Metadata } from "next";
import { getMetaData, getBanner } from "@/lib/common";
import { ThankYouPage } from "@/components/pages/thank-you";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const [meta, banner] = await Promise.all([
    getMetaData("Thank You"),
    getBanner("Thank You")
  ]);

  const basePath = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";
  const canonical_tag = basePath + meta.canonical_tag;

  return {
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
  };
}

export default async function ThankYou() {
  const banner = await getBanner("Thank You");
  
  return <ThankYouPage banner={banner} />;
}