import { cn } from '@/lib/utils';
import type { PriorityLevel } from '@/types/compliance';

interface PriorityBadgeProps {
  priority: PriorityLevel;
  className?: string;
}

const PRIORITY_CONFIG: Record<PriorityLevel, { label: string; className: string }> = {
  ALWAYS_REQUIRED: {
    label: 'Always Required',
    className: 'bg-navy-900 text-white border-navy-900',
  },
  REQUIRED: {
    label: 'Required',
    className: 'bg-teal-600 text-white border-teal-600',
  },
  REVIEW_RECOMMENDED: {
    label: 'Review Recommended',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  NOT_APPLICABLE: {
    label: 'Not Applicable',
    className: 'bg-slate-100 text-slate-400 border-slate-200',
  },
};

export function PriorityBadge({ priority, className }: PriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}
