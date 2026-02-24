import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { SectionCard } from '@/components/home/SectionCard';
import { CTABanner } from '@/components/home/CTABanner';
import { COMPLIANCE_SECTIONS } from '@/data/sections';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsBar />

      {/* Section grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-navy-900 mb-2">Compliance Areas</h2>
          <p className="text-slate-500 text-base">
            16 areas of Australian telecommunications compliance — from carrier licensing to data retention.
            Each guide includes actionable obligations and direct references to the source legislation.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {COMPLIANCE_SECTIONS.map((section) => (
            <SectionCard key={section.slug} section={section} />
          ))}
        </div>
      </section>

      <CTABanner />
    </>
  );
}
