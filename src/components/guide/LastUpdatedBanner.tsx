import { CalendarClock } from 'lucide-react';

interface LastUpdatedBannerProps {
  date: string;
  className?: string;
}

export function LastUpdatedBanner({ date, className }: LastUpdatedBannerProps) {
  const formatted = new Date(date).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={`inline-flex items-center gap-2 text-xs text-slate-500 ${className ?? ''}`}>
      <CalendarClock className="w-3.5 h-3.5" />
      <span>Last reviewed: {formatted}</span>
    </div>
  );
}
