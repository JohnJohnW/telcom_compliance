import type { Metadata } from 'next';
import { ExternalLink, AlertTriangle, BookOpen, Users, CalendarClock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About TelcoComply',
  description:
    'About TelcoComply — an Australian telecommunications compliance reference tool for carriers, carriage service providers, and resellers.',
};

const REGULATORY_LINKS = [
  {
    name: 'ACMA — Australian Communications and Media Authority',
    url: 'https://www.acma.gov.au',
    desc: 'Primary telecommunications regulator — compliance, licensing, enforcement.',
  },
  {
    name: 'ACCC — Australian Competition and Consumer Commission',
    url: 'https://www.accc.gov.au',
    desc: 'Competition regulation and telecommunications access regime.',
  },
  {
    name: 'Federal Register of Legislation',
    url: 'https://www.legislation.gov.au',
    desc: 'Official source for all Commonwealth Acts and legislative instruments.',
  },
  {
    name: 'Telecommunications Industry Ombudsman (TIO)',
    url: 'https://www.tio.com.au',
    desc: 'Dispute resolution for telecommunications consumers.',
  },
  {
    name: 'Department of Home Affairs — Cyber & Infrastructure Security',
    url: 'https://www.homeaffairs.gov.au',
    desc: 'SOCI Act, TOLA, and national security obligations.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
      <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 mb-4">About TelcoComply</h1>
      <p className="text-lg text-slate-500 leading-relaxed mb-12">
        A compliance reference tool for Australian telecommunications carriers, carriage service
        providers, VoIP operators, and resellers.
      </p>

      {/* Disclaimer — prominent */}
      <div className="flex gap-4 p-6 rounded-xl border-2 border-amber-300 bg-amber-50 mb-10">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h2 className="text-base font-bold text-amber-900 mb-2">Important Disclaimer</h2>
          <p className="text-sm text-amber-800 leading-relaxed">
            <strong>TelcoComply is not a law firm and does not provide legal advice.</strong> The
            information on this site is provided for general informational purposes only. It is not a
            substitute for advice from a qualified Australian telecommunications lawyer about your
            specific circumstances. Legislative references are provided to assist you in navigating
            the source legislation and may not be current — always verify the current version of any
            Act or instrument at{' '}
            <a
              href="https://www.legislation.gov.au"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              legislation.gov.au
            </a>
            .
          </p>
        </div>
      </div>

      {/* What it is */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-steel-100 text-steel-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">What TelcoComply Is</h2>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          TelcoComply is a compliance reference tool that summarises the principal obligations of
          telecommunications businesses under Australian law, primarily the{' '}
          <a
            href="https://www.legislation.gov.au/C2004A05145"
            target="_blank"
            rel="noopener noreferrer"
            className="text-steel-600 hover:underline"
          >
            Telecommunications Act 1997
          </a>{' '}
          and related legislation, including:
        </p>
        <ul className="space-y-2 mb-4">
          {[
            'Telecommunications (Consumer Protection and Service Standards) Act 1999',
            'Telecommunications (Interception and Access) Act 1979',
            'Telecommunications and Other Legislation Amendment (Assistance and Access) Act 2018',
            'Security of Critical Infrastructure Act 2018',
            'Spam Act 2003 and Do Not Call Register Act 2006',
            'Telecommunications (Customer Equipment and Customer Cabling) Act 2000',
          ].map((act) => (
            <li key={act} className="flex gap-2 text-sm text-slate-600">
              <span className="text-steel-500 mt-1 shrink-0">•</span>
              {act}
            </li>
          ))}
        </ul>
        <p className="text-slate-600 leading-relaxed">
          Each compliance area includes plain-English explanations, actionable compliance checklists,
          and direct references to the relevant provisions in the source legislation.
        </p>
      </section>

      {/* Who it is for */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-steel-100 text-steel-600">
            <Users className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Who It Is For</h2>
        </div>
        <p className="text-slate-600 leading-relaxed mb-4">
          TelcoComply is designed for telecommunications businesses operating in Australia,
          including:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { title: 'Carriers', desc: 'Holders of carrier licences who own network infrastructure.' },
            { title: 'Carriage Service Providers (CSPs)', desc: 'Businesses supplying carriage services using a carrier\'s network.' },
            { title: 'Internet Service Providers (ISPs)', desc: 'Providers of internet access services.' },
            { title: 'VoIP Providers', desc: 'Businesses providing voice-over-internet-protocol calling services.' },
            { title: 'MVNOs', desc: 'Mobile virtual network operators using a host carrier\'s mobile network.' },
            { title: 'Resellers', desc: 'Wholesale and retail resellers of telecommunications services.' },
          ].map((item) => (
            <div key={item.title} className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <p className="text-sm font-semibold text-navy-900 mb-1">{item.title}</p>
              <p className="text-xs text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Currency */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-steel-100 text-steel-600">
            <CalendarClock className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-navy-900">Content Currency</h2>
        </div>
        <p className="text-slate-600 leading-relaxed">
          The content on TelcoComply is reviewed periodically against the Federal Register of
          Legislation and ACMA&apos;s regulatory guidance. The last comprehensive review was
          completed in <strong>February 2026</strong>. Australian telecommunications law changes
          frequently — check legislation.gov.au for the current version of any Act or instrument
          before relying on any information on this site.
        </p>
      </section>

      {/* Regulatory links */}
      <section className="mb-10">
        <h2 className="text-xl font-bold text-navy-900 mb-6">Official Regulatory Resources</h2>
        <div className="space-y-3">
          {REGULATORY_LINKS.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-4 rounded-lg border border-slate-200 hover:border-steel-200 hover:bg-steel-50 transition-colors group"
            >
              <ExternalLink className="w-4 h-4 text-steel-500 mt-0.5 shrink-0 group-hover:text-steel-600" />
              <div>
                <p className="text-sm font-semibold text-navy-900 group-hover:text-steel-600 transition-colors">
                  {link.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="p-6 rounded-xl bg-navy-900 text-white">
        <h2 className="text-lg font-bold mb-2">Start Your Compliance Assessment</h2>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Not sure which compliance obligations apply to your business? Take the 12-question
          assessment to receive a personalised compliance profile.
        </p>
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-navy-900 text-sm font-semibold hover:bg-slate-100 transition-colors"
        >
          Begin Assessment
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
