# Kresna Bayu Tour — Cinematic Tour & Travel

Website portofolio tour & travel bergaya "Cinematic Gallery Scatter":
kamera 3D menembus galeri foto destinasi sambil pengguna scroll, dibungkus
CinemaScope bar, vignette, dan kartu glassmorphic. Dibangun dengan
Next.js App Router, React Three Fiber, drei, GSAP ScrollTrigger, dan
Tailwind CSS.

## 1. Yang perlu diganti sebelum deploy

Buka **`lib/siteConfig.js`** — semua teks brand, tagline, dan terutama:

```js
whatsappNumber: '6281234567890', // ganti dengan nomor WA bisnis Anda
```

Format nomor WA **wajib internasional tanpa tanda "+"** (contoh nomor
`0812-3456-7890` ditulis `6281234567890`).

Ganti juga foto di **`lib/photoData.js`** bila ingin memakai foto destinasi
sendiri (bisa pakai URL Unsplash lain, atau upload ke `/public` dan
gunakan path lokal seperti `/foto-saya.jpg`).

## 2. Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## 3. Deploy ke Vercel

1. Push folder ini ke repository GitHub baru (jangan sertakan `node_modules`
   atau `.next` — sudah diatur otomatis lewat `.gitignore`).
2. Buka [vercel.com/new](https://vercel.com/new), import repo tersebut.
3. Framework preset otomatis terdeteksi sebagai **Next.js** — tidak perlu
   ubah setting apa pun. Klik **Deploy**.

Tidak ada environment variable yang dibutuhkan.

## 4. Struktur proyek

```
app/
  layout.js        -> metadata & font
  page.js           -> halaman utama, merangkai semua komponen
  globals.css       -> style global, cinema bars, vignette, glass card
components/
  CinematicCanvas.js -> kanvas R3F: cahaya, foto, debu, kamera
  CameraRig.js        -> kamera scroll-driven + parallax mouse (satu sumber kebenaran)
  CinematicLighting.js-> skema cahaya teal & orange
  PhotoScatter.js      -> render foto-foto yang tersebar di ruang 3D
  DustParticles.js     -> partikel debu emas melayang
  UIOverlay.js          -> cinema bars, vignette, hero glass card, kursor custom
  EndingSequence.js     -> CTA penutup + transisi fade-to-black + kredit
  WhatsAppButton.js     -> tombol WA mengambang, selalu terlihat
lib/
  siteConfig.js  -> SEMUA pengaturan brand & nomor WA ada di sini
  photoData.js   -> daftar foto destinasi & posisinya di ruang 3D
```

## 5. Catatan performa & kompatibilitas perangkat

- Jumlah partikel debu otomatis dikurangi di layar < 768px agar tetap
  ringan di HP.
- Kursor custom (lingkaran mengikuti mouse) hanya aktif di perangkat
  dengan mouse presisi (`pointer: fine`) — di HP/tablet kursor bawaan
  browser tetap dipakai, sehingga tap/scroll tidak terganggu.
- Semua ukuran teks memakai `clamp()` supaya menyesuaikan lebar layar
  tanpa merusak layout, dari HP kecil sampai layar ultra-wide.
- CinemaScope bar & tombol WA menghormati *safe area* iPhone (notch /
  home indicator) lewat `env(safe-area-inset-*)`.
## 6. Bagian statis "Journey" (biru & emas)

Setelah babak penutup sinematik, halaman otomatis lanjut ke bagian statis
bertema biru elegan & emas (`components/JourneySection.js`) berisi:
alasan memilih brand, grid destinasi, testimoni, sampai footer — tanpa
header, karena memang didesain menyatu langsung dari pengalaman scroll di
atasnya. Kanvas 3D otomatis berhenti/lepas begitu bagian ini terlihat, agar
tidak membebani performa. Semua teksnya bisa diedit di
`lib/siteConfig.js` → `journeySection`.

Judul utama di bagian ini memakai efek kilau emas (`shimmer-text` di
`app/globals.css`) yang menyapu teks saat elemen masuk ke layar.

## 7. Cara mengganti warna latar & menambah foto ke galeri 3D

**Ganti warna latar/kabut awal:**
Buka `components/CinematicCanvas.js`, cari dua baris ini dan ganti kode
warnanya (format hex):
```js
<color attach="background" args={['#030305']} />
<fogExp2 attach="fog" color="#030305" density={0.045} />
```
Kalau warna latar diganti terlalu terang, turunkan juga `density` fog
supaya foto di kejauhan tidak "ketutup" kabut terlalu cepat.

**Menambah/mengganti foto pada galeri 3D:**
1. Taruh file foto baru di `/public/photos/nama-file.jpg`.
2. Buka `lib/photoData.js`, tambahkan object baru ke array, misalnya:
```js
{
  id: 9,
  url: '/photos/nama-file.jpg',
  title: 'Judul Foto',
  location: 'Lokasi',
  position: [-3, 0.5, -37.6], // x, y, z (z makin negatif = makin jauh)
  rotation: [0, 0.1, 0.03],
},
```
3. Kalau menambah foto lebih jauh dari foto terakhir sebelumnya, buka
   `components/CameraRig.js` dan perbesar jarak `CAMERA_END_Z` (nilai
   negatif) supaya kamera tetap "menembus" sampai foto paling belakang.

Foto yang sama juga otomatis muncul di grid "Destinasi Favorit" pada
bagian statis biru-emas, karena keduanya membaca dari file
`lib/photoData.js` yang sama.

## 8. Mengganti background video di babak sinematik

Background hitam di belakang galeri 3D sekarang sebenarnya sudah berupa
video looping (`components/VideoBackground.js`), bukan warna solid lagi —
saat ini masih video placeholder gradasi ambient yang saya buat sendiri
(`public/video/hero-bg.mp4`).

**Cara ganti dengan video Anda sendiri:**
1. Siapkan video Anda — sebaiknya **berdurasi pendek (5–15 detik), landscape,
   sudah di-loop mulus (frame awal & akhir mirip), dan dikompres kecil**
   (idealnya di bawah 5–8 MB) supaya tidak memberatkan loading halaman.
2. Ganti file `public/video/hero-bg.mp4` dengan video Anda (nama file boleh
   beda, tinggal sesuaikan prop `src` di `<VideoBackground />` pada
   `app/page.js`).
3. Opsional: buat juga gambar poster (frame pertama video) sebagai
   `public/video/hero-bg-poster.jpg` — ini yang tampil sekilas sebelum video
   selesai dimuat.
4. Video otomatis diputar muted + loop di belakang galeri foto 3D & partikel
   debu, dengan tint gelap di atasnya supaya teks tetap terbaca. Atur
   kegelapan tint di `components/VideoBackground.js` (class
   `bg-cinematic-black/40` — makin besar angkanya, makin gelap).

Video ini otomatis berhenti diputar begitu pengguna scroll masuk ke bagian
statis biru-emas (sama seperti kanvas 3D), supaya hemat resource.

