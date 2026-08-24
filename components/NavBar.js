'use client';

import { useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Service' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[65] border-b border-slate-200 bg-white/85 backdrop-blur-md safe-top">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-end gap-6 px-4 sm:h-16 sm:px-8">
        {/* Link Navigasi Desktop */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[11px] tracking-[0.15em] text-slate-700 transition-colors hover:text-amber-600"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Language Switcher - Diaktifkan dengan tema terang (light) */}
        <LanguageSwitcher variant="light" />

        {/* Tombol Hamburger Mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-slate-300 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-4 bg-slate-900 transition-transform ${
              open ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-slate-900 transition-opacity ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-slate-900 transition-transform ${
              open ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Menu Mobile Dropdown */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-slate-200 bg-white/95 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 font-sans text-xs tracking-[0.15em] text-slate-800 transition-colors hover:bg-slate-100 hover:text-amber-600"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
