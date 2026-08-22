/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // Cuma 2 font dipakai di seluruh situs: Caviar Dreams (judul/
      // display - dipetakan ke class font-serif & font-display) dan
      // Montserrat (teks/label - dipetakan ke class font-sans &
      // font-warm). Dipetakan di sini (bukan ganti className di semua
      // komponen) supaya lebih aman & konsisten.
      fontFamily: {
        serif: ['"Caviar Dreams"', 'cursive'],
        display: ['"Caviar Dreams"', 'cursive'],
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        warm: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      colors: {
        welcome: {
          bg: '#FFFFFF',        // Latar belakang diatur jadi PUTIH
          bgSoft: '#EEF2F7',    // Variasi latar sedikit lebih redup dari bg
          card: '#F8FAFC',      // Kartu diatur agak abu-abu terang (slate-50)
          border: '#E2E8F0',    // Garis pembatas tipis (slate-200)
          primary: '#3B82F6',   // Warna utama (blue-500)
          primaryDeep: '#2563EB', // Biru lebih gelap, dipakai untuk hover
          secondary: '#64748B', // Warna sekunder (slate-500)
          accent: '#F59E0B',    // Aksen kuning keemasan (amber-500)
          text: '#0F172A',      // Teks diatur jadi GELAP/HITAM (slate-900)
          textSoft: '#475569',  // Teks sekunder, sedikit lebih lembut (slate-600)
        },
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
