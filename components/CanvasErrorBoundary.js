'use client';

import React from 'react';

export default class CanvasErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    // Kegagalan render 3D (mis. WebGL tidak didukung) dicatat di console,
    // tapi tidak menjatuhkan sisa halaman (teks, tombol WA, dsb tetap jalan).
    // eslint-disable-next-line no-console
    console.error('CinematicCanvas gagal dirender:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-10 bg-cinematic-black" />
      );
    }
    return this.props.children;
  }
}
