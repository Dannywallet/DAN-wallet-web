import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Danny Wallet",
  description: "How Danny Wallet handles your data — privacy first, by design.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 23, 2026"
      intro="Danny Wallet is built privacy-first. We do not require accounts, emails, or personal information to use the wallet. This policy explains the limited data involved when you use the Service."
      sections={[
        {
          heading: "No Accounts, No Personal Data",
          body: [
            "You do not need to create an account, provide an email, or submit any personal identification to use Danny Wallet. We do not collect names, addresses, phone numbers, or government IDs.",
          ],
        },
        {
          heading: "Your Keys Stay on Your Device",
          body: [
            "Your recovery phrase, private keys, and PIN are generated and stored locally on your device, encrypted. They never leave your device and are never transmitted to us. We cannot see or recover them.",
          ],
        },
        {
          heading: "On-Chain Data",
          body: [
            "Blockchain transactions are public by nature. Addresses, balances, and transactions you broadcast are recorded on the relevant blockchain and are visible to anyone. This is inherent to public blockchains and is not controlled by Danny Wallet.",
          ],
        },
        {
          heading: "Network Requests",
          body: [
            "To show balances, prices, and charts, the wallet may query public blockchain nodes and data providers. These requests may expose your IP address and the addresses you query to those providers. You can route your connection through TOR to reduce this exposure.",
          ],
        },
        {
          heading: "No Tracking or Selling of Data",
          body: [
            "We do not sell your data, run advertising trackers, or build profiles about you. We have no interest in surveilling your financial life — and by design, we cannot.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "When you connect to dApps, exchanges, or bridges, those third parties have their own privacy practices that we do not control. Review their policies before using them.",
          ],
        },
        {
          heading: "Changes to This Policy",
          body: [
            "We may update this Privacy Policy as the Service evolves. Material changes will be reflected by the “Last updated” date above.",
          ],
        },
      ]}
    />
  );
}
