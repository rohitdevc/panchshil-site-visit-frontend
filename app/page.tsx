import type { Metadata } from "next";
import { getMetaData, getBanner } from "@/lib/common";
import { getIntroduction } from "@/lib/home";
import { HomePage } from "@/components/pages/home";

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const [meta, banner] = await Promise.all([
    getMetaData("Home"),
    getBanner("Home")
  ]);

  const basePath = process.env.NEXT_PUBLIC_DOMAIN_NAME || "";

  return {
    title: meta?.meta_title,
    description: meta?.meta_description,
    alternates: {
      canonical: basePath
    },
    openGraph: {
      title: meta?.meta_title,
      description: meta?.meta_description,
      type: "website",
      url: basePath,
      siteName: "Panchshil Realty",
      images: [
        {
          url: banner?.banner_image,
          width: 1200,
          height: 630,
          alt: meta?.meta_title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta?.meta_title,
      description: meta?.meta_description,
      images: [banner?.banner_image],
    },
  };
}

export default async function Home() {
  const introduction = await getIntroduction();

  return <HomePage introduction={introduction} />;
}