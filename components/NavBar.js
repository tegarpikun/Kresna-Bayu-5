'use client';

import { useState } from 'react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

// Link navigasi: Home -> balik ke intro paling atas, About us -> bagian
// animasi 3D sinematik (section hero setelah intro), Service -> galeri
// destinasi, Contact -> footer paling bawah. Semua pakai anchor "#id"
// biasa (bukan JS scroll manual) supaya jalan sama persis dengan
// "scroll-behavior: smooth" yang sudah diset global di globals.css.
const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About Us' },
  { href: '#services', label: 'Service' },
  { href: '#contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-[65] border-b border-white/5 bg-cinematic-black/35 backdrop-blur-md safe-top">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-end gap-6 px-4 sm:h-16 sm:px-8">
        {/* Ruang kosong di kiri sengaja dibiarkan - logo brand sudah fixed
            terpisah di pojok kiri atas (lihat app/page.js) dan akan
            terlihat menumpuk rapi di atas bar ini. */}
        <div className="hidden items-center gap-7 md:flex lg:gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-sans text-[11px] tracking-[0.15em] text-cinematic-cream/80 transition-colors hover:text-cinematic-amber"
            >
              {link.label}
            </a>
          ))}
        </div>

        <LanguageSwitcher variant="dark" />

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Buka menu navigasi"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] rounded-full border border-cinematic-cream/25 md:hidden"
        >
          <span
            className={`block h-[1.5px] w-4 bg-cinematic-cream transition-transform ${
              open ? 'translate-y-[6.5px] rotate-45' : ''
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-cinematic-cream transition-opacity ${
              open ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block h-[1.5px] w-4 bg-cinematic-cream transition-transform ${
              open ? '-translate-y-[6.5px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Menu mobile - dropdown sederhana di bawah bar, cuma muncul di
          layar kecil saat tombol hamburger di atas ditekan. */}
      {open && (
        <div className="flex flex-col gap-1 border-t border-white/5 bg-cinematic-black/90 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 font-sans text-xs tracking-[0.15em] text-cinematic-cream/85 transition-colors hover:bg-white/5 hover:text-cinematic-amber"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
