import type { Metadata } from "next";
import LegalPage from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service — Danny Wallet",
  description: "The terms that govern your use of Danny Wallet.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 23, 2026"
      intro="These Terms of Service (“Terms”) govern your access to and use of the Danny Wallet applications, websites, and related services (the “Service”). By downloading, installing, or using Danny Wallet, you agree to these Terms."
      sections={[
        {
          heading: "Self-Custody and Your Keys",
          body: [
            "Danny Wallet is a non-custodial wallet. Your recovery phrase and private keys are generated and stored only on your device. We never receive, hold, or have access to your keys, funds, or recovery phrase.",
            "You are solely responsible for safeguarding your recovery phrase and PIN. If you lose them, we cannot recover them or restore access to your assets. Anyone with your recovery phrase can control your funds.",
          ],
        },
        {
          heading: "Acceptable Use",
          body: [
            "You agree to use the Service only for lawful purposes and in compliance with all applicable laws and regulations in your jurisdiction. You are responsible for determining whether your use of the Service is legal where you live.",
            "You may not use the Service to facilitate illegal activity, infringe the rights of others, or attempt to disrupt or compromise the security of the Service.",
          ],
        },
        {
          heading: "No Financial Advice",
          body: [
            "Danny Wallet is a software tool. Nothing in the Service constitutes financial, investment, legal, or tax advice. Digital assets are volatile and you may lose some or all of their value. You are responsible for your own decisions.",
          ],
        },
        {
          heading: "Third-Party Services",
          body: [
            "The Service may let you connect to third-party dApps, decentralized exchanges, bridges, and networks. These are operated by independent parties and are not controlled by us. We are not responsible for their content, security, or conduct, and your use of them is at your own risk.",
          ],
        },
        {
          heading: "No Warranty",
          body: [
            "The Service is provided “as is” and “as available” without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or secure.",
          ],
        },
        {
          heading: "Limitation of Liability",
          body: [
            "To the maximum extent permitted by law, Danny Wallet and its contributors shall not be liable for any loss of funds, data, profits, or any indirect, incidental, or consequential damages arising from your use of the Service.",
          ],
        },
        {
          heading: "Changes to These Terms",
          body: [
            "We may update these Terms from time to time. Continued use of the Service after changes take effect constitutes acceptance of the revised Terms.",
          ],
        },
      ]}
    />
  );
}
