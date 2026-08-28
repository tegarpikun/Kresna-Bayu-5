'use client';

import Script from 'next/script';

// GANTI 'G-XXXXXXXXXX' dengan Measurement ID asli dari akun Google
// Analytics 4 Anda (analytics.google.com > Admin > Data Streams).
// Kalau belum punya akun GA4, buat dulu di analytics.google.com - gratis.
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX';

export default function GoogleAnalytics() {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    // Belum diisi ID asli - tidak memuat script apa pun supaya tidak error.
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

// Dipanggil dari WhatsAppButton.js dan tombol WA di halaman destinasi
// setiap kali tombol WA diklik, supaya di laporan GA4 Anda bisa lihat
// event "whatsapp_click" - dari halaman mana orang paling sering chat.
export function trackWhatsAppClick(sourcePage) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'whatsapp_click', {
      source_page: sourcePage,
    });
  }
}
