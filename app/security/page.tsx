import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, CheckCircle2, AlertTriangle, FileDown } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Security Audit — Danny Wallet",
  description:
    "Internal security audit of Danny Wallet — cryptography, key management, signing, and dApp safety.",
};

const META: [string, string][] = [
  ["Scope", "Browser wallet · Desktop"],
  ["Network", "Danny Chain (EVM 5069)"],
  ["Audit type", "Internal source review"],
  ["Date", "June 25, 2026 (rev. 1.1)"],
  ["Version", "1.1"],
];

const SEVERITY = [
  { label: "Critical", found: 0, color: "text-accent-red" },
  { label: "High", found: 1, color: "text-accent-yellow" },
  { label: "Medium", found: 1, color: "text-accent-yellow" },
  { label: "Low / Info", found: 2, color: "text-accent-blue" },
];

const CATEGORIES: { title: string; note: string; ok: boolean }[] = [
  { title: "Cryptography & key management", note: "PBKDF2-SHA256 (210k iters) + AES-256-GCM, random salt/IV per blob, GCM-tag PIN check", ok: true },
  { title: "PIN brute-force protection", note: "Exponential cooldown after 5 fails, wallet wipe after 10", ok: true },
  { title: "Transaction & message signing", note: "PIN required every time, no auto-sign; calldata decoded & warned", ok: true },
  { title: "dApp browser (iframe)", note: "Cross-origin + no provider injection → dApp can't reach keys", ok: true },
  { title: "Data storage & privacy", note: "Only encrypted blobs stored; no plaintext key/seed; no tracking", ok: true },
  { title: "Network & headers", note: "HTTPS, CSP frame-ancestors, nosniff, referrer-policy", ok: true },
];

const FINDINGS: { id: string; sev: string; title: string; status: string }[] = [
  { id: "HIGH-01", sev: "High", title: "Permit / typed-data blind signing — content not shown; risk of being tricked into signing a Permit (gasless approve) to drain tokens", status: "Fixed" },
  { id: "MED-01", sev: "Medium", title: "Wallet wipe after 10 wrong PINs — seedless imported accounts without a key backup risk permanent loss", status: "Risk accepted" },
  { id: "LOW-01", sev: "Low", title: "Dependency hardening — removed @stablelib/ed25519 and patched elliptic via package overrides (npm prod criticals now 0)", status: "Fixed" },
  { id: "LOW-02", sev: "Low", title: "DappBrowser broad sandbox — mitigated by cross-origin", status: "Acknowledged" },
];

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-white/10 bg-white/[0.03] p-6 ${className}`}>{children}</div>;
}

export default function SecurityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-accent-green/15 text-accent-green">
            <ShieldCheck className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Security Audit</h1>
            <p className="text-sm text-muted">Internal source-code review of Danny Wallet</p>
          </div>
        </div>

        <a
          href="/Danny-Wallet-Security-Audit.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-semibold backdrop-blur transition-all hover:bg-white/10"
        >
          <FileDown className="h-4 w-4" /> Download full report (PDF)
        </a>

        {/* Overview */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Card className="sm:col-span-2">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
              {META.map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-white/5 py-1.5 last:border-0">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-right font-medium">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
          <Card className="flex flex-col items-center justify-center text-center">
            <p className="text-xs uppercase tracking-wide text-muted">Overall rating</p>
            <p className="mt-2 text-2xl font-bold text-accent-green">🟢 Good</p>
            <p className="mt-1 text-xs text-muted">No critical, fund-loss vulnerabilities</p>
          </Card>
        </div>

        {/* Severity counts */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {SEVERITY.map((s) => (
            <Card key={s.label} className="text-center">
              <p className={`text-3xl font-extrabold tabular-nums ${s.color}`}>{s.found}</p>
              <p className="mt-1 text-xs text-muted">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="mt-3 leading-relaxed text-muted">
            Danny Wallet is non-custodial — private keys and recovery phrases are generated and stored only on the
            user&apos;s device, encrypted with a PIN. The core architecture follows good practice: WebCrypto
            (PBKDF2-SHA256 with 210,000 iterations + AES-256-GCM), PIN brute-force protection, no secret logging, and a
            PIN is required for every signing action. One high-severity issue (Permit phishing via typed-data signing)
            was found and has been fixed and deployed.
          </p>
        </section>

        {/* Category results */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Reviewed areas</h2>
          <div className="mt-4 space-y-2.5">
            {CATEGORIES.map((c) => (
              <div key={c.title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                <div>
                  <p className="text-sm font-semibold">{c.title}</p>
                  <p className="mt-0.5 text-xs leading-relaxed text-muted">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Findings */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Findings</h2>
          <div className="mt-4 space-y-2.5">
            {FINDINGS.map((f) => (
              <div key={f.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] font-semibold">{f.id}</span>
                  <span className="rounded-md bg-accent-yellow/15 px-2 py-0.5 text-[11px] font-semibold text-accent-yellow">{f.sev}</span>
                  <span className={`ml-auto rounded-md px-2 py-0.5 text-[11px] font-semibold ${f.status === "Fixed" ? "bg-accent-green/15 text-accent-green" : "bg-white/10 text-muted"}`}>
                    {f.status === "Fixed" ? "✓ " : ""}{f.status}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Remediation highlight */}
        <section className="mt-10">
          <Card className="border-accent-green/20 bg-accent-green/[0.04]">
            <h3 className="flex items-center gap-2 text-base font-semibold">
              <CheckCircle2 className="h-5 w-5 text-accent-green" /> HIGH-01 — Fixed
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              The WalletConnect confirmation screen now decodes typed-data requests and shows what is being signed. When
              a request is an EIP-2612 <strong className="text-foreground">Permit</strong> (a gasless, signature-based
              token approval), it displays a strong warning including the spender and amount — preventing blind-signed
              approvals that could drain tokens.
            </p>
          </Card>
        </section>

        {/* rev 1.1 remediations */}
        <section className="mt-10">
          <h2 className="text-xl font-semibold">Remediations (rev. 1.1)</h2>
          <div className="mt-4 space-y-2.5">
            {[
              "Dependency overrides removed @stablelib/ed25519 and patched elliptic — npm production criticals reduced to 0.",
              "Unlimited token approvals (approve max / Permit) now require an explicit acknowledgement checkbox before signing.",
              "Import / create flows now warn that seedless accounts are not in the recovery phrase and must be backed up.",
            ].map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent-green" />
                <p className="text-sm leading-relaxed text-muted">{r}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="mt-10 rounded-2xl border border-accent-yellow/20 bg-accent-yellow/[0.04] p-5">
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-accent-yellow" />
            This is an internal source-code review, not an audit by an independent third-party firm. It covers the wallet
            client only — not DEX/bridge smart contracts or network infrastructure. The report reflects the state at the
            audit date; re-audit when significant crypto, signing, or dependency changes are made.
          </p>
        </section>

        <p className="mt-8 text-center text-sm text-muted">
          Found a vulnerability? See our{" "}
          <Link href="/bug-bounty/" className="text-gradient font-semibold">Bug Bounty</Link> program.
        </p>
      </main>
      <Footer />
    </>
  );
}
