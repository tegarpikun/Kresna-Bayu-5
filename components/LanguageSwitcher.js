'use client';

import { useEffect, useRef, useState } from 'react';

// Shortcut sederhana ke Google Translate - BUKAN terjemahan manual buatan
// sendiri. Widget resmi Google Translate dimuat tersembunyi di background;
// tombol bendera ini cuma "remote control" kecil buat memilih bahasanya.
// Kualitas terjemahan mengikuti Google Translate apa adanya.
const LANGUAGES = [
  { code: 'id', label: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'ar', label: 'العربية', flag: '🇸🇦' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺' },
  { code: 'ja', label: '日本語', flag: '🇯🇵' },
  { code: 'zh-CN', label: '中文', flag: '🇨🇳' },
  { code: 'ko', label: '한국어', flag: '🇰🇷' },
];

let scriptLoading = false;

function loadGoogleTranslate() {
  if (typeof window === 'undefined') return;
  if (window.google?.translate || scriptLoading) return;
  scriptLoading = true;

  window.googleTranslateElementInit = function initGoogleTranslate() {
    // eslint-disable-next-line no-new
    new window.google.translate.TranslateElement(
      { pageLanguage: 'id', autoDisplay: false },
      'google_translate_element'
    );
  };

  const script = document.createElement('script');
  script.src =
    '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
  script.async = true;
  document.body.appendChild(script);
}

function setLanguage(code) {
  loadGoogleTranslate();

  const applyOnCombo = () => {
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
      combo.value = code;
      combo.dispatchEvent(new Event('change'));
      return true;
    }
    return false;
  };

  if (applyOnCombo()) return;

  // Widget-nya baru async dimuat - coba lagi tiap 300ms sampai 5 detik.
  let attempts = 0;
  const interval = setInterval(() => {
    attempts += 1;
    if (applyOnCombo() || attempts > 16) clearInterval(interval);
  }, 300);
}

export default function LanguageSwitcher({ variant = 'dark' }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(LANGUAGES[0]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    loadGoogleTranslate();
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isLight = variant === 'light';

  return (
    <div ref={wrapperRef} className="relative">
      {/* Widget resmi Google Translate - disembunyikan, kita cuma pakai
          mesinnya lewat tombol sendiri di bawah. */}
      <div id="google_translate_element" className="hidden" />

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Pilih bahasa"
        className={`flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border backdrop-blur-sm transition-colors sm:h-10 sm:w-10 ${
          isLight
            ? 'border-welcome-primary/30 bg-white/70 hover:border-welcome-primary'
            : 'border-cinematic-cream/30 bg-cinematic-black/30 hover:border-cinematic-amber'
        }`}
      >
        {/* Bendera bulat (emoji bendera di-crop lingkaran via overflow-hidden
            + sedikit di-scale) - bukan icon globe generik. */}
        <span className="flex h-full w-full scale-[1.35] items-center justify-center text-[19px] leading-none">
          {current.flag}
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 top-11 z-50 max-h-80 w-48 overflow-y-auto rounded-lg border py-2 shadow-xl backdrop-blur-md ${
            isLight
              ? 'border-welcome-border bg-white/95'
              : 'border-cinematic-cream/15 bg-cinematic-black/95'
          }`}
        >
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => {
                setLanguage(lang.code);
                setCurrent(lang);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2 text-left font-sans text-sm transition-colors ${
                isLight
                  ? 'text-welcome-text hover:bg-welcome-bgSoft'
                  : 'text-cinematic-cream/90 hover:bg-cinematic-cream/10'
              }`}
            >
              <span className="text-base leading-none">{lang.flag}</span>
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
