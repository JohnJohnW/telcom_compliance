import { cn } from '@/lib/utils';

interface DividerProps {
  className?: string;
  label?: string;
}

export function Divider({ className, label }: DividerProps) {
  if (label) {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>
    );
  }
  return <div className={cn('h-px bg-slate-200 w-full', className)} />;
}
