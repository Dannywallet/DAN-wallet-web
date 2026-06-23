import { TrendingUp } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import GradientBlob from "./ui/GradientBlob";
import { ANALYTICS_STATS } from "@/lib/content";

const bars = [38, 52, 44, 66, 58, 78, 70, 92, 84, 100];

export default function Analytics() {
  return (
    <section id="analytics" className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-yellow" size="h-72 w-72" className="left-[-3rem] top-10 opacity-10" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Easy Analytics"
            title="Know the market before you move"
            subtitle="Explore trends, sector insights, and live market data for over 5,000 assets — all built right into your wallet."
          />
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">Portfolio · 30 days</p>
                  <p className="mt-1 text-2xl font-bold">$107,500</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-accent-green/15 px-3 py-1 text-sm font-semibold text-accent-green">
                  <TrendingUp className="h-4 w-4" />
                  +18.4%
                </span>
              </div>
              <div className="mt-8 flex h-40 items-end gap-2">
                {bars.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t bg-gradient-to-t from-brand/40 to-brand-2"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {ANALYTICS_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
                  <p className="text-3xl font-extrabold text-gradient">
                    {s.value}
                  </p>
                  <p className="mt-1 text-sm text-muted">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
