import type { Metadata } from "next";
import "../src/index.css";
import "swiper/css/bundle";

export const metadata: Metadata = {
  title: "VM Studio - Web & Marketing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body>{children}</body>
    </html>
  );
}
