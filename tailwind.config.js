/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        // Dipakai khusus di bagian "welcoming" (setelah pembuka sinematik) -
        // bagian hero/chapters TETAP pakai Playfair+Inter di atas, tidak
        // disentuh, supaya kesan dramatis pembukanya tidak berubah.
        display: ['Fraunces', '"Playfair Display"', 'serif'],
        warm: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        cinematic: {
          black: '#030305',
          amber: '#D4A574',
          teal: '#2C7A7B',
          gold: '#C9A96E',
          cream: '#F5E6D3',
          whatsapp: '#25D366',
        },
        voyage: {
          navy: '#003049',
          navyDeep: '#001B29',
          gold: '#F77F00',
          goldSoft: '#FCBF49',
          cream: '#EAE2B7',
          red: '#D62828',
        },
        // Palet "welcoming" - dipakai di bagian setelah pembuka sinematik
        // (Destinasi, Kenapa Pilih Kami, Testimoni, Footer). Biru tenang +
        // sedikit hangat, bukan biru cerah/ngejreng, supaya tetap terasa
        // premium tapi tidak menjaga jarak. Ada benang emas tipis
        // (welcome.accent) yang sengaja mendekati voyage.gold supaya
        // transisi dari bagian sinematik terasa menyatu, bukan dua situs
        // berbeda.
        welcome: {
          bg: '#F6FAFD',
          bgSoft: '#EAF3FA',
          card: '#FFFFFF',
          border: '#DCE9F2',
          primary: '#3E7CA6',
          primaryDeep: '#2C5C7D',
          primarySoft: '#6FA3C7',
          accent: '#E0A45C',
          text: '#1E3A4C',
          textSoft: '#4F6B7A',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.9)', opacity: '0.6' },
          '70%': { transform: 'scale(1.6)', opacity: '0' },
          '100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
