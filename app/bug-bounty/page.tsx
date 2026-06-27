import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Bug Bounty — Danny Wallet",
  description:
    "Report security vulnerabilities in Danny Wallet and get rewarded. Help us keep self-custody safe.",
};

export default function BugBountyPage() {
  return (
    <LegalPage
      title="Bug Bounty Program"
      updated="June 23, 2026"
      intro="Security is the foundation of self-custody. If you discover a vulnerability in Danny Wallet, we want to hear about it. This program rewards researchers who responsibly disclose issues that help us protect our users’ funds and data."
      sections={[
        {
          heading: "Scope",
          body: [
            "In scope: the Danny Wallet mobile and desktop/web wallet apps, the wallet web app at app.dannywallet.com, this website, and the open-source code at github.com/Dannywallet/danny-wallet.",
            "Out of scope: third-party dApps, exchanges, and bridges; the underlying blockchains; social engineering and physical attacks; spam, automated scanner output without a working proof of concept, and issues that require a rooted/jailbroken or already-compromised device.",
          ],
        },
        {
          heading: "What We're Looking For",
          body: [
            "High-impact issues such as: theft or unauthorized movement of funds, recovery-phrase or private-key exposure, PIN/encryption bypass, transaction tampering, remote code execution, and authentication or signing flaws.",
            "Also welcome: phishing-protection bypasses, address-spoofing, and serious data-leak or privacy issues.",
          ],
        },
        {
          heading: "Reward Tiers",
          body: [
            "Critical (key/fund compromise, RCE): up to $10,000.",
            "High (signing bypass, serious data exposure): $1,000–$5,000.",
            "Medium (meaningful security weakness): $250–$1,000.",
            "Low / informational: swag and public acknowledgment.",
            "Rewards are at our discretion and depend on severity, impact, and report quality.",
          ],
        },
        {
          heading: "Rules of Engagement",
          body: [
            "Only test against your own accounts and devices. Never access, modify, or exfiltrate other users’ data or funds.",
            "Give us a reasonable time to fix an issue before any public disclosure. Do not exploit a vulnerability beyond what is needed to demonstrate it.",
            "Do not run denial-of-service attacks, spam, or automated testing that degrades the Service for others.",
          ],
        },
        {
          heading: "How to Report",
          body: [
            "Email a detailed report to security@dannywallet.com, or open a private security advisory on our GitHub repository at github.com/Dannywallet/danny-wallet.",
            "Include clear steps to reproduce, the impact, affected versions/components, and a proof of concept. The more reproducible your report, the faster we can validate and reward it.",
          ],
        },
        {
          heading: "Safe Harbor",
          body: [
            "We will not pursue legal action against researchers who act in good faith, follow these rules, and disclose responsibly. If in doubt about whether an action is allowed, ask us first.",
          ],
        },
      ]}
    />
  );
}
