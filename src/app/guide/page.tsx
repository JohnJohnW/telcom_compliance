import type { Metadata } from 'next';
import { COMPLIANCE_SECTIONS } from '@/data/sections';
import { GuideHubCard } from '@/components/guide/GuideHubCard';

export const metadata: Metadata = {
  title: 'Compliance Guide',
  description:
    'Comprehensive compliance guides for all 16 areas of the Telecommunications Act 1997. Legal citations, actionable checklists, and plain-English explanations for Australian telecom providers.',
};

export default function GuidePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      {/* Page header */}
      <div className="max-w-3xl mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">
          Compliance Guide
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          16 compliance areas covering the Telecommunications Act 1997 and related Australian legislation.
          Each guide contains legal citations referenced to{' '}
          <a
            href="https://www.legislation.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel-600 hover:underline"
          >
            legislation.gov.au
          </a>
          , actionable compliance checklists, and plain-English explanations.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {COMPLIANCE_SECTIONS.map((section) => (
          <GuideHubCard key={section.slug} section={section} />
        ))}
      </div>
    </div>
  );
}
