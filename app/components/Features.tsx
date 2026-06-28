import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import { FEATURES } from "@/lib/content";

// ภาพประกอบ inline SVG ตามธีมแต่ละการ์ด (ไม่พึ่งไฟล์ภายนอก)
const ILLUSTRATIONS = [
  // Danny Chain Native — เครือข่าย + เหรียญ DAN
  <svg key="net" viewBox="0 0 240 110" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="ft-g1" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#7c5cff" />
        <stop offset="1" stopColor="#4f8cff" />
      </linearGradient>
    </defs>
    <g stroke="url(#ft-g1)" strokeWidth="2" opacity="0.55">
      <line x1="58" y1="55" x2="118" y2="32" />
      <line x1="58" y1="55" x2="118" y2="78" />
      <line x1="118" y1="32" x2="182" y2="55" />
      <line x1="118" y1="78" x2="182" y2="55" />
    </g>
    <circle cx="58" cy="55" r="9" fill="url(#ft-g1)" />
    <circle cx="118" cy="32" r="7" fill="#fff" opacity="0.85" />
    <circle cx="118" cy="78" r="7" fill="#fff" opacity="0.85" />
    <circle cx="182" cy="55" r="17" fill="url(#ft-g1)" />
    <text x="182" y="59" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">DAN</text>
  </svg>,
  // Self-Custody — โล่ + รูกุญแจ
  <svg key="shield" viewBox="0 0 240 110" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="ft-g2" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#7c5cff" />
        <stop offset="1" stopColor="#22c55e" />
      </linearGradient>
    </defs>
    <path d="M120 20 l30 11 v22 c0 22 -16 35 -30 41 c-14 -6 -30 -19 -30 -41 V31 z" fill="url(#ft-g2)" opacity="0.92" />
    <circle cx="120" cy="52" r="8" fill="#0b0b14" />
    <rect x="116.5" y="54" width="7" height="16" rx="3.5" fill="#0b0b14" />
  </svg>,
  // Built-in DeFi — สลับเหรียญ
  <svg key="swap" viewBox="0 0 240 110" fill="none" className="h-full w-full">
    <defs>
      <linearGradient id="ft-g3" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#7c5cff" />
        <stop offset="1" stopColor="#4f8cff" />
      </linearGradient>
    </defs>
    <circle cx="86" cy="55" r="21" fill="url(#ft-g3)" />
    <text x="86" y="60" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">DAN</text>
    <circle cx="154" cy="55" r="21" fill="#22c55e" />
    <text x="154" y="59" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">HMOOB</text>
    <g stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
      <path d="M111 47 h18 l-5 -5" />
      <path d="M129 63 h-18 l5 5" />
    </g>
  </svg>,
];

// ภาพ panel "My accounts" (ตามแอปจริง) — ใช้เป็น watermark จางๆ ในการ์ด Danny Chain Native
function AccountsWatermark() {
  return (
    <svg viewBox="0 0 230 150" fill="none" className="h-auto w-44">
      <defs>
        <linearGradient id="ft-av" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#e879f9" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="226" height="146" rx="16" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.18" />
      <text x="16" y="27" fontSize="13" fontWeight="700" fill="#fff">My accounts</text>
      <circle cx="212" cy="22" r="9" stroke="#fff" strokeOpacity="0.45" />
      <path d="M209 19 l6 6 M215 19 l-6 6" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.3" />
      {/* account row */}
      <rect x="14" y="40" width="202" height="40" rx="12" fill="#fff" fillOpacity="0.06" />
      <circle cx="34" cy="60" r="11" fill="url(#ft-av)" />
      <text x="34" y="64" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff">1</text>
      <text x="52" y="57" fontSize="9.5" fontWeight="600" fill="#fff">Account 1</text>
      <text x="92" y="57" fontSize="8" fontWeight="600" fill="#f59e0b">Imported</text>
      <text x="52" y="70" fontSize="8" fill="#fff" fillOpacity="0.55">0x717F…3459</text>
      <path d="M150 60 l3.5 3.5 6 -7" stroke="#22c55e" strokeWidth="1.6" fill="none" />
      <rect x="166" y="55" width="9" height="9" rx="2" stroke="#fff" strokeOpacity="0.45" />
      <text x="182" y="63" fontSize="8" fill="#fff" fillOpacity="0.55">Name</text>
      <text x="202" y="63" fontSize="8" fill="#fff" fillOpacity="0.55">Key</text>
      {/* import button */}
      <rect x="14" y="92" width="202" height="30" rx="12" fill="#fff" fillOpacity="0.06" stroke="#fff" strokeOpacity="0.12" />
      <text x="115" y="111" textAnchor="middle" fontSize="11" fontWeight="600" fill="#fff">Import Private Key</text>
      <text x="115" y="138" textAnchor="middle" fontSize="7.5" fill="#fff" fillOpacity="0.45">1/100 accounts · imported wallet (no seed)</text>
    </svg>
  );
}

