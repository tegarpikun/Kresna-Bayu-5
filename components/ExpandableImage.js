'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ExpandableImage({ src, alt, className }) {
  const [open, setOpen] = useState(false);

  return (
    <>
       <div
        className={`relative w-full h-full cursor-zoom-in ${className || ''}`}
        onClick={() => setOpen(true)}
      >
        <Image src={src} alt={alt} fill className="object-cover" />
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} className="max-w-full max-h-full object-contain rounded-lg" />
        </div>
      )}
    </>
  );
}
