import type { Metadata } from 'next';
import { AssessmentWizard } from '@/components/assessment/AssessmentWizard';

export const metadata: Metadata = {
  title: 'Compliance Assessment Tool',
  description:
    'Answer 12 questions about your telecommunications business to receive a personalised compliance profile showing which sections of the Telecommunications Act 1997 apply to you.',
};

export default function AssessmentPage() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-8rem)]">
      {/* Page header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-navy-900 mb-2">
            Compliance Assessment Tool
          </h1>
          <p className="text-slate-500">
            Answer questions about your business to receive a personalised compliance profile
            showing which sections of the Telecommunications Act 1997 are most relevant to you.
            Takes approximately 3–5 minutes.
          </p>
        </div>
      </div>

      <AssessmentWizard />
    </div>
  );
}
