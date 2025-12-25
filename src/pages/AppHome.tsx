import { ButterflyBackground } from "../components/ui";

// Import modular home sections
import {
  HeroSection,
  ExploreSection,
  NewsSection,
  FieldsSection,
  StatsSection,
  TeamSection,
  MarriageSection,
  FAQSection,
  CTABanner,
} from "../components/features/home";
import Footer from "../components/layout/Footer";

// ============= Main AppHome Component =============
const AppHome = () => {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Butterflies - appears everywhere */}
      <ButterflyBackground />

      {/* Hero Section - with white overlay to hide butterflies */}
      <div className="relative z-10">
        <HeroSection />
      </div>

      {/* Content - butterflies visible here */}
      <ExploreSection />
      <NewsSection />
      <FieldsSection />
      <StatsSection />
      <TeamSection />
      <MarriageSection />
      <FAQSection />
      <CTABanner />
      <Footer />
    </main>
  );
};

export default AppHome;