// ภาพ "Import wallet" (recovery phrase) — watermark จางๆ ในการ์ด Self-Custody
function RecoveryWatermark() {
  const fields = Array.from({ length: 12 }, (_, i) => i + 1);
  return (
    <svg viewBox="0 0 220 330" fill="none" className="h-auto w-44">
      <defs>
        <linearGradient id="ft-rp" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      {/* header */}
      <circle cx="18" cy="16" r="11" fill="#fff" fillOpacity="0.05" stroke="#fff" strokeOpacity="0.18" />
      <path d="M20 12 l-4 4 l4 4" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.4" fill="none" />
      <text x="110" y="20" textAnchor="middle" fontSize="12" fontWeight="700" fill="#fff">Import wallet</text>
      {/* warning */}
      <rect x="10" y="32" width="200" height="34" rx="10" fill="#f59e0b" fillOpacity="0.08" stroke="#f59e0b" strokeOpacity="0.25" />
      <path d="M24 56 l6 -11 l6 11 z" stroke="#f59e0b" strokeOpacity="0.7" strokeWidth="1.2" fill="none" />
      <text x="42" y="48" fontSize="7.5" fill="#fff" fillOpacity="0.55">Only import in apps you trust —</text>
      <text x="42" y="59" fontSize="7.5" fill="#fff" fillOpacity="0.55">nothing leaves your device</text>
      {/* tab: recovery / key */}
      <rect x="10" y="78" width="200" height="30" rx="12" fill="#fff" fillOpacity="0.05" />
      <rect x="12" y="80" width="98" height="26" rx="10" fill="url(#ft-rp)" />
      <text x="61" y="97" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Recovery phrase</text>
      <text x="160" y="97" textAnchor="middle" fontSize="9" fill="#fff" fillOpacity="0.5">Private Key</text>
      {/* tab: 12 / 24 words */}
      <rect x="10" y="116" width="200" height="30" rx="12" fill="#fff" fillOpacity="0.05" />
      <rect x="12" y="118" width="98" height="26" rx="10" fill="url(#ft-rp)" />
      <text x="61" y="135" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">12 words</text>
      <text x="160" y="135" textAnchor="middle" fontSize="9" fill="#fff" fillOpacity="0.5">24 words</text>
      {/* word fields */}
      {fields.map((n, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const x = col === 0 ? 10 : 114;
        const y = 158 + row * 28;
        return (
          <g key={n}>
            <rect x={x} y={y} width="96" height="22" rx="9" fill="#fff" fillOpacity="0.04" stroke={n === 1 ? "#22d3ee" : "#fff"} strokeOpacity={n === 1 ? 0.6 : 0.1} />
            <text x={x + 9} y={y + 15} fontSize="8" fill="#fff" fillOpacity="0.5">{n}</text>
            <text x={x + 22} y={y + 15} fontSize="8" fill="#fff" fillOpacity="0.3">·····</text>
          </g>
        );
      })}
    </svg>
  );
}

