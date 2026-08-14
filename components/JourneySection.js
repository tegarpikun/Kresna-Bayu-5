'use client';

import { useState } from 'react';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';
import { destinationPhotos } from '@/lib/photoData';
import SocialIcons from '@/components/SocialIcons';
import LogoMarquee from '@/components/LogoMarquee';

function DestinationCard({ photo }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-md border border-voyage-gold/15">
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photo.url}
          alt={photo.title}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-voyage-navyDeep text-voyage-gold/40">
          <span className="font-serif italic text-sm">{photo.title}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-voyage-navyDeep/90 via-voyage-navyDeep/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-serif text-lg text-voyage-cream">{photo.title}</p>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-voyage-gold/80">
          {photo.location}
        </p>
      </div>
    </div>
  );
}

export default function JourneySection() {
  const { journeySection } = siteConfig;

  return (
    <div className="relative z-20 bg-gradient-to-b from-cinematic-black via-voyage-navyDeep to-voyage-navy">
      {/* ===== Tentang / Kenapa memilih kami ===== */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <p className="mb-4 text-center font-sans text-xs uppercase tracking-[0.3em] text-voyage-gold sm:text-left">
          {journeySection.eyebrow}
        </p>
        <h2 className="animate-on-scroll shimmer-text mb-6 text-center font-serif text-[clamp(1.8rem,5vw,3.2rem)] font-semibold leading-tight sm:text-left">
          {journeySection.title}
        </h2>
        <p className="mx-auto max-w-2xl text-center font-sans text-sm leading-relaxed text-voyage-cream/70 sm:mx-0 sm:text-left sm:text-base">
          {journeySection.body}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {journeySection.features.map((feature, index) => (
            <div
              key={feature.title}
              className="rounded-md border border-voyage-gold/15 bg-white/[0.02] p-6 backdrop-blur-sm"
            >
              <p className="mb-3 font-serif text-sm text-voyage-red">
                {String(index + 1).padStart(2, '0')}
              </p>
              <div className="mb-4 h-[2px] w-10 bg-voyage-gold" />
              <h3 className="mb-2 font-serif text-lg text-voyage-cream">
                {feature.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-voyage-cream/60">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Destinasi ===== */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:pb-28">
        <h2 className="mb-10 text-center font-serif text-[clamp(1.6rem,4.5vw,2.6rem)] text-voyage-cream">
          {journeySection.destinationsTitle}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {destinationPhotos.map((photo) => (
            <DestinationCard key={photo.id} photo={photo} />
          ))}
        </div>
      </section>

      {/* ===== Testimoni ===== */}
      <section className="border-t border-voyage-gold/10 bg-voyage-navyDeep/40">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <h2 className="mb-12 text-center font-serif text-[clamp(1.6rem,4.5vw,2.6rem)] text-voyage-cream">
            {journeySection.testimonialsTitle}
          </h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {journeySection.testimonials.map((t) => (
              <div
                key={t.name}
                className="rounded-md border border-voyage-gold/15 bg-white/[0.02] p-8"
              >
                <p className="mb-2 font-serif text-4xl leading-none text-voyage-red">
                  &ldquo;
                </p>
                <p className="mb-6 font-serif italic text-lg leading-relaxed text-voyage-cream/90">
                  {t.quote}
                </p>
                <p className="font-sans text-sm text-voyage-gold">{t.name}</p>
                <p className="font-sans text-xs uppercase tracking-[0.15em] text-voyage-cream/50">
                  {t.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        <LogoMarquee />
      </section>
      <footer className="border-t border-voyage-gold/10">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-center sm:text-left">
              <p className="font-serif text-2xl text-voyage-cream">
                {siteConfig.brandName}
              </p>
              <p className="mt-2 max-w-xs font-sans text-sm text-voyage-cream/50">
                {siteConfig.tagline}
              </p>
            </div>

            <div className="text-center sm:text-right">
              <p className="mb-3 font-sans text-xs uppercase tracking-[0.2em] text-voyage-gold">
                Hubungi Kami
              </p>
              <a
                href={buildWhatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-sm border border-voyage-gold/40 px-5 py-2.5 font-sans text-xs uppercase tracking-[0.15em] text-voyage-cream transition-colors hover:bg-voyage-gold hover:text-voyage-navyDeep"
              >
                Chat via WhatsApp
              </a>

              <SocialIcons className="mt-5 justify-center sm:justify-end" />
            </div>
          </div>

          <div className="mt-12 border-t border-voyage-gold/10 pt-6 text-center">
            <p className="font-sans text-xs text-voyage-cream/40">
              &copy; {new Date().getFullYear()} {siteConfig.brandName}. Semua
              hak cipta dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
