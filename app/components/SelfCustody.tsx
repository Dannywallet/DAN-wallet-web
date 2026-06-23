"use client";

import { useEffect, useState } from "react";
import { ArrowRightLeft, Copy, Share2, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import PhoneMockup from "./PhoneMockup";
import GradientBlob from "./ui/GradientBlob";

const TOKENS_API = "https://app.dannywallet.com/api/danny/tokens";
const CHART_API = "https://app.dannywallet.com/api/danny/chart";
const PORTFOLIO_API = "https://app.dannywallet.com/api/danny/portfolio";
const WDAN_PAIR = "0xce79470c765cfd64274b0d43128746bdf9e3a5d2";
const SHOW_ADDR = "0x717F5925d6C5A98071811E2a5E0b20A0A4f43459";

type Tok = { price: number; change: number; logo: string | null; name: string; mcap: number; vol: number; holders: number; supply: number };
type ChartPoint = { t: number; p: number };
type ApiTok = {
  symbol?: string; priceUsd?: number | null; change24h?: number | null;
  marketCap?: number | null; vol24hUSD?: number | null; holders?: number | null; totalSupply?: number | null; logo?: string | null;
};
type Holding = { symbol?: string; isNative?: boolean; balance?: number; valueUsd?: number | null };

function fmtUsd(n: number) { return "$" + n.toLocaleString("en-US", { maximumFractionDigits: n >= 100 ? 0 : 2 }); }
function fmtPrice(p: number) {
  if (p >= 1) return "$" + p.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (p <= 0) return "$0";
  const d = Math.min(8, Math.max(2, -Math.floor(Math.log10(p)) + 2));
  return "$" + p.toFixed(d);
}
function fmtAmt(n: number) {
  return n.toLocaleString("en-US", { maximumFractionDigits: 4 });
}
function compact(n: number) {
  return new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 2 }).format(n);
}

/* ---------- demo QR (port จากแอปจริง) ---------- */
function hashAt(seed: string, i: number): number {
  let h = 2166136261 ^ i;
  for (let k = 0; k < seed.length; k++) { h ^= seed.charCodeAt(k); h = Math.imul(h, 16777619); }
  return (h >>> 0) % 100;
}
function isFinder(x: number, y: number, n: number): boolean | null {
  const F = 7;
  const inBox = (ox: number, oy: number) => x >= ox && x < ox + F && y >= oy && y < oy + F;
  for (const [ox, oy] of [[0, 0], [n - F, 0], [0, n - F]]) {
    if (inBox(ox, oy)) {
      const lx = x - ox, ly = y - oy;
      return lx === 0 || ly === 0 || lx === F - 1 || ly === F - 1 || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
    }
  }
  return null;
}
function QrCode({ value, size = 132 }: { value: string; size?: number }) {
  const n = 29, cell = size / n;
  const rects: React.ReactNode[] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const f = isFinder(x, y, n);
      if (f !== null ? f : hashAt(value, y * n + x) < 48)
        rects.push(<rect key={`${x}-${y}`} x={x * cell} y={y * cell} width={cell + 0.5} height={cell + 0.5} rx={cell * 0.18} fill="#0b1120" />);
    }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} rx={size * 0.06} fill="#fff" />
      {rects}
    </svg>
  );
}

