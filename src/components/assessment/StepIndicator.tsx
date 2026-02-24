import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { WizardStep } from '@/types/compliance';

interface StepIndicatorProps {
  steps: WizardStep[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="h-1.5 bg-slate-200 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-navy-900 rounded-full transition-all duration-500"
          style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Step labels — hidden on mobile, shown from sm */}
      <div className="hidden sm:flex justify-between mb-1">
        {steps.map((step, idx) => {
          const isCompleted = idx < currentStep;
          const isActive = idx === currentStep;
          return (
            <div key={idx} className="flex flex-col items-center gap-1" style={{ flex: 1 }}>
              <div
                className={cn(
                  'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all',
                  isCompleted
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : isActive
                    ? 'bg-navy-900 border-navy-900 text-white'
                    : 'bg-white border-slate-200 text-slate-400'
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5" /> : idx + 1}
              </div>
              <span
                className={cn(
                  'text-xs font-medium text-center leading-tight',
                  isActive ? 'text-navy-900' : 'text-slate-400'
                )}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile: just show "Step N of M" */}
      <p className="sm:hidden text-sm font-medium text-slate-500">
        Step {currentStep + 1} of {steps.length}: <span className="text-navy-900">{steps[currentStep].title}</span>
      </p>
    </div>
  );
}
