// Foto memakai file LOKAL di /public/photos (bukan hotlink ke situs luar)
// supaya galeri selalu tampil, tidak bergantung koneksi ke server pihak
// ketiga yang bisa diblokir/gagal saat production.
//
// Ada DUA daftar foto yang TERPISAH dan independen satu sama lain:
//   1. galleryPhotos      -> foto yang melayang di galeri 3D sinematik
//   2. destinationPhotos  -> foto di grid "Destinasi Favorit" (section statis)
// Ganti/isi salah satunya tanpa mempengaruhi yang lain.

// =====================================================================
// 1) GALERI 3D — butuh posisi (x,y,z) & rotasi supaya melayang di ruang.
//
// CARA MENGGANTI:
// 1. Taruh foto lanskap (rasio ~3:2, minimal lebar 1200px) di /public/photos/
// 2. Ganti nilai "url" jadi path foto Anda, mis. '/photos/bali-1.jpg'
// 3. Posisi Z dibuat berjarak rapi mundur ke belakang agar selaras dengan
//    jarak tempuh kamera (lihat CAMERA_START_Z / CAMERA_END_Z di
//    components/CameraRig.js) dan densitas fog di CinematicCanvas.js.
//    Kalau menambah/mengurangi foto, sesuaikan juga rentang kamera supaya
//    foto terakhir tetap terlewati.
// =====================================================================
export const galleryPhotos = [
  {
    id: 1,
    url: '/photos/porta.jpg',
    title: 'Puncak Pegunungan',
    location: 'Dataran Tinggi',
    position: [-3.2, 1.3, -4],
    rotation: [0, 0.12, 0.04],
  },
  {
    id: 2,
    url: '/photos/happy_tos.jpg',
    title: 'Pantai Tropis',
    location: 'Kepulauan Selatan',
    position: [3, -0.6, -8.2],
    rotation: [0, -0.15, -0.03],
  },
  {
    id: 3,
    url: '/photos/yubelium.jpg',
    title: 'Rimba Fajar',
    location: 'Hutan Hujan',
    position: [-2.6, -1.6, -12.4],
    rotation: [0, 0.09, -0.05],
  },
  {
    id: 4,
    url: '/photos/kota-tua.jpg',
    title: 'Lorong Kota Tua',
    location: 'Distrik Bersejarah',
    position: [3.4, 1.1, -16.6],
    rotation: [0, -0.2, 0.06],
  },
  {
    id: 5,
    url: '/photos/danau.jpg',
    title: 'Danau Tenang',
    location: 'Lembah Sunyi',
    position: [-3.6, 0.4, -20.8],
    rotation: [0, 0.12, 0.02],
  },
  {
    id: 6,
    url: '/photos/ombak.jpg',
    title: 'Deburan Ombak',
    location: 'Tepi Samudra',
    position: [2.8, -1.3, -25],
    rotation: [0, -0.07, -0.08],
  },
  {
    id: 7,
    url: '/photos/kabut.jpg',
    title: 'Kabut Pegunungan',
    location: 'Puncak Awan',
    position: [-3, 1.7, -29.2],
    rotation: [0, 0.18, 0.04],
  },
  {
    id: 8,
    url: '/photos/senja.jpg',
    title: 'Cakrawala Senja',
    location: 'Garis Pantai Barat',
    position: [2.2, -0.2, -33.4],
    rotation: [0, -0.09, -0.05],
  },
];

// =====================================================================
// 2) GRID "DESTINASI FAVORIT" — tidak butuh posisi/rotasi, cuma foto biasa.
//
// CARA MENGGANTI: taruh file di /public/photos/, lalu ganti "url" di
// bawah ini. Boleh sebanyak/sesedikit apa pun (grid otomatis menyesuaikan).
// =====================================================================
export const destinationPhotos = [
  {
    id: 'd1',
    url: '/photos/destinations/candi.jpg',
    title: 'Candi Bersejarah',
    location: 'Situs Warisan',
  },
  {
    id: 'd2',
    url: '/photos/destinations/sawah.jpg',
    title: 'Terasering Hijau',
    location: 'Lembah Subur',
  },
  {
    id: 'd3',
    url: '/photos/destinations/air-terjun.jpg',
    title: 'Air Terjun Tersembunyi',
    location: 'Pedalaman Hutan',
  },
  {
    id: 'd4',
    url: '/photos/destinations/gurun.jpg',
    title: 'Bukit Pasir',
    location: 'Dataran Kering',
  },
  {
    id: 'd5',
    url: '/photos/destinations/kepulauan.jpg',
    title: 'Gugusan Pulau',
    location: 'Laut Lepas',
  },
  {
    id: 'd6',
    url: '/photos/destinations/pasar-lokal.jpg',
    title: 'Pasar Tradisional',
    location: 'Jantung Kota',
  },
];
