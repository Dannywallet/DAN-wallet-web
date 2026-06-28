"use client";

import { useEffect, useRef, useState } from "react";
import { Repeat, Link2, Globe, Zap, ChevronDown } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import GradientBlob from "./ui/GradientBlob";

// ราคา/ยอดจริงจากแอป wallet (on-chain Danny Chain) — เปิด CORS ไว้ที่ /api/*
const TOKENS_API = "https://app.dannywallet.com/api/danny/tokens";
const PORTFOLIO_API = "https://app.dannywallet.com/api/danny/portfolio";
const SHOW_ADDR = "0x717F5925d6C5A98071811E2a5E0b20A0A4f43459";

type ApiTok = { symbol?: string; priceUsd?: number | null; logo?: string | null };
type Holding = { symbol?: string; isNative?: boolean; balance?: number };
type Token = { sym: string; price: number; logo: string | null; balance: number };

const points = [
  { icon: Repeat, text: "Swap across chains with built-in decentralized exchanges" },
  { icon: Link2, text: "Connect to any dApp securely with WalletConnect" },
  { icon: Globe, text: "Access thousands of DeFi protocols straight from your wallet" },
  { icon: Zap, text: "Sign transactions you can actually read and understand" },
];

const FALLBACK: Token[] = [
  { sym: "DAN", price: 0.00531, logo: null, balance: 501.1811 },
  { sym: "HMOOB", price: 0.0035, logo: null, balance: 5.2051 },
  { sym: "USDT", price: 1, logo: null, balance: 2 },
];

