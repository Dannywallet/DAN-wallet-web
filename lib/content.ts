import {
  Repeat,
  ShieldAlert,
  EyeOff,
  Network,
  KeyRound,
  Code2,
  BadgeCheck,
  type LucideIcon,
} from "lucide-react";

export const NAV_LINKS = [
  { label: "Features", href: "/#features" },
  { label: "Security", href: "/#security" },
  { label: "DeFi", href: "/#defi" },
  { label: "Analytics", href: "/#analytics" },
  { label: "FAQ", href: "/#faq" },
] as const;

export const TRUST_BADGES = [
  "Open source on GitHub",
  "Non-custodial self-custody",
  "AES-256-GCM encryption",
  "Built on Danny Chain",
] as const;

export type Feature = {
  icon: LucideIcon;
  title: string;
  body: string;
};

export const FEATURES: Feature[] = [
  {
    icon: Network,
    title: "Danny Chain Native",
    body: "Manage DAN and every token on Danny Chain with live on-chain prices, charts, and balances from dannyscan and dancharts — all in one clean interface.",
  },
  {
    icon: KeyRound,
    title: "Self-Custody",
    body: "Standard BIP39 recovery phrases keep your keys on your device, encrypted with a PIN. Move in and out of Danny Wallet freely — never locked to us.",
  },
  {
    icon: Repeat,
    title: "Built-in DeFi",
    body: "Swap tokens instantly on the dandex DEX and connect to dApps via WalletConnect — sign transactions you can actually read, right inside your wallet.",
  },
];

export const SECURITY: Feature[] = [
  {
    icon: ShieldAlert,
    title: "Phishing Protection",
    body: "Built-in checks warn you about malicious addresses and scam contracts before you sign.",
  },
  {
    icon: KeyRound,
    title: "Duress Mode",
    body: "A secondary PIN opens a decoy wallet — protection for the threats that exist in the real world.",
  },
  {
    icon: EyeOff,
    title: "Privacy First",
    body: "No accounts, no emails, no tracking. Your financial life stays entirely yours.",
  },
  {
    icon: Network,
    title: "TOR Support",
    body: "Route your connection through TOR to keep your activity and IP address private.",
  },
];

export const RELIABLE: Feature[] = [
  {
    icon: Code2,
    title: "Open Source",
    body: "Every line of code is public. Don't trust — verify.",
  },
  {
    icon: KeyRound,
    title: "Non-Custodial",
    body: "Keys are generated and stored only on your device. We never touch your funds.",
  },
  {
    icon: BadgeCheck,
    title: "Third-Party Audited",
    body: "Reviewed by independent security firms and protected by a public bug bounty.",
  },
];

export const ANALYTICS_STATS = [
  { value: "5000+", label: "Assets tracked" },
  { value: "40+", label: "Blockchains" },
  { value: "100%", label: "Self-custodial" },
  { value: "0", label: "Accounts required" },
];

export const FAQ = [
  {
    q: "Is Danny Wallet really non-custodial?",
    a: "Yes. Your recovery phrase and private keys are generated and stored on your device only. Danny Wallet has no servers holding your funds and cannot freeze, move, or access them.",
  },
  {
    q: "Which coins and chains are supported?",
    a: "Bitcoin, Ethereum, and 40+ blockchains including major EVM networks, plus thousands of tokens. New chains are added regularly.",
  },
  {
    q: "What happens if I lose my phone?",
    a: "Restore your entire wallet on a new device using your standard recovery phrase. Because the phrase is portable, you can also restore it in any compatible wallet.",
  },
  {
    q: "How much does it cost?",
    a: "Danny Wallet is free to download and use. You only ever pay standard network fees, which go to the blockchain — never to us.",
  },
] as const;

export const WALLET_TOKENS = [
  { symbol: "BTC", name: "Bitcoin", amount: "0.842", value: "$54,210", change: "+2.4%", up: true, color: "#f7931a" },
  { symbol: "ETH", name: "Ethereum", amount: "12.40", value: "$38,920", change: "+1.1%", up: true, color: "#627eea" },
  { symbol: "SOL", name: "Solana", amount: "210.0", value: "$9,870", change: "-0.6%", up: false, color: "#14f195" },
  { symbol: "USDC", name: "USD Coin", amount: "4,500", value: "$4,500", change: "+0.0%", up: true, color: "#2775ca" },
] as const;

export const WALLET_ACTIVITY = [
  { type: "Received", asset: "BTC", amount: "+0.120 BTC", value: "+$7,730", time: "2h ago", incoming: true },
  { type: "Swapped", asset: "ETH → USDC", amount: "2.0 ETH", value: "$6,280", time: "Yesterday", incoming: false },
  { type: "Sent", asset: "SOL", amount: "-45 SOL", value: "-$2,115", time: "2 days ago", incoming: false },
  { type: "Received", asset: "USDC", amount: "+1,500 USDC", value: "+$1,500", time: "4 days ago", incoming: true },
] as const;
