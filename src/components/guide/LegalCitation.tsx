import { ExternalLink, Scale } from 'lucide-react';
import type { LegalCitation as LegalCitationType } from '@/types/compliance';

interface LegalCitationProps {
  citation: LegalCitationType;
}

export function LegalCitation({ citation }: LegalCitationProps) {
  return (
    <div className="flex gap-3 p-4 rounded-lg border border-steel-100 bg-steel-50 my-3">
      <Scale className="w-4 h-4 text-steel-600 mt-0.5 shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1 mb-1">
          <span className="font-semibold text-sm text-navy-900">{citation.actShortName}</span>
          <span className="text-xs font-mono text-steel-600 bg-steel-100 px-1.5 py-0.5 rounded">
            {citation.section}
          </span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed mb-2">{citation.description}</p>
        {citation.legislationUrl && (
          <a
            href={citation.legislationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs font-medium text-steel-600 hover:text-navy-900 transition-colors"
          >
            View on legislation.gov.au
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </div>
  );
}
