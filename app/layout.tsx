import { zapfHumanist601Roman } from "./fonts";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={zapfHumanist601Roman.variable}>
      <body>{children}</body>
    </html>
  );
}
