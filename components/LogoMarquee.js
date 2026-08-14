'use client';

import { siteConfig } from '@/lib/siteConfig';

// Cara pakai GAMBAR logo sungguhan (bukan teks placeholder):
// 1. Taruh file logo (PNG/SVG, sebaiknya latar transparan) di /public/logos/
// 2. Di lib/siteConfig.js -> partnerLogos, tambahkan field "src", contoh:
//    { name: 'Garuda Partner', src: '/logos/garuda.png' }
// 3. Selesai — item yang punya "src" otomatis dirender sebagai gambar,
//    yang belum punya "src" tetap tampil sebagai teks. Tidak perlu ubah
//    file ini sama sekali.
export default function LogoMarquee() {
  const logos = siteConfig.partnerLogos;
  // Digandakan 2x supaya loop animasi terlihat menyambung tanpa jeda.
  const track = [...logos, ...logos];

  return (
    <div className="border-t border-voyage-gold/10 py-10">
      <p className="mb-8 text-center font-sans text-[10px] uppercase tracking-[0.3em] text-voyage-gold/70">
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
                className="h-8 w-auto shrink-0 object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-90 hover:grayscale-0"
              />
            ) : (
              <span
                key={`${logo.name}-${i}`}
                className="whitespace-nowrap font-serif text-xl italic tracking-wide text-voyage-cream/40 transition-colors hover:text-voyage-gold/80"
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
