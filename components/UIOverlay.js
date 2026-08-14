'use client';

import { useEffect, useRef } from 'react';

export default function UIOverlay() {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  useEffect(() => {
    const isFinePointer =
      typeof window !== 'undefined' &&
      window.matchMedia('(pointer: fine)').matches;

    if (!isFinePointer) return undefined;

    document.body.classList.add('custom-cursor-active');
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;

    const handleMouseMove = (e) => {
      if (cursor && cursorDot) {
        cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
        cursorDot.style.transform = `translate(${e.clientX - 2}px, ${e.clientY - 2}px)`;
      }
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.transform += ' scale(1.5)';
    };
    const handleMouseLeave = () => {
      if (cursor) cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"]'
    );
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor hidden md:block" />
      <div ref={cursorDotRef} className="custom-cursor-dot hidden md:block" />

      <div className="cinema-bars cinema-bar-top safe-top" />
      <div className="cinema-bars cinema-bar-bottom safe-bottom" />
      <div className="vignette-overlay" />

      <div className="fixed bottom-[calc(4vh+3vh)] left-4 sm:left-8 z-30 safe-bottom">
        <div className="flex items-center space-x-3 sm:space-x-4 text-cinematic-cream/60">
          <div className="w-8 sm:w-12 h-[1px] bg-cinematic-amber/50" />
          <span className="font-sans text-[10px] sm:text-xs tracking-widest uppercase">
            Gulir untuk menjelajah
          </span>
        </div>
      </div>
    </>
  );
}
