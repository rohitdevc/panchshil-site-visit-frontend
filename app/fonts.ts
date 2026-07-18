import localFont from "next/font/local";

import { Open_Sans } from "next/font/google";

export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-open-sans",
  display: "swap",
});

export const zapfHumanist601Roman = localFont({
  src: [
    {
      path: "../public/fonts/ZapfHumanist601Roman/font.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ZapfHumanist601Roman/font.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-zapf-humanist",
  display: "swap",
});

export const zapfHumanist601Bold = localFont({
  src: [
    {
      path: "../public/fonts/ZapfHumanist601Bold/font.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/ZapfHumanist601Bold/font.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-zapf-humanist-bold",
  display: "swap",
});

export const zapfHumanist601Semi = localFont({
  src: [
    {
      path: "../public/fonts/ZapfHumanist601Demi/font.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/ZapfHumanist601Demi/font.woff",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-zapf-humanist-semi",
  display: "swap",
});

export const zapfHumanist601Ultra = localFont({
  src: [
    {
      path: "../public/fonts/ZapfHumanist601Ultra/font.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/ZapfHumanist601Ultra/font.woff",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-zapf-humanist-ultra",
  display: "swap",
});
