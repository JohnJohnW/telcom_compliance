import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-semibold text-xs rounded-full px-2.5 py-0.5 border',
  {
    variants: {
      variant: {
        // Category badges
        Licensing: 'bg-navy-900 text-white border-navy-900',
        Consumer: 'bg-teal-50 text-teal-700 border-teal-100',
        Security: 'bg-red-50 text-red-600 border-red-100',
        Technical: 'bg-steel-50 text-steel-700 border-steel-100',
        Regulatory: 'bg-slate-100 text-slate-700 border-slate-200',
        International: 'bg-amber-50 text-amber-600 border-amber-100',
        Privacy: 'bg-amber-50 text-amber-600 border-amber-100',
        // Priority badges
        ALWAYS_REQUIRED: 'bg-navy-900 text-white border-navy-900',
        REQUIRED: 'bg-teal-600 text-white border-teal-600',
        REVIEW_RECOMMENDED: 'bg-amber-50 text-amber-600 border-amber-200',
        NOT_APPLICABLE: 'bg-slate-100 text-slate-400 border-slate-200',
      },
    },
    defaultVariants: {
      variant: 'Regulatory',
    },
  }
);

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
