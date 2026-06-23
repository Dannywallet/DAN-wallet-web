"use client";

import { useEffect, useState } from "react";
import {
  ArrowUp, ArrowDown, ArrowRightLeft, Compass, Bell, Eye, ChevronRight,
  ShieldCheck, Home, Activity, Settings,
} from "lucide-react";

// ราคาจริงจากแอป wallet (on-chain Danny Chain) — เปิด CORS ไว้ที่ /api/*
const TOKENS_API = "https://app.dannywallet.com/api/danny/tokens";
const COIN_IMG = "https://app.dannywallet.com/danny-mockup1.png";
// มูลค่า USD สาธิตต่อช่อง — จำนวนเหรียญ derive จากราคาจริง
const TARGETS = [5000, 2000, 800, 200];

type Row = { symbol: string; name: string; amount: number; value: number; price: number; change: number; logo: string | null; isNative: boolean };
type ApiToken = {
  symbol?: string; name?: string; priceUsd?: number | null;
  change24h?: number | null; marketCap?: number | null; vol24hUSD?: number | null; logo?: string | null;
};

const FALLBACK: Row[] = [
  { symbol: "DAN", name: "Danny", amount: 942_000, value: 5000, price: 0.00531, change: 15.15, logo: null, isNative: true },
  { symbol: "USDT", name: "Tether USD", amount: 2000, value: 2000, price: 1, change: 0.0, logo: null, isNative: false },
  { symbol: "HMOOB", name: "Hmoob Coin", amount: 175_000, value: 800, price: 0.0035, change: -30.33, logo: null, isNative: false },
];

function colorFor(s: string): string {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return `hsl(${h % 360} 65% 48%)`;
}
function fmtUsd(n: number): string {
  return "$" + n.toLocaleString("en-US", { maximumFractionDigits: n >= 100 ? 0 : 2 });
}
function fmtAmt(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(2) + "M";
  if (n >= 1e4) return (n / 1e3).toFixed(1) + "K";
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}
function fmtPrice(p: number): string {
  if (p >= 1) return "$" + p.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (p <= 0) return "$0";
  const d = Math.min(8, Math.max(2, -Math.floor(Math.log10(p)) + 2));
  return "$" + p.toFixed(d);
}

const actions = [
  { icon: ArrowUp, label: "ส่ง" },
  { icon: ArrowDown, label: "รับ" },
  { icon: ArrowRightLeft, label: "สลับ" },
  { icon: Compass, label: "สำรวจ" },
];
const navItems = [
  { icon: Home, label: "หน้าหลัก" },
  { icon: Activity, label: "กิจกรรม" },
  { icon: Compass, label: "Explorer" },
  { icon: ArrowRightLeft, label: "สลับ" },
  { icon: Settings, label: "ตั้งค่า" },
];