// ภาพ "Connect dApp (WalletConnect)" — watermark จางๆ ในการ์ด Built-in DeFi
function ConnectWatermark() {
  const dapps = [
    { tag: "SC", name: "Dannyscan", desc: "Block explorer", color: "#6366f1" },
    { tag: "CH", name: "Dancharts", desc: "Charts / analytics", color: "#f59e0b" },
    { tag: "DX", name: "dandex", desc: "Token swaps (DEX)", color: "#7c3aed" },
  ];
  return (
    <svg viewBox="0 0 220 270" fill="none" className="h-auto w-44">
      <defs>
        <linearGradient id="ft-wc" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#7c5cff" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <text x="110" y="18" textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">Connect dApp · WalletConnect</text>
      {/* URI card */}
      <rect x="10" y="30" width="200" height="92" rx="14" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.1" />
      <text x="22" y="48" fontSize="7.5" fill="#fff" fillOpacity="0.5">Paste the link from a dApp (WalletConnect URI)</text>
      <rect x="22" y="54" width="176" height="22" rx="10" fill="#fff" fillOpacity="0.04" />
      <text x="30" y="69" fontSize="8" fill="#fff" fillOpacity="0.35">wc:...</text>
      <rect x="22" y="82" width="176" height="22" rx="10" fill="url(#ft-wc)" />
      <text x="110" y="97" textAnchor="middle" fontSize="9" fontWeight="600" fill="#fff">Connect</text>
      <text x="22" y="116" fontSize="6.5" fill="#fff" fillOpacity="0.45">Connect as 0x717F…3459 · Danny Chain (5069)</text>
      {/* suggested dApps */}
      <rect x="10" y="130" width="200" height="130" rx="14" fill="#fff" fillOpacity="0.04" stroke="#fff" strokeOpacity="0.1" />
      <text x="22" y="148" fontSize="9" fontWeight="600" fill="#fff">Suggested dApps</text>
      {dapps.map((d, i) => {
        const y = 156 + i * 32;
        return (
          <g key={d.tag}>
            <rect x="18" y={y} width="184" height="26" rx="10" fill="#fff" fillOpacity="0.03" />
            <rect x="24" y={y + 4} width="18" height="18" rx="5" fill={d.color} />
            <text x="33" y={y + 16} textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff">{d.tag}</text>
            <text x="50" y={y + 12} fontSize="8" fontWeight="600" fill="#fff">{d.name}</text>
            <text x="50" y={y + 21} fontSize="6.5" fill="#fff" fillOpacity="0.45">{d.desc}</text>
          </g>
        );
      })}
    </svg>
  );
}

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
              <div className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
                {/* ภาพประกอบ */}
                <div className="flex h-32 items-center justify-center border-b border-white/5 bg-gradient-to-br from-brand/15 to-brand-2/10 transition-transform duration-300 group-hover:scale-[1.03]">
                  <div className="h-24 w-44">{ILLUSTRATIONS[i % ILLUSTRATIONS.length]}</div>
                </div>

                <div className="relative p-8">
                  {/* ภาพประกอบจางๆ (watermark) มุมขวาบน — การ์ดแรกใช้ภาพ My accounts, ที่เหลือใช้โลโก้ */}
                  {i === 0 ? (
                    <div aria-hidden className="pointer-events-none absolute right-3 top-1 select-none opacity-[0.2]">
                      <AccountsWatermark />
                    </div>
                  ) : i === 1 ? (
                    <div aria-hidden className="pointer-events-none absolute right-3 top-1 select-none opacity-[0.2]">
                      <RecoveryWatermark />
                    </div>
                  ) : (
                    <div aria-hidden className="pointer-events-none absolute right-3 top-1 select-none opacity-[0.2]">
                      <ConnectWatermark />
                    </div>
                  )}
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/20 to-brand-2/20 ring-1 ring-white/10">
                      <f.icon className="h-5 w-5 text-brand-2" />
                    </div>
                    <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted">{f.body}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
