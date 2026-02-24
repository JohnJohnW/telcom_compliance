import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DisclaimerBannerProps {
  variant?: 'top' | 'inline';
  className?: string;
}

export function DisclaimerBanner({ variant = 'top', className }: DisclaimerBannerProps) {
  if (variant === 'inline') {
    return (
      <div
        className={cn(
          'flex gap-3 p-4 rounded-lg border border-amber-200 bg-amber-50 text-sm text-amber-800',
          className
        )}
      >
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-600" />
        <p>
          <strong>Not legal advice.</strong> This guide is for general informational purposes only and does not
          constitute legal advice. Legislative references are provided to assist navigation of the source legislation.
          Consult a qualified Australian telecommunications lawyer for advice specific to your circumstances.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'bg-amber-50 border-b border-amber-200 py-2 px-4',
        className
      )}
    >
      <p className="max-w-7xl mx-auto text-xs text-amber-800 flex items-center gap-2">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>
          <strong>Informational only — not legal advice.</strong> Always consult a qualified solicitor for
          advice specific to your circumstances. Content last reviewed February 2026.
        </span>
      </p>
    </div>
  );
}
