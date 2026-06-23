import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { FEATURES } from "@/lib/content";

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading
            eyebrow="Intuitive & Extensive"
            title="Everything you need"
            subtitle="A wallet that's powerful enough for professionals and simple enough for safe, high-speed transactions on Danny Chain."
          />
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 120}>
              <div className="group h-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand-2/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                  <f.icon className="h-6 w-6 text-brand-2" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
