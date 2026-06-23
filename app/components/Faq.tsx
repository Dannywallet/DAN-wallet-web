import { Plus } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { FAQ } from "@/lib/content";

export default function Faq() {
  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="FAQ" title="Questions, answered" />
        </Reveal>

        <div className="mt-12 space-y-3">
          {FAQ.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left font-semibold">
                  {item.q}
                  <Plus className="h-5 w-5 shrink-0 text-brand-2 transition-transform duration-300 group-open:rotate-45" />
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
