import Link from 'next/link';
import { ClipboardCheck, ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="bg-navy-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-steel-600/20 text-steel-300 shrink-0">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Not sure where to start?
              </h2>
              <p className="text-slate-300 max-w-xl">
                Answer 12 questions about your business and receive a personalised compliance
                profile showing which sections of the Telecommunications Act 1997 are most
                relevant to you.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white text-navy-900 font-semibold text-base hover:bg-slate-100 transition-colors shadow-sm whitespace-nowrap"
            >
              Begin Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
