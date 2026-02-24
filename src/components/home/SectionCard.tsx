import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import type { ComplianceSection, SectionCategory } from '@/types/compliance';

interface SectionCardProps {
  section: ComplianceSection;
}

export function SectionCard({ section }: SectionCardProps) {
  return (
    <Link href={`/guide/${section.slug}`} className="block group">
      <div className="section-card bg-white rounded-xl border border-slate-200 p-5 h-full flex flex-col">
        <div className="flex items-start justify-between gap-3 mb-3">
          <Badge variant={section.category as SectionCategory}>{section.category}</Badge>
        </div>
        <h3 className="text-base font-semibold text-navy-900 mb-2 group-hover:text-steel-600 transition-colors leading-snug">
          {section.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">
          {section.summary}
        </p>
        <div className="flex items-center gap-1 text-xs font-semibold text-steel-600 group-hover:gap-2 transition-all">
          Read guide <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}