/** Wallet home screen mockup — ดีไซน์ตามแอปจริง + ราคา/โลโก้/24ชม. สดจาก Danny Chain. */
export default function WalletScreen() {
  const [rows, setRows] = useState<Row[]>(FALLBACK);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let alive = true;
    const load = () => {
      fetch(TOKENS_API)
        .then((r) => r.json())
        .then((j: { tokens?: ApiToken[] }) => {
          if (!alive) return;
          const norm = (s?: string) => (s || "").toUpperCase();
          const priced = (j.tokens || []).filter(
            (t): t is ApiToken & { priceUsd: number; symbol: string } => t.priceUsd != null && !!t.symbol
          );
          const wdan = priced.find((t) => norm(t.symbol) === "WDAN");
          const usdt = priced.find((t) => norm(t.symbol) === "USDT");
          const rest = priced
            .filter((t) => norm(t.symbol) !== "WDAN" && norm(t.symbol) !== "USDT")
            .sort((a, b) => (b.vol24hUSD ?? 0) - (a.vol24hUSD ?? 0) || (b.marketCap ?? 0) - (a.marketCap ?? 0));
          const ord = [
            ...(wdan ? [{ ...wdan, symbol: "DAN", name: "Danny", isNative: true }] : []),
            ...(usdt ? [{ ...usdt, isNative: false }] : []),
            ...rest.map((t) => ({ ...t, isNative: false })),
          ].slice(0, 4);
          if (ord.length >= 2) {
            setRows(
              ord.map((t, i) => {
                const target = TARGETS[i] ?? 200;
                return {
                  symbol: t.symbol,
                  name: t.name || t.symbol,
                  amount: target / (t.priceUsd as number),
                  value: target,
                  price: t.priceUsd as number,
                  change: typeof t.change24h === "number" ? t.change24h : 0,
                  logo: t.logo ?? null,
                  isNative: t.isNative,
                };
              })
            );
            setLive(true);
          }
        })
        .catch(() => {});
    };
    load();
    const id = setInterval(load, 30_000);
    return () => { alive = false; clearInterval(id); };
  }, []);

  const total = rows.reduce((s, r) => s + r.value, 0);
  const totalChange = total > 0 ? rows.reduce((s, r) => s + r.value * r.change, 0) / total : 0;
  const up = totalChange >= 0;

  return (
    <div className="flex h-full flex-col text-white">
      <div className="flex-1 space-y-3 px-3.5 pt-9">
        {/* network header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] text-white/40">เครือข่าย</p>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />
              <span className="text-sm font-semibold">Danny Chain</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="flex items-center gap-1 rounded-full border border-accent-green/30 bg-accent-green/10 px-2 py-0.5 text-[8px] font-medium text-accent-green">
              <ShieldCheck className="h-2.5 w-2.5" /> ข้อมูลจริง
              {live && <span className="ml-0.5 h-1 w-1 rounded-full bg-accent-green" />}
            </span>
            <span className="grid h-6 w-6 place-items-center rounded-full bg-white/5 text-white/50">
              <Bell className="h-3 w-3" />
            </span>
          </div>
        </div>

        {/* balance card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 rounded-full bg-white/8 px-2 py-0.5 text-[9px]">
              บัญชี 1 <span className="text-white/40">0x717F…3459</span>
              <ChevronRight className="h-2.5 w-2.5 text-white/40" />
            </span>
            <Eye className="h-3.5 w-3.5 text-white/40" />
          </div>
          <div className="mt-2 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[9px] uppercase tracking-wide text-white/40">ยอดรวมทั้งหมด</p>
              <p className="mt-0.5 text-2xl font-bold tracking-tight">{fmtUsd(total)}</p>
              <p className={`mt-0.5 text-[10px] font-medium ${up ? "text-accent-green" : "text-accent-red"}`}>
                {up ? "▲ +" : "▼ "}
                {Math.abs(totalChange).toFixed(2)}% <span className="text-white/40">24 ชม.</span>
              </p>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={COIN_IMG} alt="" className="h-14 w-auto shrink-0 object-contain" />
          </div>
        </div>

        {/* actions */}
        <div className="grid grid-cols-4 gap-1.5">
          {actions.map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/8 ring-1 ring-white/10">
                <Icon className="h-4 w-4 text-brand-2" />
              </div>
              <span className="text-[9px] text-white/60">{label}</span>
            </div>
          ))}
        </div>

        {/* assets */}
        <div className="flex items-center justify-between pt-0.5">
          <p className="text-xs font-semibold">สินทรัพย์ของฉัน</p>
          <span className="text-[9px] text-white/40">{rows.length} เหรียญ</span>
        </div>
        <div className="space-y-1.5">
          {rows.slice(0, 3).map((t) => (
            <div key={t.symbol} className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-2.5 py-2">
              {t.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={t.logo} alt="" className="h-8 w-8 rounded-full object-cover" />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-[8px] font-bold text-white" style={{ backgroundColor: colorFor(t.symbol) }}>
                  {t.symbol.slice(0, 3)}
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1 text-[11px] font-semibold">
                  {t.symbol}
                  {t.isNative && <span className="rounded bg-brand/30 px-1 text-[7px] text-brand-2">เนทีฟ</span>}
                </p>
                <p className="text-[9px] text-white/40">{fmtPrice(t.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold">{fmtUsd(t.value)}</p>
                <p className={`text-[9px] ${t.change >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                  {t.change >= 0 ? "+" : ""}
                  {t.change.toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* bottom nav */}
      <div className="mt-2 grid grid-cols-5 gap-0.5 border-t border-white/10 bg-white/[0.03] px-1.5 pb-3 pt-2">
        {navItems.map(({ icon: Icon, label }, i) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span className={`grid h-8 w-8 place-items-center rounded-xl ${i === 0 ? "bg-gradient-to-br from-brand to-brand-2 text-white" : "text-white/45"}`}>
              <Icon className="h-4 w-4" />
            </span>
            <span className={`text-[8px] ${i === 0 ? "text-white" : "text-white/45"}`}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
