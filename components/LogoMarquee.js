'use client';

import { siteConfig } from '@/lib/siteConfig';

export default function LogoMarquee() {
  const logos = siteConfig.partnerLogos;
  // Digandakan 2x supaya loop animasi terlihat menyambung tanpa jeda.
  const track = [...logos, ...logos];

  return (
    <div className="border-t border-slate-200 py-10">
      <p className="mb-8 text-center font-sans text-[10px] uppercase tracking-[0.3em] text-slate-500">
        Dipercaya oleh Mitra Kami
      </p>

      <div className="marquee-mask relative overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-16">
          {track.map((logo, i) =>
            logo.src ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={`${logo.name}-${i}`}
                src={logo.src}
                alt={logo.name}
                className="h-12 w-auto shrink-0 object-contain opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
              />
            ) : (
              <span
                key={`${logo.name}-${i}`}
                className="whitespace-nowrap font-serif text-xl italic tracking-wide text-slate-400 transition-colors hover:text-amber-600"
              >
                {logo.name}
              </span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
