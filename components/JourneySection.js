'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';
import { destinationPhotos } from '@/lib/photoData';
import SocialIcons from '@/components/SocialIcons';
import LogoMarquee from '@/components/LogoMarquee';
import LottieIcon from '@/components/LottieIcon';
import FlyingPlane from '@/components/FlyingPlane';

const FEATURE_LOTTIES = ['/lottie/plan.json', '/lottie/guide.json', '/lottie/route.json'];

function DestinationCard({ photo, index, onOpen }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 text-left transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
    >
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
        <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-400">
          <span className="font-display italic text-sm">{photo.title}</span>
        </div>
      )}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-lg text-white">{photo.title}</p>
        <p className="font-warm text-[10px] uppercase tracking-[0.2em] text-amber-400">
          {photo.location}
        </p>
      </div>
    </button>
  );
}

function DestinationLightbox({ index, onClose, onNavigate }) {
  const photo = destinationPhotos[index];

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(1);
      if (e.key === 'ArrowLeft') onNavigate(-1);
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose, onNavigate]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-cinematic-black/90 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Tutup"
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 font-warm text-lg text-white transition-colors hover:bg-white/10"
      >
        &times;
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(-1);
        }}
        aria-label="Sebelumnya"
        className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 sm:left-6"
      >
        &#8592;
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(1);
        }}
        aria-label="Selanjutnya"
        className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10 sm:right-6"
      >
        &#8594;
      </button>

      <div
        className="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={photo.url}
          alt={photo.title}
          className="max-h-[70vh] w-full object-contain"
        />
        <div className="flex items-center justify-between px-1 py-4">
          <div>
            <p className="font-display text-xl text-white">{photo.title}</p>
            <p className="font-warm text-xs uppercase tracking-[0.2em] text-amber-400">
              {photo.location}
            </p>
          </div>
          <p className="font-warm text-sm text-white/60">
            {index + 1} / {destinationPhotos.length}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ item, isOpen, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-50 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base text-slate-900 sm:text-lg">
          {item.q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 border-amber-600/40 font-warm text-amber-600 transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 font-warm text-sm leading-relaxed text-slate-600">
            {item.a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function JourneySection() {
  const { journeySection } = siteConfig;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);
  const welcomeSectionRef = useRef(null);

  const handleNavigate = useCallback((delta) => {
    setLightboxIndex((current) => {
      if (current === null) return current;
      const total = destinationPhotos.length;
      return (current + delta + total) % total;
    });
  }, []);

  return (
    <div className="relative z-20">
      <div
        ref={welcomeSectionRef}
        className="relative overflow-hidden bg-white"
      >
        <FlyingPlane
          containerRef={welcomeSectionRef}
          zigzags={6}
          yStart={6}
          yEnd={74}
        />
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-32 h-[32rem] w-[32rem] rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-teal-200/40 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        {/* ===== Tentang / Kenapa memilih kami ===== */}
        <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="mb-4 text-center font-warm text-sm sm:text-base font-semibold uppercase tracking-[0.3em] text-amber-600">
            {journeySection.eyebrow}
          </p>
          <h2 className="animate-on-scroll mb-6 text-center font-display text-[clamp(1.8rem,5vw,3.2rem)] font-bold leading-tight text-slate-900">
            {journeySection.title}
          </h2>
          <p className="mx-auto max-w-2xl text-center font-warm text-sm font-medium leading-relaxed text-slate-600 sm:text-base">
            {journeySection.body}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {journeySection.features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass-card-light group p-6 transition-all duration-300 hover:border-amber-500/50 hover:shadow-[0_10px_25px_rgba(0,0,0,0.15)]"
              >
                <LottieIcon
                  src={FEATURE_LOTTIES[index % FEATURE_LOTTIES.length]}
                  className="lottie-wiggle mx-auto mb-3 h-44 w-44 sm:h-48 sm:w-48"
                />
                <div className="mb-4 h-[2px] w-10 bg-amber-600" />
                <h3 className="mb-2 font-display text-lg text-slate-900">
                  {feature.title}
                </h3>
                <p className="font-warm text-sm font-medium leading-relaxed text-slate-600">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Destinasi ===== */}
        <section id="services" className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
          <h2 className="mb-10 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold text-slate-900">
            {journeySection.destinationsTitle}
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
            {destinationPhotos.map((photo, index) => (
              <DestinationCard
                key={photo.id}
                photo={photo}
                index={index}
                onOpen={setLightboxIndex}
              />
            ))}
          </div>
          <p className="mt-4 text-center font-warm text-xs font-medium text-slate-500">
            Klik foto untuk melihat lebih besar
          </p>
        </section>

        {/* ===== FAQ ===== */}
        <section className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
            <h2 className="mb-10 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold text-slate-900">
              {journeySection.faqTitle}
            </h2>
            <div className="flex flex-col gap-4">
              {journeySection.faq.map((item, index) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  isOpen={openFaq === index}
                  onToggle={() =>
                    setOpenFaq((current) => (current === index ? -1 : index))
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* ===== Testimoni (Kata Mereka) - Diberi Frame Tebal ===== */}
        <section className="border-t border-slate-200">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <h2 className="mb-12 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] font-bold text-slate-900">
              {journeySection.testimonialsTitle}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {journeySection.testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border-2 border-slate-300 bg-slate-50 p-8 shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                >
                  <p className="mb-2 font-display text-4xl leading-none text-amber-600">
                    &ldquo;
                  </p>
                  <p className="mb-6 font-display italic text-lg leading-relaxed text-slate-900">
                    {t.quote}
                  </p>
                  <p className="font-warm text-sm font-semibold text-amber-600">
                    {t.name}
                  </p>
                  <p className="font-warm text-xs uppercase tracking-[0.15em] font-medium text-slate-500">
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <LogoMarquee />
        </section>

        {/* TAMBAHKAN ID="contact" DI SINI */}
        <footer id="contact" className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="font-display text-2xl text-slate-900">
                  {siteConfig.brandName}
                </p>
                <p className="mt-2 max-w-xs font-warm text-sm font-medium text-slate-600">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="text-center sm:text-right">
                <p className="mb-3 font-warm text-xs font-bold uppercase tracking-[0.2em] text-amber-700">
                  Alamat Kami
                </p>
                {/* Warinoi Timur: diubah menjadi Montserrat Bold (font-bold) */}
                <a
                  href={buildWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-sans text-sm font-bold normal-case text-slate-800 underline-offset-4 transition-colors hover:text-amber-600 hover:underline"
                >
                  Warinoi Timur V no.17, Kota Malang
                </a>

                <SocialIcons className="mt-5 justify-center sm:justify-end" />
              </div>
            </div>

            <div className="mt-12 border-t border-slate-200 pt-6 text-center">
              <p className="font-warm text-xs font-medium text-slate-500">
                &copy; {new Date().getFullYear()} {siteConfig.brandName}. Semua
                hak cipta dilindungi.
              </p>
            </div>
          </div>
        </footer>
      </div>

      {lightboxIndex !== null && (
        <DestinationLightbox
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