/* ---------- 1) Receive ---------- */
function ReceiveMini() {
  return (
    <div className="flex h-full flex-col px-3.5 pb-5 pt-9 text-white">
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/8"><ChevronLeft className="h-3.5 w-3.5" /></span>
        <span className="text-xs font-semibold">รับเหรียญ</span>
        <span className="w-7" />
      </div>
      <p className="mt-3 text-center text-[10px] font-medium text-brand-2">● เครือข่าย Danny Chain</p>
      <div className="mt-3 flex justify-center">
        <div className="rounded-2xl bg-white p-2.5">
          <QrCode value={SHOW_ADDR} size={132} />
        </div>
      </div>
      <p className="mt-3 text-center text-[9px] text-white/40">ที่อยู่กระเป๋าของคุณ</p>
      <p className="mt-1 truncate rounded-lg bg-white/5 px-2 py-1.5 text-center font-mono text-[9px]">{SHOW_ADDR}</p>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <span className="flex items-center justify-center gap-1 rounded-lg bg-gradient-to-r from-brand to-brand-2 py-1.5 text-[10px] font-semibold"><Copy className="h-3 w-3" /> คัดลอก</span>
        <span className="flex items-center justify-center gap-1 rounded-lg bg-white/8 py-1.5 text-[10px] font-semibold"><Share2 className="h-3 w-3" /> แชร์</span>
      </div>
      <p className="mt-2 rounded-lg bg-accent-yellow/10 px-2 py-1.5 text-[8px] leading-relaxed text-accent-yellow">
        ⚠ ส่งเฉพาะสินทรัพย์บนเครือข่าย Danny Chain มายังที่อยู่นี้
      </p>
    </div>
  );
}

/* ---------- 2) Price chart ---------- */
function ChartMini({ dan, chart, balance, value }: { dan: Tok; chart: ChartPoint[]; balance: number; value: number }) {
  const up = dan.change >= 0;
  // เส้นกราฟ SVG
  let path = "";
  if (chart.length >= 2) {
    const ps = chart.map((c) => c.p), min = Math.min(...ps), max = Math.max(...ps), span = max - min || 1;
    const W = 192, H = 64;
    path = chart.map((c, i) => `${i === 0 ? "M" : "L"}${((i / (chart.length - 1)) * W).toFixed(1)},${(H - ((c.p - min) / span) * H).toFixed(1)}`).join(" ");
  }
  return (
    <div className="flex h-full flex-col px-3 pb-4 pt-9 text-white">
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/8"><ChevronLeft className="h-3.5 w-3.5" /></span>
        <span className="text-xs font-semibold">Danny</span>
        {dan.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dan.logo} alt="" className="h-6 w-6 rounded-full" />
        ) : <span className="h-6 w-6 rounded-full bg-white/10" />}
      </div>
      <div className="mt-2 text-center">
        <p className="text-[9px] text-white/40">ราคา DAN</p>
        <p className="text-xl font-bold">{fmtPrice(dan.price)}</p>
        <p className={`text-[10px] font-medium ${up ? "text-accent-green" : "text-accent-red"}`}>{up ? "▲ " : "▼ "}{Math.abs(dan.change).toFixed(2)}% · 24 ชม.</p>
      </div>
      <div className="mt-2 flex items-center gap-2 rounded-xl bg-white/[0.05] px-2.5 py-2">
        {dan.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={dan.logo} alt="" className="h-7 w-7 rounded-full" />
        ) : <span className="h-7 w-7 rounded-full bg-white/10" />}
        <div className="flex-1">
          <p className="text-[8px] text-white/40">ยอดถือครอง</p>
          <p className="text-[11px] font-bold">{fmtAmt(balance)} DAN</p>
        </div>
        <p className="text-sm font-bold">{fmtUsd(value)}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-[10px] font-semibold">กราฟราคา</p>
        <div className="flex gap-1 text-[7px]">
          <span className="rounded bg-white/8 px-1.5 py-0.5">1 ชม.</span>
          <span className="rounded bg-gradient-to-r from-brand to-brand-2 px-1.5 py-0.5">24 ชม.</span>
          <span className="rounded bg-white/8 px-1.5 py-0.5">7 วัน</span>
        </div>
      </div>
      <div className="mt-1.5 rounded-xl bg-white/[0.04] p-1.5">
        {path ? (
          <svg width="100%" viewBox="0 0 192 64" preserveAspectRatio="none" className="h-[52px] w-full">
            <path d={path} fill="none" stroke={up ? "var(--color-accent-green, #22c55e)" : "#f43f5e"} strokeWidth={1.6} />
          </svg>
        ) : <div className="h-[52px]" />}
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <Stat label="มาร์เก็ตแคป" value={"$" + compact(dan.mcap)} />
        <Stat label="วอลุ่ม 24 ชม." value={"$" + compact(dan.vol)} />
        <Stat label="ผู้ถือ" value={compact(dan.holders)} />
        <Stat label="ซัพพลายรวม" value={compact(dan.supply)} />
      </div>
    </div>
  );
}
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-white/[0.04] px-2 py-1.5">
      <p className="text-[7px] text-white/40">{label}</p>
      <p className="text-[11px] font-bold">{value}</p>
    </div>
  );
}

