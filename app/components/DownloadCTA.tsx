import { Apple, Play, Monitor, AppWindow } from "lucide-react";
import Link from "next/link";
import Reveal from "./ui/Reveal";
import GradientBlob from "./ui/GradientBlob";

function StoreButton({
  icon: Icon,
  top,
  bottom,
  href,
}: {
  icon: typeof Apple;
  top: string;
  bottom: string;
  href: string;
}) {
  const external = href !== "#";
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex w-full items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 backdrop-blur transition-all hover:bg-white/10 active:scale-[0.98]"
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

            <h2 className="mx-auto text-2xl font-bold tracking-tight sm:whitespace-nowrap sm:text-3xl md:text-4xl">
              Take control of your crypto today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted">
              Download Danny Wallet for free. No account, no email, no
              compromises — just your keys and your coins.
            </p>

            <div className="mx-auto mt-10 grid max-w-md grid-cols-1 gap-4 sm:grid-cols-2">
              <StoreButton icon={Apple} top="Download on the" bottom="App Store" href="#" />
              <StoreButton icon={Play} top="Get it on" bottom="Google Play" href="#" />
              <StoreButton
                icon={Monitor}
                top="Download on the"
                bottom="Desktop wallet"
                href="https://dannywallet.com/webwallet/"
              />
              <StoreButton
                icon={AppWindow}
                top="Get it on"
                bottom="Browser Wallet"
                href="https://app.dannywallet.com/wallet/"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
