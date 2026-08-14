'use client';

import { useEffect } from 'react';
import { buildWhatsappLink } from '@/lib/siteConfig';

export default function Error({ error, reset }) {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 bg-cinematic-black px-6 text-center text-cinematic-cream">
      <p className="font-sans text-xs uppercase tracking-[0.3em] text-cinematic-amber">
        Terjadi kendala
      </p>
      <h1 className="font-serif text-2xl sm:text-4xl">
        Halaman gagal dimuat sepenuhnya
      </h1>
      <p className="max-w-md font-sans text-sm text-cinematic-cream/70">
        Silakan coba muat ulang. Jika masalah berlanjut, hubungi kami
        langsung lewat WhatsApp.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-sm border border-cinematic-amber/60 bg-gradient-to-r from-[#D4A574] to-[#C9A96E] px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-cinematic-black"
        >
          Coba Lagi
        </button>
        <a
          href={buildWhatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm bg-cinematic-whatsapp px-6 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white"
        >
          Chat via WhatsApp
        </a>
      </div>
    </div>
  );
}
