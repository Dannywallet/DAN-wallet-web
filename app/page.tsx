import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TrustBadges from "./components/TrustBadges";
import SelfCustody from "./components/SelfCustody";
import Features from "./components/Features";
import Reliable from "./components/Reliable";
import Security from "./components/Security";
import DeFi from "./components/DeFi";
import Analytics from "./components/Analytics";
import Faq from "./components/Faq";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustBadges />
        <SelfCustody />
        <Features />
        <Reliable />
        <Security />
        <DeFi />
        <Analytics />
        <Faq />
        <DownloadCTA />
      </main>
      <Footer />
    </>
  );
}
