import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const GUIDE_LINKS = [
  { href: '/guide/regulatory-framework', label: 'Regulatory Framework' },
  { href: '/guide/carrier-licensing', label: 'Carrier Licensing' },
  { href: '/guide/data-retention', label: 'Data Retention' },
  { href: '/guide/consumer-obligations', label: 'Consumer Obligations' },
  { href: '/guide/national-security', label: 'National Security' },
  { href: '/guide/spam-do-not-call', label: 'Spam & Do Not Call' },
];

const EXTERNAL_LINKS = [
  {
    href: 'https://www.legislation.gov.au/C2004A05145',
    label: 'Telecommunications Act 1997',
  },
  {
    href: 'https://www.acma.gov.au',
    label: 'ACMA',
  },
  {
    href: 'https://www.accc.gov.au',
    label: 'ACCC',
  },
  {
    href: 'https://www.legislation.gov.au',
    label: 'Federal Register of Legislation',
  },
  {
    href: 'https://www.tio.com.au',
    label: 'Telecommunications Industry Ombudsman',
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-navy-800">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-md bg-steel-600 text-white font-bold text-xs">
                TC
              </div>
              <span className="font-bold text-white text-sm">TelcoComply</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A compliance reference tool for Australian telecommunications carriers, service providers, and resellers.
            </p>
            <p className="text-xs text-slate-500 mt-3">
              Content last reviewed: February 2026
            </p>
          </div>

          {/* Guide links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Compliance Guide</h3>
            <ul className="space-y-2">
              {GUIDE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/guide"
                  className="text-sm text-steel-400 hover:text-steel-200 transition-colors font-medium"
                >
                  View all sections →
                </Link>
              </li>
            </ul>
          </div>

          {/* External resources */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Official Resources</h3>
            <ul className="space-y-2">
              {EXTERNAL_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} TelcoComply. For informational purposes only. Not legal advice.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              About
            </Link>
            <Link href="/assessment" className="text-xs text-slate-500 hover:text-slate-300 transition-colors">
              Assessment Tool
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