function colorFor(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 70% 50%)`;
}
function fmtAmt(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e4) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString("en-US", { maximumFractionDigits: n >= 1 ? 2 : 4 });
}

function TokenIcon({ t, size = 24 }: { t: Token; size?: number }) {
  if (t.logo) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={t.logo} alt={t.sym} width={size} height={size} className="shrink-0 rounded-full object-cover" style={{ width: size, height: size }} />;
  }
  return (
    <span
      className="grid shrink-0 place-items-center rounded-full text-[9px] font-bold text-white"
      style={{ width: size, height: size, background: t.sym === "DAN" ? "linear-gradient(135deg,#7c5cff,#4f8cff)" : colorFor(t.sym) }}
    >
      {t.sym.slice(0, 3)}
    </span>
  );
}

function TokenSelect({ sel, tokens, onSelect }: { sel: Token; tokens: Token[]; onSelect: (t: Token) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} className="relative shrink-0">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-full bg-white/10 py-1 pl-1 pr-2.5 text-xs font-bold text-white transition hover:bg-white/15"
      >
        <TokenIcon t={sel} size={22} />
        {sel.sym}
        <ChevronDown className={`h-3.5 w-3.5 text-white/60 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-2 max-h-56 w-48 space-y-0.5 overflow-y-auto rounded-2xl border border-white/10 p-1.5 shadow-2xl"
          style={{ background: "#0e0e17" }}
        >
          {tokens.map((t) => (
            <button
              key={t.sym}
              onClick={() => { onSelect(t); setOpen(false); }}
              className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition hover:bg-white/[0.06] ${t.sym === sel.sym ? "bg-white/[0.06]" : ""}`}
            >
              <TokenIcon t={t} size={26} />
              <span className="flex-1 text-sm font-medium text-white">{t.sym}</span>
              <span className="text-[11px] text-white/40">{fmtAmt(t.balance)}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function DeFi() {
  const [tokens, setTokens] = useState<Token[]>(FALLBACK);
  const [pay, setPay] = useState<Token>(FALLBACK[0]);
  const [recv, setRecv] = useState<Token>(FALLBACK[1]);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let alive = true;
    const norm = (s?: string) => (s || "").toUpperCase();
    Promise.all([
      fetch(TOKENS_API).then((r) => r.json()).catch(() => ({})),
      fetch(`${PORTFOLIO_API}?address=${SHOW_ADDR}`).then((r) => r.json()).catch(() => ({})),
    ]).then(([tj, pj]: [{ tokens?: ApiTok[] }, { holdings?: Holding[] }]) => {
      if (!alive) return;
      const bal = new Map<string, number>();
      for (const h of pj.holdings || []) {
        const s = h.isNative ? "DAN" : norm(h.symbol);
        if (s) bal.set(s, h.balance ?? 0);
      }
      const list: Token[] = [];
      for (const t of tj.tokens || []) {
        if (t.priceUsd == null || !t.symbol) continue;
        const sym = norm(t.symbol) === "WDAN" ? "DAN" : (t.symbol as string);
        if (list.some((x) => x.sym === sym)) continue;
        list.push({ sym, price: t.priceUsd, logo: t.logo ?? null, balance: bal.get(norm(sym)) ?? bal.get(sym) ?? 0 });
      }
      // DAN ขึ้นก่อนเสมอ
      list.sort((a, b) => (a.sym === "DAN" ? -1 : b.sym === "DAN" ? 1 : 0));
      if (list.length >= 2) {
        setTokens(list);
        setPay(list.find((t) => t.sym === "DAN") ?? list[0]);
        setRecv(list.find((t) => t.sym === "HMOOB") ?? list.find((t) => t.sym !== "DAN") ?? list[1]);
        setLive(true);
      }
    });
    return () => { alive = false; };
  }, []);

  // เลือกฝั่งจ่าย: ถ้าซ้ำกับฝั่งรับ → สลับให้
  const pickPay = (t: Token) => { if (t.sym === recv.sym) setRecv(pay); setPay(t); };
  const pickRecv = (t: Token) => { if (t.sym === pay.sym) setPay(recv); setRecv(t); };
  const flip = () => { const p = pay; setPay(recv); setRecv(p); };

  const payAmt = pay.balance;
  const recvAmt = recv.price > 0 ? (payAmt * pay.price) / recv.price : 0;

  return (
    <section id="defi" className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-green" size="h-80 w-80" className="right-[-5rem] top-0 opacity-20" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        {/* visual */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
            <div className="rounded-2xl bg-gradient-to-br from-brand/15 to-brand-2/10 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">You pay</span>
                <span className="text-sm text-muted">Balance {fmtAmt(pay.balance)} {pay.sym}</span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-2xl font-bold">{fmtAmt(payAmt)} {pay.sym}</span>
                <TokenSelect sel={pay} tokens={tokens} onSelect={pickPay} />
              </div>
            </div>

            <div className="my-3 flex justify-center">
              <button
                onClick={flip}
                aria-label="Flip direction"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface transition hover:border-white/25"
              >
                <Repeat className="h-4 w-4 text-brand-2" />
              </button>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-accent-blue/15 to-accent-green/10 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">You receive</span>
                <span className="flex items-center gap-1 text-sm text-accent-green">
                  {live && <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />} Best rate
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <span className="min-w-0 truncate text-2xl font-bold">{fmtAmt(recvAmt)} {recv.sym}</span>
                <TokenSelect sel={recv} tokens={tokens} onSelect={pickRecv} />
              </div>
            </div>

            <Button href="https://app.dannywallet.com/wallet" className="mt-6 w-full" size="lg">
              Swap now
            </Button>
          </div>
        </Reveal>

        <Reveal className="order-1 lg:order-2">
          <SectionHeading
            center={false}
            eyebrow="DeFi Enabled"
            title={
              <>
                The whole of DeFi,
                <br />
                <span className="text-gradient">in your pocket</span>
              </>
            }
          />
          <ul className="mt-8 space-y-4">
            {points.map((p) => (
              <li key={p.text} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand/15 ring-1 ring-white/10">
                  <p.icon className="h-4 w-4 text-brand-2" />
                </span>
                <span className="text-muted">{p.text}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
