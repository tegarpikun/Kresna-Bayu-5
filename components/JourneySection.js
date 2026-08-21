'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { siteConfig, buildWhatsappLink } from '@/lib/siteConfig';
import { destinationPhotos } from '@/lib/photoData';
import SocialIcons from '@/components/SocialIcons';
import LogoMarquee from '@/components/LogoMarquee';
import LottieIcon from '@/components/LottieIcon';
import FlyingPlane from '@/components/FlyingPlane';

// Urut mengikuti journeySection.features di siteConfig.js:
// 1. Rute Kurasi Personal        -> plan.json  (orang merencanakan/lihat HP)
// 2. Pemandu Lokal Berpengalaman -> guide.json (turis dengan kamera)
// 3. Layanan End-to-End          -> route.json (orang jalan-jalan di rute)
const FEATURE_LOTTIES = ['/lottie/plan.json', '/lottie/guide.json', '/lottie/route.json'];

function DestinationCard({ photo, index, onOpen }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-welcome-border bg-welcome-card text-left shadow-sm transition-shadow duration-300 hover:shadow-lg"
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
        <div className="flex h-full w-full items-center justify-center bg-welcome-bgSoft text-welcome-primary/50">
          <span className="font-display italic text-sm">{photo.title}</span>
        </div>
      )}
      {/* Gradasi gelap DI BAWAH SAJA (bukan di seluruh foto) supaya foto
          tetap kelihatan jelas, tapi teks judul di atasnya tetap terbaca. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-display text-lg text-white">{photo.title}</p>
        <p className="font-warm text-[10px] uppercase tracking-[0.2em] text-welcome-accent">
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
      className="fixed inset-0 z-[60] flex items-center justify-center bg-welcome-text/90 px-4 py-10 backdrop-blur-sm"
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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.title}
          className="max-h-[70vh] w-full object-contain"
        />
        <div className="flex items-center justify-between px-1 py-4">
          <div>
            <p className="font-display text-xl text-white">{photo.title}</p>
            <p className="font-warm text-xs uppercase tracking-[0.2em] text-welcome-accent">
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
    <div className="overflow-hidden rounded-xl border border-welcome-border bg-welcome-card">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="font-display text-base text-welcome-text sm:text-lg">
          {item.q}
        </span>
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-welcome-primary/30 font-warm text-welcome-primary transition-transform duration-300 ${
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
          <p className="px-6 pb-6 font-warm text-sm leading-relaxed text-welcome-textSoft">
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
      {/* Transisi halus dari bagian sinematik (gelap) ke bagian welcoming (terang) */}
      <div className="h-24 bg-gradient-to-b from-cinematic-black to-welcome-bg sm:h-32" />

      <div ref={welcomeSectionRef} className="relative overflow-hidden bg-welcome-bg">
        <FlyingPlane containerRef={welcomeSectionRef} />
        {/* Gradasi warna lembut (bukan flat putih polos) - tetap "welcoming"
            & bersih, tapi ada kedalaman warna sampai ke bawah halaman,
            menyambung dari mood sinematik di atasnya. Murni CSS, tidak
            menambah beban loading. */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-32 h-[32rem] w-[32rem] rounded-full bg-welcome-primary/15 blur-3xl" />
          <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-welcome-accent/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-welcome-primary/10 blur-3xl" />
        </div>

        {/* ===== Tentang / Kenapa memilih kami ===== */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
          <p className="mb-4 text-center font-warm text-xs font-semibold uppercase tracking-[0.3em] text-welcome-primary sm:text-left">
            {journeySection.eyebrow}
          </p>
          <h2 className="animate-on-scroll mb-6 text-center font-display text-[clamp(1.8rem,5vw,3.2rem)] font-semibold leading-tight text-welcome-text sm:text-left">
            {journeySection.title}
          </h2>
          <p className="mx-auto max-w-2xl text-center font-warm text-sm leading-relaxed text-welcome-textSoft sm:mx-0 sm:text-left sm:text-base">
            {journeySection.body}
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {journeySection.features.map((feature, index) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-welcome-border bg-welcome-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <LottieIcon
                  src={FEATURE_LOTTIES[index % FEATURE_LOTTIES.length]}
                  className="lottie-wiggle mx-auto mb-3 h-44 w-44 sm:h-48 sm:w-48"
                />
                <div className="mb-4 h-[2px] w-10 bg-welcome-primary" />
                <h3 className="mb-2 font-display text-lg text-welcome-text">
                  {feature.title}
                </h3>
                <p className="font-warm text-sm leading-relaxed text-welcome-textSoft">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ===== Destinasi (galeri dengan lightbox + counter) ===== */}
        <section className="mx-auto max-w-6xl px-6 pb-16 sm:pb-24">
          <h2 className="mb-10 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] text-welcome-text">
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
          <p className="mt-4 text-center font-warm text-xs text-welcome-textSoft">
            Klik foto untuk melihat lebih besar
          </p>
        </section>

        {/* ===== FAQ ===== */}
        <section className="border-t border-welcome-border bg-welcome-bgSoft">
          <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
            <h2 className="mb-10 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] text-welcome-text">
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

        {/* ===== Testimoni ===== */}
        <section className="border-t border-welcome-border">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
            <h2 className="mb-12 text-center font-display text-[clamp(1.6rem,4.5vw,2.6rem)] text-welcome-text">
              {journeySection.testimonialsTitle}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {journeySection.testimonials.map((t) => (
                <div
                  key={t.name}
                  className="rounded-xl border border-welcome-border bg-welcome-card p-8 shadow-sm"
                >
                  <p className="mb-2 font-display text-4xl leading-none text-welcome-accent">
                    &ldquo;
                  </p>
                  <p className="mb-6 font-display italic text-lg leading-relaxed text-welcome-text">
                    {t.quote}
                  </p>
                  <p className="font-warm text-sm font-semibold text-welcome-primary">
                    {t.name}
                  </p>
                  <p className="font-warm text-xs uppercase tracking-[0.15em] text-welcome-textSoft">
                    {t.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <LogoMarquee />
        </section>

        <footer className="border-t border-welcome-border bg-welcome-bgSoft">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
              <div className="text-center sm:text-left">
                <p className="font-display text-2xl text-welcome-text">
                  {siteConfig.brandName}
                </p>
                <p className="mt-2 max-w-xs font-warm text-sm text-welcome-textSoft">
                  {siteConfig.tagline}
                </p>
              </div>

              <div className="text-center sm:text-right">
                <p className="mb-3 font-warm text-xs font-semibold uppercase tracking-[0.2em] text-welcome-primary">
                  Hubungi Kami
                </p>
                <a
                  href={buildWhatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-welcome-primary px-6 py-2.5 font-warm text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-welcome-primaryDeep"
                >
                  Chat via WhatsApp
                </a>

                <SocialIcons className="mt-5 justify-center sm:justify-end" />
              </div>
            </div>

            <div className="mt-12 border-t border-welcome-border pt-6 text-center">
              <p className="font-warm text-xs text-welcome-textSoft">
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
