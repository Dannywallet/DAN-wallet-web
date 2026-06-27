import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export type LegalSection = { heading: string; body: string[] };

export default function LegalPage({
  title,
  updated,
  intro,
  sections,
}: {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
        <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated: {updated}</p>
        <p className="mt-6 leading-relaxed text-muted">{intro}</p>

        <div className="mt-10 space-y-10">
          {sections.map((s, i) => (
            <section key={s.heading}>
              <h2 className="text-xl font-semibold text-foreground">
                {i + 1}. {s.heading}
              </h2>
              {s.body.map((p, j) => (
                <p key={j} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-white/10 pt-8 text-sm text-muted">
          Questions? Reach us via the channels in the footer below.
        </p>
      </main>

      <Footer />
    </>
  );
}
