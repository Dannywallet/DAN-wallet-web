import { BadgeCheck } from "lucide-react";
import { TRUST_BADGES } from "@/lib/content";

export default function TrustBadges() {
  return (
    <section className="border-y border-white/5 bg-surface/40 py-8">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-muted">
          Secure &amp; transparent by design
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {TRUST_BADGES.map((b) => (
            <div
              key={b}
              className="flex items-center gap-2 text-sm font-medium text-foreground/70"
            >
              <BadgeCheck className="h-4 w-4 text-accent-green" />
              {b}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