/* ---------- 3) Swap ---------- */
function SwapMini({ dan, to, danBal, toBal }: { dan: Tok; to: { symbol: string; price: number; logo: string | null }; danBal: number; toBal: number }) {
  const rate = dan.price && to.price ? dan.price / to.price : null;
  return (
    <div className="flex h-full flex-col px-3 pb-3 pt-9 text-white">
      <div className="flex items-center justify-between">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-white/8"><ChevronLeft className="h-3.5 w-3.5" /></span>
        <span className="text-xs font-semibold">สลับเหรียญ</span>
        <span className="text-[8px] text-white/40">dandex</span>
      </div>

      <div className="relative mt-2 space-y-1.5">
        <SwapBox label="จ่าย" bal={`${fmtAmt(danBal)} DAN`} sym="DAN" logo={dan.logo} max />
        <span className="absolute left-1/2 top-1/2 z-10 grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2"><ArrowRightLeft className="h-3.5 w-3.5" /></span>
        <SwapBox label="รับ" bal={`${fmtAmt(toBal)} ${to.symbol}`} sym={to.symbol} logo={to.logo} />
      </div>

      <div className="mt-2 space-y-1.5 rounded-xl bg-white/[0.05] p-2.5 text-[9px]">
        <div className="flex justify-between"><span className="text-white/40">อัตราแลกเปลี่ยน</span><span className="font-medium">{rate ? `1 DAN ≈ ${fmtAmt(rate)} ${to.symbol}` : "—"}</span></div>
        <div className="flex items-center justify-between">
          <span className="text-white/40">Slippage</span>
          <div className="flex gap-1 text-[7px]">
            <span className="rounded bg-gradient-to-r from-brand to-brand-2 px-1.5 py-0.5">0.5%</span>
            <span className="rounded bg-white/8 px-1.5 py-0.5">1%</span>
            <span className="rounded bg-white/8 px-1.5 py-0.5">2%</span>
          </div>
        </div>
        <div className="flex justify-between"><span className="text-white/40">มูลค่าโดยประมาณ</span><span className="font-medium">$0.00</span></div>
      </div>

      <p className="mt-2 flex items-start gap-1 rounded-lg bg-accent-green/[0.08] px-2 py-1.5 text-[8px] text-white/50">
        <ShieldCheck className="mt-0.5 h-2.5 w-2.5 shrink-0 text-accent-green" /> สลับจริงผ่าน router ของ dandex — ลงนามด้วยบัญชี 0x717F…3459
      </p>
      <div className="mt-2 rounded-xl bg-white/8 py-2.5 text-center text-[11px] font-semibold text-white/50">กรอกจำนวน</div>
    </div>
  );
}
function SwapBox({ label, bal, sym, logo, max }: { label: string; bal: string; sym: string; logo: string | null; max?: boolean }) {
  return (
    <div className="rounded-xl bg-white/[0.05] p-2.5">
      <div className="flex items-center justify-between text-[8px] text-white/40">
        <span>{label}</span>
        <span>คงเหลือ {bal}{max && <span className="ml-1 text-brand-2">สูงสุด</span>}</span>
      </div>
      <div className="mt-1 flex items-center justify-between">
        <span className="text-lg font-bold">0.00</span>
        <span className="flex items-center gap-1 rounded-full bg-white/8 py-1 pl-1 pr-2">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-5 w-5 rounded-full" />
          ) : <span className="h-5 w-5 rounded-full bg-white/15" />}
          <span className="text-[10px] font-semibold">{sym}</span>
          <ChevronRight className="h-3 w-3 text-white/40" />
        </span>
      </div>
    </div>
  );
}

