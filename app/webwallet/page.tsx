import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Danny Wallet — Web App",
  description:
    "Your self-custody Danny Wallet, right in the browser. Create or unlock your wallet and manage real assets on Danny Chain.",
};

// แอป wallet จริง (รันที่ subdomain app.dannywallet.com) — ฝังผ่าน iframe
const APP_URL = "https://app.dannywallet.com/wallet";

export default function WebWallet() {
  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      {/* แถบหัว: โลโก้ + กลับหน้าหลัก + เปิดในแท็บใหม่ */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 bg-background/80 px-4 backdrop-blur-xl sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-src.png" alt="Danny Wallet" className="h-8 w-8" />
          <span className="text-base font-bold tracking-tight">Danny Wallet</span>
        </Link>

        <div className="flex items-center gap-1.5">
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-foreground sm:flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            เปิดในแท็บใหม่
          </a>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline">กลับหน้าหลัก</span>
          </Link>
        </div>
      </header>

      {/* แอป wallet จริง */}
      <iframe
        src={APP_URL}
        title="Danny Wallet"
        className="w-full flex-1 border-0"
        allow="clipboard-read; clipboard-write; camera"
      />
    </div>
  );
}
