import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ComplianceSection, SectionCategory } from '@/types/compliance';

const BUSINESS_TYPE_LABELS: Record<string, string> = {
  carrier: 'Carriers',
  'carriage-service-provider': 'CSPs',
  'content-service-provider': 'Content Providers',
  'voip-provider': 'VoIP Providers',
  'equipment-supplier': 'Equipment Suppliers',
  reseller: 'Resellers',
  isp: 'ISPs',
  mvno: 'MVNOs',
};

interface GuideHubCardProps {
  section: ComplianceSection;
}

export function GuideHubCard({ section }: GuideHubCardProps) {
  return (
    <div className="section-card bg-white rounded-xl border border-slate-200 p-6 flex flex-col h-full">
      <div className="flex items-start justify-between gap-3 mb-3">
        <Badge variant={section.category as SectionCategory}>{section.category}</Badge>
        <span className="text-xs text-slate-400 shrink-0">
          Updated {new Date(section.lastUpdated).toLocaleDateString('en-AU', { month: 'short', year: 'numeric' })}
        </span>
      </div>

      <h3 className="text-base font-bold text-navy-900 mb-2 leading-snug">{section.title}</h3>

      <p className="text-sm text-slate-500 leading-relaxed mb-4 flex-1">{section.summary}</p>

      {/* Key Acts */}
      <div className="mb-4">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Key Acts</p>
        <div className="flex flex-wrap gap-1">
          {section.keyActs.slice(0, 2).map((act) => (
            <span
              key={act}
              className="text-xs px-2 py-0.5 rounded bg-steel-50 text-steel-700 border border-steel-100"
            >
              {act.replace(/\s*\(Cth\)/g, '').replace(/Telecommunications/, 'Telco')}
            </span>
          ))}
          {section.keyActs.length > 2 && (
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-500">
              +{section.keyActs.length - 2} more
            </span>
          )}
        </div>
      </div>

      {/* Applies to */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Applies to</p>
        <div className="flex flex-wrap gap-1">
          {section.applicableTo.slice(0, 3).map((type) => (
            <span key={type} className="text-xs px-2 py-0.5 rounded-full bg-navy-900/5 text-navy-700 font-medium">
              {BUSINESS_TYPE_LABELS[type] ?? type}
            </span>
          ))}
          {section.applicableTo.length > 3 && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
              +{section.applicableTo.length - 3} more
            </span>
          )}
        </div>
      </div>

      <Link
        href={`/guide/${section.slug}`}
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-steel-600 hover:text-navy-900 hover:gap-2.5 transition-all"
      >
        Read full guide <ArrowRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
