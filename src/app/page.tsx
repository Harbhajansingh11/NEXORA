import React from 'react';
import { MarketingHeader } from '@/components/marketing/MarketingHeader';
import { HeroSection } from '@/components/marketing/HeroSection';
import { BenefitsStrip } from '@/components/marketing/BenefitsStrip';
import { ProblemSolutionSection } from '@/components/marketing/ProblemSolutionSection';
import { FeatureGridSection } from '@/components/marketing/FeatureGridSection';
import { HowItWorksSection } from '@/components/marketing/HowItWorksSection';
import { UseCasesSection } from '@/components/marketing/UseCasesSection';
import { ProductPreviewSection } from '@/components/marketing/ProductPreviewSection';
import { PricingSection } from '@/components/marketing/PricingSection';
import { FinalCtaSection } from '@/components/marketing/FinalCtaSection';
import { MarketingFooter } from '@/components/marketing/MarketingFooter';

export const metadata = {
  title: 'NEXORA — Less Chaos. More Control.',
  description: 'AI-powered personal productivity assistant for tasks, reminders, calendar scheduling, email assistance, and daily planning.',
};

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-nb-yellow text-nb-charcoal font-satoshi flex flex-col antialiased selection:bg-black selection:text-nb-yellow">
      {/* 1. Compact Neo-Brutalist Navigation Bar */}
      <MarketingHeader />

      <main className="flex-1">
        {/* 2. Neo-Brutalist Hero with 2-column layout and browser mockup */}
        <HeroSection />

        {/* 3. Dark Charcoal Benefits Ticker */}
        <BenefitsStrip />

        {/* 4. Problem & Solution Comparison */}
        <ProblemSolutionSection />

        {/* 5. 6-Feature Engine Grid */}
        <FeatureGridSection />

        {/* 6. 3-Step "How It Works" Flow */}
        <HowItWorksSection />

        {/* 7. Tailored Use Cases (Professionals, Students, Freelancers) */}
        <UseCasesSection />

        {/* 8. Tabbed Interactive Product Preview */}
        <ProductPreviewSection />

        {/* 9. Transparent Pricing Matrix */}
        <PricingSection />

        {/* 10. High-Impact Conversion Card */}
        <FinalCtaSection />
      </main>

      {/* 11. Comprehensive Marketing Footer */}
      <MarketingFooter />
    </div>
  );
}
