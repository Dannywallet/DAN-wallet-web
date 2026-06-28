"use client";

import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown, Box, Clock, ArrowLeftRight, Wallet } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import GradientBlob from "./ui/GradientBlob";

// ข้อมูลจริงบน Danny Chain (on-chain) — เปิด CORS ไว้ที่ /api/*
const CHART_API = "https://app.dannywallet.com/api/danny/chart";
const EXPLORER_API = "https://app.dannywallet.com/api/danny/explorer";
const WDAN_PAIR = "0xce79470c765cfd64274b0d43128746bdf9e3a5d2";

type ChartPoint = { t: number; p: number };
type Stats = { totalBlocks: number; totalTransactions: number; totalAddresses: number; avgBlockTimeSec: number };

const FALLBACK_BARS = [38, 52, 44, 66, 58, 78, 70, 92, 84, 100];
const FALLBACK_STATS: Stats = { totalBlocks: 1_973_129, totalTransactions: 99_210, totalAddresses: 2_002_927, avgBlockTimeSec: 2 };

const num = (n: number) => n.toLocaleString("en-US");
const STAT_CARDS: { key: keyof Stats; label: string; icon: typeof Box; fmt: (n: number) => string }[] = [
  { key: "totalBlocks", label: "Total blocks", icon: Box, fmt: num },
  { key: "avgBlockTimeSec", label: "Average block time", icon: Clock, fmt: (n) => `${n.toFixed(1)}s` },
  { key: "totalTransactions", label: "Total transactions", icon: ArrowLeftRight, fmt: num },
  { key: "totalAddresses", label: "Wallet addresses", icon: Wallet, fmt: num },
];

function fmtPrice(p: number): string {
  if (p >= 1) return "$" + p.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (p <= 0) return "$0";
  const d = Math.min(8, Math.max(2, -Math.floor(Math.log10(p)) + 2));
  return "$" + p.toFixed(d);
}

function toBars(points: ChartPoint[], n = 12): number[] {
  if (points.length < 2) return FALLBACK_BARS;
  const step = (points.length - 1) / (n - 1);
  const sampled = Array.from({ length: n }, (_, i) => points[Math.round(i * step)].p);
  const min = Math.min(...sampled);
  const max = Math.max(...sampled);
  const span = max - min || 1;
  return sampled.map((p) => 15 + ((p - min) / span) * 85);
}

export default function Analytics() {
  const [bars, setBars] = useState<number[]>(FALLBACK_BARS);
  const [price, setPrice] = useState<number | null>(null);
  const [change, setChange] = useState(18.4);
  const [live, setLive] = useState(false);
  const [stats, setStats] = useState<Stats>(FALLBACK_STATS);

  useEffect(() => {
    let alive = true;
    fetch(`${CHART_API}?pair=${WDAN_PAIR}&range=7d`)
      .then((r) => r.json())
      .then((j: { points?: ChartPoint[] }) => {
        if (!alive || !j.points || j.points.length < 2) return;
        const pts = j.points;
        setBars(toBars(pts));
        setPrice(pts[pts.length - 1].p);
        const first = pts[0].p;
        const last = pts[pts.length - 1].p;
        if (first > 0) setChange(((last - first) / first) * 100);
        setLive(true);
      })
      .catch(() => {});
    fetch(EXPLORER_API)
      .then((r) => r.json())
      .then((j: { stats?: Partial<Stats> }) => {
        if (!alive || !j.stats) return;
        setStats((s) => ({ ...s, ...j.stats }));
      })
      .catch(() => {});
    return () => { alive = false; };
  }, []);

  const up = change >= 0;

  // เส้นกราฟลากตามยอดแท่ง (combo bar + line) — พิกัดใน viewBox 100×100
  const n = bars.length;
  const pts = bars.map((h, i) => ({ x: ((i + 0.5) / n) * 100, y: 100 - h }));
  const linePath = pts.map((p, i) => `${i ? "L" : "M"} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`).join(" ");
  const areaPath = `${linePath} L ${pts[n - 1].x.toFixed(2)} 100 L ${pts[0].x.toFixed(2)} 100 Z`;

  return (
    <section id="analytics" className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-yellow" size="h-72 w-72" className="left-[-3rem] top-10 opacity-10" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Easy Analytics"
            title={
              <>
                A large ecosystem supported{" "}
                <span className="text-gradient">on Danny wallet.</span>
              </>
            }
            subtitle="Secure and user-friendly digital wallet designed to simplify the management of digital assets. It enables users to store, send, receive, and manage cryptocurrencies."
          />
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="flex items-center gap-1.5 text-sm text-muted">
                    {live && <span className="h-1.5 w-1.5 rounded-full bg-accent-green" />}
                    DAN · 7 days
                  </p>
                  <p className="mt-1 text-2xl font-bold">{price != null ? fmtPrice(price) : "—"}</p>
                </div>
                <span
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-semibold ${
                    up ? "bg-accent-green/15 text-accent-green" : "bg-accent-red/15 text-accent-red"
                  }`}
                >
                  {up ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {up ? "+" : ""}
                  {change.toFixed(1)}%
                </span>
              </div>
              <div className="relative mt-8 h-40">
                {/* แท่งราคา (bar) */}
                <div className="flex h-full items-end gap-2">
                  {bars.map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t bg-gradient-to-t from-brand/30 to-brand-2/80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                {/* เส้นกราฟ (line) ลากตามยอดแท่ง + area จางๆ */}
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="an-line-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#22d3ee" stopOpacity="0.3" />
                      <stop offset="1" stopColor="#22d3ee" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#an-line-fill)" />
                  <path
                    d={linePath}
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>
                {/* จุดบนเส้น (วาดแยกเพื่อให้กลม ไม่ถูกบีบจาก preserveAspectRatio) */}
                {pts.map((p, i) => (
                  <span
                    key={i}
                    className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-blue ring-2 ring-surface"
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* สถิติเครือข่ายจริงบน Danny Chain (สดจาก dannyscan) */}
          <div className="grid grid-cols-2 gap-4">
            {STAT_CARDS.map(({ key, label, icon: Icon, fmt }, i) => (
              <Reveal key={key} delay={i * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                  <p className="flex items-center gap-2 text-sm text-muted">
                    <Icon className="h-4 w-4 text-brand-2" /> {label}
                  </p>
                  <p className="mt-1 text-2xl font-extrabold text-gradient tabular-nums">{fmt(stats[key])}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
