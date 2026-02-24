import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PriorityBadge } from './PriorityBadge';
import { Badge } from '@/components/ui/Badge';
import { getSectionBySlug } from '@/data/sections';
import type { SectionResult, SectionCategory } from '@/types/compliance';

interface ReportSectionProps {
  result: SectionResult;
}

export function ReportSection({ result }: ReportSectionProps) {
  const section = getSectionBySlug(result.slug);
  if (!section) return null;

  const isNotApplicable = result.priority === 'NOT_APPLICABLE';

  return (
    <div
      className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${
        isNotApplicable
          ? 'border-slate-100 bg-slate-50 opacity-60'
          : 'border-slate-200 bg-white'
      }`}
    >
      <div className="flex items-start gap-3 min-w-0">
        <Badge variant={section.category as SectionCategory} className="shrink-0 mt-0.5">
          {section.category}
        </Badge>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-slate-800 leading-snug">{section.title}</p>
          {!isNotApplicable && (
            <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{section.summary}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end gap-2 shrink-0">
        <PriorityBadge priority={result.priority} />
        {!isNotApplicable && (
          <Link
            href={`/guide/${section.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-steel-600 hover:text-navy-900 transition-colors"
          >
            View guide <ArrowRight className="w-3 h-3" />
          </Link>
        )}
      </div>
    </div>
  );
}
