import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Danny Wallet — Self-Custody Crypto Wallet",
  description:
    "Danny Wallet is a non-custodial, multi-chain crypto wallet built for real-world security. Own your keys, swap across chains, explore DeFi, and track 5000+ assets — all from your phone.",
  keywords: [
    "crypto wallet",
    "self-custody",
    "non-custodial",
    "multi-chain",
    "DeFi",
    "bitcoin",
    "ethereum",
    "Danny Wallet",
  ],
  openGraph: {
    title: "Danny Wallet — Self-Custody Crypto Wallet",
    description:
      "Crypto wallet with high security. Non-custodial, multi-chain, and private by design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
