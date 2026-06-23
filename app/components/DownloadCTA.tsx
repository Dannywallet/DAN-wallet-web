import { Apple, Play, Rocket } from "lucide-react";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import GradientBlob from "./ui/GradientBlob";
import Button from "./ui/Button";

function StoreButton({
  icon: Icon,
  top,
  bottom,
}: {
  icon: typeof Apple;
  top: string;
  bottom: string;
}) {
  return (
    <Link
      href="#"
      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98]"
    >
      <Icon className="h-7 w-7" />
      <span className="text-left leading-tight">
        <span className="block text-[11px] text-muted">{top}</span>
        <span className="block text-base font-semibold">{bottom}</span>
      </span>
    </Link>
  );
}

export default function DownloadCTA() {
  return (
    <section id="download" className="relative overflow-hidden py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-brand/20 via-surface to-brand-2/10 px-6 py-16 text-center sm:px-12">
            <GradientBlob color="bg-accent-purple" size="h-72 w-72" className="left-1/4 top-[-4rem] opacity-30" />
            <GradientBlob color="bg-accent-blue" size="h-64 w-64" className="right-1/4 bottom-[-4rem] opacity-25" />

            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Take control of your crypto today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Download Danny Wallet for free. No account, no email, no
              compromises — just your keys and your coins.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <StoreButton icon={Apple} top="Download on the" bottom="App Store" />
              <StoreButton icon={Play} top="Get it on" bottom="Google Play" />
            </div>

            <div className="mt-8 flex flex-col items-center gap-2">
              <span className="text-sm text-muted">
                No download? Use it right in your browser.
              </span>
              <Button href="https://app.dannywallet.com/desktop" size="lg">
                <Rocket className="h-5 w-5" />
                Launch Web App
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
