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
      },
      colors: {
        // Blok welcome baru telah ditambahkan di sini
        welcome: {
          bg: '#F8FAFC',       // Contoh warna latar belakang (slate-50)
          card: '#FFFFFF',     // Contoh warna kartu (white)
          primary: '#3B82F6',  // Contoh warna utama (blue-500)
          secondary: '#64748B',// Contoh warna sekunder (slate-500)
          text: '#0F172A',     // Contoh warna teks (slate-900)
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
