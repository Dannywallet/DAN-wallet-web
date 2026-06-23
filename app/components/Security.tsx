import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import GradientBlob from "./ui/GradientBlob";
import { SECURITY } from "@/lib/content";

export default function Security() {
  return (
    <section id="security" className="relative overflow-hidden py-24">
      <GradientBlob color="bg-accent-red" size="h-72 w-72" className="right-[-3rem] bottom-10 opacity-15" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Secure & Private"
            title="Security for real-world threats"
            subtitle="Most wallets only defend against the digital. Danny Wallet protects you against coercion, surveillance, and phishing too."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SECURITY.map((s, i) => (
            <Reveal key={s.title} delay={i * 100}>
              <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.05] to-transparent p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                  <s.icon className="h-5 w-5 text-brand-2" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
