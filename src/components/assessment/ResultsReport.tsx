import Link from 'next/link';
import { Printer, RotateCcw, BookOpen } from 'lucide-react';
import { ReportSection } from './ReportSection';
import { Divider } from '@/components/ui/Divider';
import type { AssessmentResult, PriorityLevel, BusinessType } from '@/types/compliance';

interface ResultsReportProps {
  result: AssessmentResult;
  onRestart: () => void;
}

const BUSINESS_TYPE_LABELS: Record<BusinessType, string> = {
  carrier: 'Network Carrier',
  'carriage-service-provider': 'Carriage Service Provider (CSP)',
  'content-service-provider': 'Content Service Provider',
  'voip-provider': 'VoIP Provider',
  'equipment-supplier': 'Equipment Supplier',
  reseller: 'Reseller',
  isp: 'Internet Service Provider (ISP)',
  mvno: 'Mobile Virtual Network Operator (MVNO)',
};

const PRIORITY_ORDER: PriorityLevel[] = [
  'ALWAYS_REQUIRED',
  'REQUIRED',
  'REVIEW_RECOMMENDED',
  'NOT_APPLICABLE',
];

const PRIORITY_HEADINGS: Record<PriorityLevel, string> = {
  ALWAYS_REQUIRED: 'Always Required',
  REQUIRED: 'Required for Your Business',
  REVIEW_RECOMMENDED: 'Review Recommended',
  NOT_APPLICABLE: 'Not Applicable',
};

export function ResultsReport({ result, onRestart }: ResultsReportProps) {
  const today = new Date().toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const sectionsByPriority = PRIORITY_ORDER.reduce<
    Record<PriorityLevel, typeof result.sections>
  >(
    (acc, p) => {
      acc[p] = result.sections.filter((s) => s.priority === p);
      return acc;
    },
    {
      ALWAYS_REQUIRED: [],
      REQUIRED: [],
      REVIEW_RECOMMENDED: [],
      NOT_APPLICABLE: [],
    }
  );

  const totalRequired =
    sectionsByPriority.ALWAYS_REQUIRED.length + sectionsByPriority.REQUIRED.length;

  return (
    <div className="print-full-width">
      {/* Report header */}
      <div className="bg-navy-900 text-white rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <p className="text-steel-300 text-sm font-medium mb-1">Compliance Profile</p>
            <h2 className="text-2xl font-bold mb-3">Your Assessment Results</h2>
            <p className="text-slate-300 text-sm">Generated: {today}</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-white">{totalRequired}</div>
            <div className="text-steel-300 text-sm">compliance areas require action</div>
          </div>
        </div>

        {result.businessTypes.length > 0 && (
          <div className="mt-4 pt-4 border-t border-navy-800">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Business profile
            </p>
            <div className="flex flex-wrap gap-2">
              {result.businessTypes.map((type) => (
                <span
                  key={type}
                  className="text-xs px-2.5 py-1 rounded-full bg-steel-600/30 border border-steel-500/30 text-steel-200 font-medium"
                >
                  {BUSINESS_TYPE_LABELS[type] ?? type}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sections by priority */}
      <div className="space-y-8 mb-8">
        {PRIORITY_ORDER.map((priority) => {
          const sections = sectionsByPriority[priority];
          if (sections.length === 0) return null;
          return (
            <div key={priority}>
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-base font-bold text-slate-800">
                  {PRIORITY_HEADINGS[priority]}
                </h3>
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {sections.length}
                </span>
              </div>
              <div className="space-y-2">
                {sections.map((s) => (
                  <ReportSection key={s.slug} result={s} />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Divider className="mb-6" />

      {/* Disclaimer */}
      <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 mb-6">
        <p className="text-xs text-amber-800 leading-relaxed">
          <strong>Not legal advice.</strong> This assessment is a general compliance reference tool only.
          It does not constitute legal advice and should not be relied upon as such. The results are based
          on the information you provided. Legislation changes — always verify against current legislation
          at{' '}
          <a
            href="https://www.legislation.gov.au"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            legislation.gov.au
          </a>
          . Consult a qualified Australian telecommunications lawyer for advice specific to your circumstances.
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 no-print">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:border-slate-300 hover:text-slate-800 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Start Over
        </button>
        <Link
          href="/guide"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-steel-200 text-sm font-semibold text-steel-600 hover:bg-steel-50 transition-colors"
        >
          <BookOpen className="w-4 h-4" />
          View Full Guide
        </Link>
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-700 transition-colors"
        >
          <Printer className="w-4 h-4" />
          Print / Save as PDF
        </button>
      </div>
    </div>
  );
}
