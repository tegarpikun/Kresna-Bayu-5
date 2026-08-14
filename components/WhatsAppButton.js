'use client';

import { buildWhatsappLink } from '@/lib/siteConfig';

export default function WhatsAppButton() {
  return (
    <a
      href={buildWhatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat via WhatsApp"
      className="fixed z-[110] bottom-[calc(4vh+16px)] right-4 sm:right-6 safe-bottom flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-cinematic-whatsapp shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform hover:scale-105 active:scale-95"
    >
      <span className="absolute inline-flex h-full w-full rounded-full bg-cinematic-whatsapp animate-pulse-ring" />
      <svg
        viewBox="0 0 32 32"
        className="relative h-6 w-6 sm:h-7 sm:w-7 fill-white"
        aria-hidden="true"
      >
        <path d="M16.004 3C9.377 3 4 8.373 4 15c0 2.386.71 4.607 1.93 6.463L4 29l7.71-1.9A11.93 11.93 0 0 0 16.004 27C22.63 27 28 21.627 28 15S22.63 3 16.004 3Zm0 21.7c-1.92 0-3.71-.55-5.22-1.5l-.375-.223-4.57 1.127 1.156-4.454-.246-.386A9.63 9.63 0 0 1 5.36 15c0-5.32 4.325-9.65 9.644-9.65 5.32 0 9.645 4.33 9.645 9.65 0 5.32-4.325 9.7-9.645 9.7Zm5.29-7.24c-.29-.146-1.71-.844-1.976-.94-.265-.098-.458-.146-.65.146-.194.29-.747.94-.916 1.133-.168.194-.337.218-.626.073-.29-.146-1.223-.451-2.33-1.44-.86-.767-1.442-1.715-1.61-2.005-.169-.29-.018-.447.127-.592.13-.13.29-.338.435-.507.145-.169.193-.29.29-.483.097-.194.048-.363-.024-.508-.073-.146-.65-1.566-.892-2.146-.235-.564-.474-.487-.65-.496l-.554-.01c-.194 0-.508.073-.774.363-.265.29-1.014.99-1.014 2.415s1.038 2.803 1.183 2.997c.145.194 2.043 3.117 4.95 4.372.692.299 1.232.478 1.653.611.694.221 1.326.19 1.826.115.557-.083 1.71-.699 1.951-1.374.242-.676.242-1.255.169-1.374-.072-.12-.265-.194-.556-.339Z" />
      </svg>
    </a>
  );
}
