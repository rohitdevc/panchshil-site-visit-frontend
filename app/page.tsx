import type { Metadata } from "next";
import { getMetaData, getBanner } from "@/lib/common";
import { getIntroduction } from "@/lib/home";
import { HomePage } from "@/components/pages/home";

const [
  meta,
  banner,
  introduction
] = await Promise.all([
  getMetaData("Home"),
  getBanner("Home"),
  getIntroduction()
]);

export const revalidate = 0;

const basePath = process.env.NEXT_PUBLIC_DOMAIN_NAME;

const canonical_tag = basePath;

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

export default function Home() {
  return <HomePage introduction={introduction} />;
}
