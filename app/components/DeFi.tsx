import { Repeat, Link2, Globe, Zap } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import GradientBlob from "./ui/GradientBlob";

const points = [
  { icon: Repeat, text: "Swap across chains with built-in decentralized exchanges" },
  { icon: Link2, text: "Connect to any dApp securely with WalletConnect" },
  { icon: Globe, text: "Access thousands of DeFi protocols straight from your wallet" },
  { icon: Zap, text: "Sign transactions you can actually read and understand" },
];

export default function DeFi() {
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
                <span className="text-sm text-muted">Balance 0.84 BTC</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-bold">0.5 BTC</span>
                <span className="rounded-full bg-[#f7931a] px-3 py-1 text-xs font-bold text-white">
                  BTC
                </span>
              </div>
            </div>

            <div className="my-3 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-surface">
                <Repeat className="h-4 w-4 text-brand-2" />
              </div>
            </div>

            <div className="rounded-2xl bg-gradient-to-br from-accent-blue/15 to-accent-green/10 p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">You receive</span>
                <span className="text-sm text-accent-green">Best rate</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-2xl font-bold">8.12 ETH</span>
                <span className="rounded-full bg-[#627eea] px-3 py-1 text-xs font-bold text-white">
                  ETH
                </span>
              </div>
            </div>

            <Button href="#download" className="mt-6 w-full" size="lg">
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
