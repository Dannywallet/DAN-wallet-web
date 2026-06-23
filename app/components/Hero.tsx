import { Download, ArrowRightLeft, ShieldCheck } from "lucide-react";
import Button from "./ui/Button";
import GradientBlob from "./ui/GradientBlob";
import PhoneMockup from "./PhoneMockup";
import WalletScreen from "./WalletScreen";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40">
      {/* background blobs */}
      <GradientBlob color="bg-accent-purple" size="h-96 w-96" className="left-[-6rem] top-10" />
      <GradientBlob color="bg-accent-blue" size="h-80 w-80" className="right-[-4rem] top-24 opacity-25" />
      <GradientBlob color="bg-accent-green" size="h-72 w-72" className="bottom-[-6rem] left-1/3 opacity-15" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-brand-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            Non-custodial · Open source · Audited
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
            Danny Wallet
            <br />
            <span className="text-gradient">Crypto wallet with high security</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted lg:mx-0">
            Danny Wallet puts you in full control of your crypto. Hold thousands of
            assets across every major chain, swap in seconds, and stay private —
            with security built for real-world threats.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start sm:justify-center">
            <Button href="#download" size="lg">
              <Download className="h-5 w-5" />
              Download Wallet
            </Button>
            <Button href="#defi" size="lg" variant="secondary">
              <ArrowRightLeft className="h-5 w-5" />
              Launch Swap
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted">
            Free forever · No account · No tracking
          </p>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          <div className="animate-float">
            <PhoneMockup>
              <WalletScreen />
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
