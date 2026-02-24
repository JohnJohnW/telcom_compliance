import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { COMPLIANCE_SECTIONS, getSectionBySlug } from '@/data/sections';
import { SectionContent } from '@/components/guide/SectionContent';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPLIANCE_SECTIONS.map((section) => ({ slug: section.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  if (!section) return {};
  return {
    title: section.title,
    description: section.summary,
    openGraph: {
      title: `${section.title} | TelcoComply`,
      description: section.summary,
    },
  };
}

export default async function GuideSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const section = getSectionBySlug(slug);
  if (!section) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <div className="py-6 border-b border-slate-100">
        <Link
          href="/guide"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-navy-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          All compliance areas
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
        {/* Main content */}
        <SectionContent section={section} />

        {/* Sidebar */}
        <aside className="hidden lg:block py-10">
          <div className="sticky top-24">
            <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
              On this page
            </h2>
            <nav>
              <ul className="space-y-2">
                {section.subsections.map((sub, idx) => (
                  <li key={idx}>
                    <span className="text-sm text-slate-500 leading-snug block py-1 hover:text-navy-900 cursor-default">
                      {sub.heading}
                    </span>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="mt-8 p-4 rounded-lg bg-steel-50 border border-steel-100">
              <p className="text-xs font-bold text-steel-700 mb-2">Need a personalised view?</p>
              <p className="text-xs text-slate-500 mb-3 leading-relaxed">
                Take the 12-question assessment to see which compliance areas apply to your business.
              </p>
              <Link
                href="/assessment"
                className="text-xs font-semibold text-steel-600 hover:text-navy-900 transition-colors"
              >
                Start Assessment →
              </Link>
            </div>

            <div className="mt-4 p-4 rounded-lg bg-amber-50 border border-amber-100">
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Not legal advice.</strong> Consult a qualified Australian solicitor for
                advice specific to your circumstances.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
