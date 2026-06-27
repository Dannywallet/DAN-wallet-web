import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Disclosures — Danny Wallet",
  description: "Important risk disclosures for using Danny Wallet.",
};

export default function DisclosuresPage() {
  return (
    <LegalPage
      title="Disclosures"
      updated="June 23, 2026"
      intro="Please read these disclosures carefully. They describe important risks of using a self-custody wallet and interacting with digital assets and decentralized protocols."
      sections={[
        {
          heading: "You Are Your Own Bank",
          body: [
            "Danny Wallet is non-custodial. You alone control your keys and funds. There is no company, support line, or “forgot password” that can recover your assets if you lose your recovery phrase. Back it up securely and offline.",
          ],
        },
        {
          heading: "Market and Volatility Risk",
          body: [
            "Digital assets are highly volatile and can lose value rapidly. Prices, charts, and rates shown in the app are for information only and may be delayed or inaccurate. Never rely on them as the sole basis for a decision.",
          ],
        },
        {
          heading: "Smart Contract and DeFi Risk",
          body: [
            "Swapping tokens, bridging assets, and connecting to dApps involves smart contracts that may contain bugs, exploits, or malicious code. Transactions on the blockchain are irreversible. Only interact with protocols you trust and understand.",
          ],
        },
        {
          heading: "Phishing and Scam Risk",
          body: [
            "Be alert to fake apps, phishing sites, and impostors asking for your recovery phrase. Danny Wallet will never ask for your recovery phrase. Anyone who does is trying to steal your funds.",
          ],
        },
        {
          heading: "No Insurance or Guarantee",
          body: [
            "Assets held in a self-custody wallet are not insured by any government or private deposit insurance. There is no guarantee against loss, theft, or technical failure.",
          ],
        },
        {
          heading: "Regulatory and Tax Responsibility",
          body: [
            "You are responsible for complying with the laws, regulations, and tax obligations that apply to you. Digital asset regulations vary by jurisdiction and may change.",
          ],
        },
        {
          heading: "Not Financial Advice",
          body: [
            "Nothing provided through Danny Wallet constitutes financial, investment, legal, or tax advice. Consult a qualified professional before making decisions involving digital assets.",
          ],
        },
      ]}
    />
  );
}
