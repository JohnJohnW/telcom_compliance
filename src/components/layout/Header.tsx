'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/guide', label: 'Compliance Guide' },
  { href: '/assessment', label: 'Assessment Tool' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={() => setMobileOpen(false)}>
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-navy-900 text-white font-bold text-sm select-none group-hover:bg-navy-700 transition-colors">
              TC
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-bold text-navy-900 text-base tracking-tight">TelcoComply</span>
              <span className="text-xs text-slate-500 font-medium">Australian Telecom Compliance</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-steel-100 text-navy-900'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/assessment"
              className="inline-flex items-center px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-semibold hover:bg-navy-700 transition-colors"
            >
              Start Assessment
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pb-4 pt-2">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-steel-100 text-navy-900'
                      : 'text-slate-600 hover:text-navy-900 hover:bg-slate-100'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/assessment"
              onClick={() => setMobileOpen(false)}
              className="mt-2 px-4 py-3 rounded-lg bg-navy-900 text-white text-sm font-semibold text-center hover:bg-navy-700 transition-colors"
            >
              Start Compliance Assessment
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
