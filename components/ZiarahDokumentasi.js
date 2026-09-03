// components/ZiarahDokumentasi.js
//
// Section "bukti jalan" — dokumentasi rombongan ziarah yang PERNAH
// diberangkatkan Kresna Bayu Tour. Ini bukan foto 7 destinasi di
// ziarahData.js (Puhsarang/Sendangsono/dst) — itu tempat berbeda dan
// heroImage-nya masih perlu foto asli masing-masing lokasi.
//
// Section ini murni testimoni/track-record: rombongan WKRI (Wanita
// Katolik Republik Indonesia) yang nyata pernah ikut, lengkap tanggal
// keberangkatan — sinyal kepercayaan yang kuat untuk calon pelanggan
// komunitas paroki.
//
// Taruh 5 file foto dari /public/photos/ziarah-dokumentasi/ (sudah
// dikompres, total ~1.4MB) lalu import section ini di
// app/ziarah-katolik/page.js, panggil <ZiarahDokumentasi /> setelah
// section "Destinasi Ziarah".

const dokumentasi = [
  {
    src: '/photos/ziarah-dokumentasi/ziarek-banyuwangi-bali-2022-gereja.jpg',
    alt: 'Rombongan Wanita Katolik Republik Indonesia DPD Kalimantan Selatan di depan gereja saat Ziarah dan Rekreasi Banyuwangi-Bali',
    caption: 'Ziarek Banyuwangi–Bali · WKRI DPD Kalimantan Selatan',
    date: '19–23 Oktober 2022',
  },
  {
    src: '/photos/ziarah-dokumentasi/ziarah-goa-maria-bengkulu-2023-patung-maria.jpg',
    alt: 'Rombongan ziarah di depan patung Bunda Maria pada Ziarah Goa Maria Jakarta-Jateng WKRI Bengkulu',
    caption: 'Ziarah Goa Maria Jakarta–Jateng · WKRI Bengkulu',
    date: '24–28 Oktober 2023',
  },
  {
    src: '/photos/ziarah-dokumentasi/ziarah-goa-maria-tritis-bulu-2023.jpg',
    alt: 'Peziarah berdoa di depan patung Bunda Maria di Gua Maria Tritis, Alas Gegiri, Bulu',
    caption: 'Gua Maria Tritis "Maria Perantara Wahyu", Alas Gegiri, Bulu',
    date: 'Oktober 2023',
  },
  {
    src: '/photos/ziarah-dokumentasi/ziarah-goa-maria-bengkulu-2023-rombongan.jpg',
    alt: 'Rombongan peziarah duduk bersama di dalam gua saat Ziarah Goa Maria WKRI Bengkulu',
    caption: 'Doa bersama di dalam gua ziarah',
    date: '24–28 Oktober 2023',
  },
  {
    src: '/photos/ziarah-dokumentasi/ziarah-goa-maria-2023-rombongan-2.jpg',
    alt: 'Rombongan peziarah berfoto bersama di dalam gua alami pada Ziarah Goa Maria WKRI Bengkulu',
    caption: 'Rombongan di dalam gua ziarah alami',
    date: '24–28 Oktober 2023',
  },
];

export default function ZiarahDokumentasi() {
  return (
    <section className="mb-10">
      <h2 className="text-2xl font-semibold mb-2">
        Dokumentasi Rombongan Ziarah Kami
      </h2>
      <p className="text-white/70 mb-6">
        Sebagian perjalanan ziarah rombongan yang sudah kami berangkatkan,
        termasuk bersama Wanita Katolik Republik Indonesia (WKRI).
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {dokumentasi.map((foto) => (
          <figure
            key={foto.src}
            className="border border-white/10 rounded-xl overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={foto.src}
              alt={foto.alt}
              loading="lazy"
              className="w-full h-48 object-cover"
            />
            <figcaption className="p-3 text-sm">
              <p className="text-white/90">{foto.caption}</p>
              <p className="text-white/50">{foto.date}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
