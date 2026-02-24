import Link from 'next/link';
import { ArrowRight, BookOpen, Shield } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-steel-600/30 border border-steel-500/30 text-steel-200 text-xs font-semibold mb-6 tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5" />
            Australia Only · Telecommunications Act 1997
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-6">
            Australian Telecom
            <br />
            <span className="text-steel-300">Compliance,</span>
            <br />
            Simplified.
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl">
            A comprehensive compliance reference for Australian telecommunications carriers,
            carriage service providers, VoIP operators, and resellers. Understand your
            obligations under the Telecommunications Act 1997 and related legislation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/assessment"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white text-navy-900 font-semibold text-base hover:bg-slate-100 transition-colors shadow-sm"
            >
              Start Compliance Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/guide"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg border border-steel-400/50 text-white font-semibold text-base hover:bg-steel-600/20 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              Browse Compliance Guide
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
