import { useEffect } from 'react';
import { ButterflyBackground } from '../components/ui';

// Import modular category sections
import {
  HeroSection,
  ExploreMoreSection,
  ContentTypesSection,
  LatestNewsSection,
  FootballSection,
  WelcomeCTASection,
  NewsletterSection,
} from '../components/features/categories';

// CSS Keyframes for animations
const styles = `
@keyframes fadeSlideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progress {
  from { width: 0%; }
  to { width: 100%; }
}
`;

// ============= Main Categories Page =============
export default function Categories() {
  // Inject styles
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Butterfly Background */}
      <ButterflyBackground />

      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <ExploreMoreSection />
        <ContentTypesSection />
        <LatestNewsSection />
        <FootballSection />
        <WelcomeCTASection />
        <NewsletterSection />
      </div>
    </div>
  );
}