/* ---------- section ---------- */
const DAN_FALLBACK: Tok = { price: 0.00531, change: 0.58, logo: null, name: "Danny", mcap: 3200, vol: 88540, holders: 33, supply: 12_600_000 };

export default function SelfCustody() {
  const [dan, setDan] = useState<Tok>(DAN_FALLBACK);
  const [chart, setChart] = useState<ChartPoint[]>([]);
  const [to, setTo] = useState<{ symbol: string; price: number; logo: string | null }>({ symbol: "HMOOB", price: 0.0035, logo: null });
  const [danBal, setDanBal] = useState(501.1811);
  const [danVal, setDanVal] = useState(2.66);
  const [toBal, setToBal] = useState(5.2051);

  useEffect(() => {
    let alive = true;
    const norm = (s?: string) => (s || "").toUpperCase();
    // tokens
    fetch(TOKENS_API).then((r) => r.json()).then((j: { tokens?: ApiTok[] }) => {
      if (!alive) return;
      const ts = j.tokens || [];
      const w = ts.find((t) => norm(t.symbol) === "WDAN");
      if (w && w.priceUsd != null)
        setDan({
          price: w.priceUsd, change: Number(w.change24h) || 0, logo: w.logo ?? null, name: "Danny",
          mcap: Number(w.marketCap) || DAN_FALLBACK.mcap, vol: Number(w.vol24hUSD) || DAN_FALLBACK.vol,
          holders: Number(w.holders) || DAN_FALLBACK.holders, supply: Number(w.totalSupply) || DAN_FALLBACK.supply,
        });
      // เหรียญรับ (HMOOB ถ้ามี ไม่งั้นตัวที่มีราคาตัวแรกที่ไม่ใช่ DAN/USDT)
      const hm = ts.find((t) => norm(t.symbol) === "HMOOB" && t.priceUsd != null)
        || ts.find((t) => t.priceUsd != null && !["WDAN", "USDT", "DAN"].includes(norm(t.symbol)));
      if (hm) setTo({ symbol: hm.symbol ?? "TOKEN", price: hm.priceUsd ?? 0, logo: hm.logo ?? null });
    }).catch(() => {});
    // chart (DAN)
    fetch(`${CHART_API}?pair=${WDAN_PAIR}&range=24h`).then((r) => r.json()).then((j: { points?: ChartPoint[] }) => {
      if (alive && j.points && j.points.length >= 2) setChart(j.points);
    }).catch(() => {});
    // พอร์ตจริงของ address ตัวอย่าง
    fetch(`${PORTFOLIO_API}?address=${SHOW_ADDR}`).then((r) => r.json()).then((j: { holdings?: Holding[] }) => {
      if (!alive) return;
      const hs = j.holdings || [];
      const d = hs.find((h) => h.isNative || norm(h.symbol) === "DAN");
      if (d) { setDanBal(d.balance ?? 501.1811); setDanVal(d.valueUsd ?? 2.66); }
      const t = hs.find((h) => norm(h.symbol) === "HMOOB");
      if (t) setToBal(t.balance ?? 5.2051);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);

  const screens = [<ReceiveMini key="r" />, <ChartMini key="c" dan={dan} chart={chart} balance={danBal} value={danVal} />, <SwapMini key="s" dan={dan} to={to} danBal={danBal} toBal={toBal} />];

  return (
    <section className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-purple" size="h-80 w-80" className="right-0 top-20 opacity-20" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Easy Self-Custody"
            title="One app. Unlimited wallets."
            subtitle="Create separate wallets for spending, saving, and trading — each fully under your control. Switch between them in a tap, with no accounts and nothing to sign up for."
          />
        </Reveal>

        <div className="mt-16 flex flex-wrap items-start justify-center gap-8">
          {screens.map((screen, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className={i === 1 ? "lg:-translate-y-6" : ""}>
                <PhoneMockup width={250}>{screen}</PhoneMockup>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
