import type { Metadata } from "next";
import { Playfair_Display, Inter, Montserrat } from "next/font/google";
import "./globals.css";
import FloatingEnquiry from "@/components/FloatingEnquiry";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Angelic Beauty & Wellness Studio | Premium Salon",
  description: "Experience luxury beauty, grooming, and wellness at Angelic Beauty & Wellness Studio. Established in 2017.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} ${montserrat.variable} antialiased`}
      >
        {children}
        <FloatingEnquiry />
      </body>
    </html>
  );
}
