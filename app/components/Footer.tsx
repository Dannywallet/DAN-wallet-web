import Link from "next/link";

// โลโก้แบรนด์ (lucide เวอร์ชันนี้ตัด brand icon ออก จึงใช้ inline SVG)
type IconProps = { className?: string };
function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.84c0-2.52 1.5-3.91 3.78-3.91 1.1 0 2.24.2 2.24.2v2.47H15.2c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}
function TelegramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M21.94 4.6 18.9 19.2c-.23 1.02-.84 1.27-1.7.79l-4.7-3.46-2.27 2.18c-.25.25-.46.46-.94.46l.33-4.78L18.4 6.7c.38-.34-.08-.53-.59-.19L7.07 13.34l-4.66-1.46c-1.01-.32-1.03-1.01.21-1.5L20.63 3.1c.84-.31 1.58.2 1.31 1.5Z" />
    </svg>
  );
}
function XIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.97 6.82H1.66l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.84L7.01 4.13H5.03l12.05 15.64Z" />
    </svg>
  );
}
function GithubIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.05 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.92-2.34 4.78-4.57 5.04.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Security", href: "#security" },
      { label: "DeFi", href: "#defi" },
      { label: "Analytics", href: "#analytics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "#faq" },
      { label: "Security Audit", href: "/security/" },
      { label: "Source Code", href: "https://github.com/Dannywallet/danny-wallet" },
      { label: "Bug Bounty", href: "/bug-bounty/" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", href: "/terms/" },
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Disclosures", href: "/disclosures/" },
    ],
  },
];

const socials = [
  { icon: FacebookIcon, href: "https://www.facebook.com/danchain69/", label: "Facebook" },
  { icon: TelegramIcon, href: "https://t.me/dannytoken", label: "Telegram" },
  { icon: XIcon, href: "https://x.com/Dan74668", label: "Twitter" },
  { icon: GithubIcon, href: "https://github.com/Dannywallet", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Link href="#top" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-src.png" alt="DAN Wallet" className="h-8 w-8" />
              <span className="text-lg font-bold tracking-tight">
                Danny Wallet
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              The self-custody crypto wallet built for real-world security. Own
              your keys, own your future.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted transition-colors hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* คอลัมน์เมนู: มือถือ = 2 คอลัมน์, เดสก์ท็อป = ไหลเข้า grid 4 ช่องเดิม (lg:contents) */}
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:contents">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const external = /^https?:\/\//.test(l.href);
                  return (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-muted transition-colors hover:text-foreground"
                    >
                      {l.label}
                    </Link>
                  </li>
                  );
                })}
              </ul>
            </div>
          ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Danny Wallet. All rights reserved.</p>
          <p>Non-custodial · Open source · Privacy first</p>
        </div>
      </div>
    </footer>
  );
}
