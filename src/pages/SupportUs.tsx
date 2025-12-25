import { ButterflyBackground } from '../components/ui';

export default function SupportUs() {
  return (
    <div className="min-h-screen relative">
      {/* Butterfly Background */}
      <ButterflyBackground />

      {/* Content Placeholder */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="shimmer-text">Support Us</span>
          </h1>
          <p className="text-lg text-foreground/70">
            محتوى الصفحة قيد التطوير
          </p>
        </div>
      </div>
    </div>
  );
}