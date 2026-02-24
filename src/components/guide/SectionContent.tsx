import { CheckCircle2 } from 'lucide-react';
import { LegalCitation } from './LegalCitation';
import { DisclaimerBanner } from '@/components/layout/DisclaimerBanner';
import { Badge } from '@/components/ui/Badge';
import { LastUpdatedBanner } from './LastUpdatedBanner';
import type { ComplianceSection, SectionCategory } from '@/types/compliance';

interface SectionContentProps {
  section: ComplianceSection;
}

export function SectionContent({ section }: SectionContentProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-0 py-10 lg:py-14">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <Badge variant={section.category as SectionCategory}>{section.category}</Badge>
          <LastUpdatedBanner date={section.lastUpdated} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4 leading-tight">
          {section.title}
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-5">{section.summary}</p>

        {/* Key Acts */}
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Acts</p>
          <div className="flex flex-wrap gap-2">
            {section.keyActs.map((act) => (
              <span
                key={act}
                className="text-xs px-2.5 py-1 rounded-md bg-steel-50 text-steel-700 border border-steel-100 font-medium"
              >
                {act}
              </span>
            ))}
          </div>
        </div>
      </header>

      <DisclaimerBanner variant="inline" className="mb-8" />

      {/* Subsections */}
      <div className="space-y-12">
        {section.subsections.map((sub, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-bold text-navy-900 mb-3 pb-2 border-b-2 border-steel-100">
              {sub.heading}
            </h2>

            {/* Body — split on double newlines for paragraphs */}
            {sub.body.split('\n\n').map((para, pIdx) => (
              <p key={pIdx} className="text-slate-700 leading-relaxed mb-4">
                {para}
              </p>
            ))}

            {/* Checklist */}
            {sub.checklist && sub.checklist.length > 0 && (
              <div className="my-5 p-5 rounded-xl bg-teal-50 border border-teal-100">
                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-3">
                  Compliance Checklist
                </p>
                <ul className="space-y-2.5">
                  {sub.checklist.map((item, cIdx) => (
                    <li key={cIdx} className="flex gap-2.5 text-sm text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Legal Citations */}
            {sub.citations.length > 0 && (
              <div className="mt-4">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Legislative References
                </p>
                {sub.citations.map((citation, cIdx) => (
                  <LegalCitation key={cIdx} citation={citation} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer disclaimer */}
      <div className="mt-12 pt-8 border-t border-slate-200">
        <DisclaimerBanner variant="inline" />
      </div>
    </article>
  );
}
