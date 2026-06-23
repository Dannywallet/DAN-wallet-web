import { Code2, ShieldCheck } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";
import GradientBlob from "./ui/GradientBlob";
import { RELIABLE } from "@/lib/content";

export default function Reliable() {
  return (
    <section className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-blue" size="h-80 w-80" className="left-[-4rem] top-10 opacity-20" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <SectionHeading
            center={false}
            eyebrow="Reliable & Transparent"
            title={
              <>
                Don&apos;t trust.
                <br />
                <span className="text-gradient">Verify.</span>
              </>
            }
            subtitle="Danny Wallet is fully open source and non-custodial. Anyone can inspect the code, and independent firms audit it regularly. Your keys never leave your device — and we couldn't access your funds even if we wanted to."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#" variant="secondary">
              <Code2 className="h-4 w-4" />
              View Source
            </Button>
            <Button href="#" variant="ghost">
              <ShieldCheck className="h-4 w-4" />
              Read the audits
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {RELIABLE.map((r, i) => (
            <Reveal key={r.title} delay={i * 120}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {r.title}
                </h3>
                <p className="mt-2 text-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
