# Undangan Akad Nikah & Resepsi - Butter Yellow

Project ini dibuat agar data undangan bisa diubah lewat folder `config/`, tanpa perlu mengedit `index.html`.

## Cara menjalankan

Buka `index.html` langsung di browser, atau upload semua folder ke GitHub Pages / Netlify / Vercel.

## Data utama yang bisa diubah

- `config/couple.config.js` untuk data mempelai.
- `config/event.config.js` untuk tanggal, akad, resepsi, dan countdown.
- `config/color.config.js` untuk warna butter yellow dan warna turunan.
- `config/location.config.js` untuk lokasi, Google Maps, dan embed map.
- `config/media.config.js` untuk foto cover, background, dan galeri.
- `config/video.config.js` untuk video.
- `config/audio.config.js` untuk musik/audio.
- `config/google-sheet.config.js` untuk koneksi Google Sheet.
- `config/rsvp.config.js` untuk konfirmasi kehadiran.
- `config/wishes.config.js` untuk ucapan/doa.
- `config/gift.config.js` untuk amplop digital.
- `config/section.config.js` untuk aktif/nonaktif section.

## Nama tamu dari URL

Contoh:

```text
index.html?to=Abdul_Hafiz
```

Untuk dua baris:

```text
index.html?to=Abdul_Hafiz|Dinas_Kesehatan
```

## Google Sheet

1. Buat Google Spreadsheet.
2. Buat Apps Script.
3. Paste kode dari `google-apps-script/Code.gs`.
4. Deploy sebagai Web App.
5. Copy URL deployment ke `config/google-sheet.config.js`.
6. Ubah `enabled: false` menjadi `enabled: true`.

## Catatan

Semua fitur yang bisa dimatikan sudah menggunakan pola:

```js
enabled: true
```

atau

```js
enabled: false
```

## Signature Love Animation

Pengaturan animasi tanda tangan/love ada di:

```text
config/signature.config.js
```

Fitur ini bisa dipakai untuk:
- Hero/pembuka
- Semua judul section
- Closing/penutup

Untuk mematikan:

```js
enabled: false
```

## Backdrop / Glass Intensity

Pengaturan glassmorphism untuk nav, card, form, dan cover ada di:

```text
config/backdrop.config.js
```

Contoh pengaturan:

```js
card: {
  enabled: true,
  blur: "24px",
  opacity: 0.68,
  borderOpacity: 0.28,
  shadowIntensity: 0.16
}
```


### Mode animasi judul section

Di `config/signature.config.js`, bagian `sectionTitle.mode` bisa diubah:

```js
mode: "underline-only"
```

Hanya animasi garis love di bawah judul.

```js
mode: "text-only"
```

Teks judul section menjadi animasi signature.

```js
mode: "text-and-line"
```

Teks judul section menjadi animasi signature dan tetap ada garis love di bawahnya.
```


### Nama mempelai hero hanya muncul satu kali

Di `config/signature.config.js`, bagian ini membuat nama mempelai utama diganti menjadi animasi signature:

```js
heroSignature: {
  enabled: true,
  replaceHeroNames: true
}
```

Warna stroke dan fill signature mengikuti warna border:

```js
style: {
  strokeColor: "use-border-color",
  fillColor: "use-border-color"
}
```


### Jika fillColor signature tidak berubah

Pastikan mengubah file:

```text
config/signature.config.js
```

Bagian:

```js
style: {
  strokeColor: "#D8A928",
  fillColor: "#D8A928"
}
```

Jika browser masih menampilkan warna lama, lakukan hard refresh:

```text
Ctrl + F5
```

atau bersihkan cache browser.


### V6: Perbaikan warna signature

Mulai versi ini, warna signature memakai class SVG khusus:

```css
.signature-stroke-text
.signature-fill-text
.signature-love-path
```

Jadi pengaturan berikut di `config/signature.config.js` akan langsung berpengaruh:

```js
style: {
  strokeColor: "#D8A928",
  fillColor: "#D8A928",
  fillOpacity: 1
}
```

Jika masih tidak berubah, pastikan file `css/signature.css` dan `js/signature.js` yang dipakai adalah dari versi v6, lalu lakukan hard refresh `Ctrl + F5`.


### V7: Nav backdrop/glass effect

Nav glass diatur dari:

```text
config/backdrop.config.js
```

Bagian:

```js
navigation: {
  enabled: true,
  blur: "28px",
  opacity: 0.52,
  borderOpacity: 0.30,
  shadowIntensity: 0.18,
  tint: "255, 255, 255"
}
```

Jika ingin lebih transparan, kecilkan `opacity`, contoh `0.38`.
Jika ingin kaca lebih blur, besarkan `blur`, contoh `"34px"`.


### V8: Multi-mode gallery

Mode gallery sekarang aktif dari:

```text
config/media.config.js
```

Bagian:

```js
gallery: {
  enabled: true,
  mode: "swiper",
  preview: true
}
```

Mode yang tersedia:

```text
swiper
grid
masonry
carousel
coverflow
stack
polaroid
```

Catatan: `carousel` dan `coverflow` memakai Swiper. Pastikan CDN Swiper tetap aktif di `index.html`.


### V9: Nav backdrop, animasi nav, dan nama file gallery

Perubahan utama:

```text
1. Bottom nav hanya muncul setelah tombol "Buka Undangan" diklik.
2. Nav muncul dengan animasi smooth dari bawah.
3. Nav memakai glass/backdrop.
4. Tombol nav juga memakai glass/backdrop.
5. Gallery default memakai nama file gallery_1.jpg sampai gallery_15.jpg.
```

Pengaturan nav glass ada di:

```text
config/backdrop.config.js
```

Bagian:

```js
navigation: {
  blur: "32px",
  opacity: 0.48,
  button: {
    blur: "18px",
    opacity: 0.24,
    activeOpacity: 0.42
  }
}
```

Pengaturan animasi nav ada di:

```text
config/navigation.config.js
```

Bagian:

```js
showOnlyAfterInvitationOpened: true,
showDelayAfterOpen: 220
```

Foto gallery disimpan di:

```text
assets/images/gallery/
```

Nama file default:

```text
gallery_1.jpg
gallery_2.jpg
...
gallery_15.jpg
```


### V10: Video background hero diperbaiki

Video tampil di bagian Hero setelah cover dibuka.

Pengaturan ada di:

```text
config/video.config.js
```

Agar video aktif:

```js
enabled: true,
useAsBackground: true
```

File video disimpan di:

```text
assets/video/background-mobile.mp4
assets/video/background-desktop.mp4
```

Format yang disarankan:

```text
MP4, codec H.264, muted autoplay, playsinline
```


### V11: Gallery JPEG dan audio diperbaiki

Gallery sekarang memakai ekstensi:

```text
gallery_1.jpeg
gallery_2.jpeg
...
gallery_15.jpeg
```

Path-nya ada di:

```text
config/media.config.js
```

Audio sekarang aktif dari:

```text
config/audio.config.js
```

Pengaturan utama:

```js
enabled: true,
file: "assets/audio/music.mp3",
autoplayAfterOpen: true,
button: {
  position: "top-right"
}
```

Jika file audio Hafiz bukan `music.mp3`, ubah path ini sesuai nama file:

```js
file: "assets/audio/nama-audio.mp3"
```

Posisi tombol audio yang tersedia:

```text
top-right
top-left
bottom-right
bottom-left
```


### V12: Gallery JPEG, audio, dan transparansi background hero

Gallery sekarang memakai ekstensi:

```text
gallery_1.jpeg
gallery_2.jpeg
...
gallery_15.jpeg
```

Audio aktif dari:

```text
config/audio.config.js
```

Pengaturan audio:

```js
enabled: true,
file: "assets/audio/music.mp3",
button: {
  position: "top-right"
}
```

Background foto Hero bisa diatur dari:

```text
config/media.config.js
```

Bagian:

```js
heroBackground: {
  enabled: true,
  imageOpacity: 1,
  overlayOpacity: 0.28,
  gradientOpacity: 0.42
}
```

Agar foto background Hero lebih jelas, kecilkan overlay:

```js
overlayOpacity: 0.12,
gradientOpacity: 0.22
```

Jika ingin foto lebih samar:

```js
imageOpacity: 0.72,
overlayOpacity: 0.35
```


### V13: Audio/video fallback source

Jika audio/video tidak bisa diputar, penyebab paling umum adalah file belum ada di folder asset.

Audio default:

```text
assets/audio/music.mp3
```

Video default:

```text
assets/video/background-mobile.mp4
assets/video/background-desktop.mp4
```

Versi ini juga mencoba nama alternatif otomatis:

Audio:

```text
music.mp3
music.m4a
music.ogg
wedding.mp3
lagu-undangan.mp3
```

Video:

```text
background-mobile.mp4
background-desktop.mp4
background.mp4
video-mobile.mp4
video-desktop.mp4
video.mp4
```

Jika memakai nama lain, ubah:

```text
config/audio.config.js
config/video.config.js
```


### V14: Assets Hafiz sudah dimasukkan dan path media diperbaiki

File dari `assets.zip` sudah dimasukkan ke project.

Path audio:

```text
assets/audio/music.mp3
```

Path video:

```text
assets/video/video.mp4
```

Catatan: file video Hafiz adalah `.mp4`, bukan `.mp3`.

Path foto utama sekarang memakai `.jpeg`:

```text
assets/images/cover.jpeg
assets/images/background-mobile.jpeg
assets/images/background-desktop.jpeg
assets/images/bride-groom.jpeg
```

Gallery:

```text
assets/images/gallery/gallery_1.jpeg
...
assets/images/gallery/gallery_15.jpeg
```

Untuk mengecek media langsung, buka file:

```text
media-check.html
```

Jika audio/video berjalan di `media-check.html` tetapi tidak di halaman utama, berarti masalahnya ada di script browser/autoplay. Jika tidak berjalan juga di `media-check.html`, berarti browser tidak mendukung file atau file rusak.


### V15: Audio/video di halaman utama diperbaiki

Jika media bisa berjalan di `media-check.html` tetapi tidak di halaman utama, penyebabnya biasanya browser hanya mengizinkan media diputar dari gesture klik user.

Versi ini memperbaiki dengan cara:

```text
1. Audio memakai elemen <audio> nyata di index.html
2. Video dibuat sebagai elemen <video> nyata di Hero
3. Tombol "Buka Undangan" langsung memanggil startInvitationAudio()
4. Tombol "Buka Undangan" langsung memanggil startInvitationVideo()
5. Media dipanggil lagi setelah cover hilang sebagai pengaman
```

Audio:

```text
assets/audio/music.mp3
```

Video:

```text
assets/video/video.mp4
```


### V16: Tombol musik hanya muncul setelah undangan dibuka

Tombol musik sekarang:

```text
1. Tidak muncul saat cover masih tampil
2. Muncul setelah tombol "Buka Undangan" diklik
3. Muncul dengan animasi pop-in smooth di pojok kanan atas
4. Tetap bisa dipakai manual jika autoplay audio diblokir browser
```

Pengaturan delay tombol musik:

```text
config/audio.config.js
```

Bagian:

```js
button: {
  position: "top-right",
  showDelayAfterOpen: 260
}
```


### V17: Konsep baru video intro + backsound

Audio terpisah dimatikan. Backsound memakai audio dari video.

Alur:

```text
1. Tamu klik "Buka Undangan"
2. Video intro tampil
3. Setelah durasi tertentu, video fade out
4. Hero/nama mempelai tampil
5. Audio dari video tetap berjalan sebagai backsound
```

Pengaturan ada di:

```text
config/video.config.js
```

Bagian penting:

```js
mode: "intro-video",

intro: {
  duration: 6500,
  fadeOutDuration: 900,
  keepPlayingAsBacksound: true,
  loopAsBacksound: true,
  muted: false,
  volume: 0.65
}
```

Untuk mengubah lama video tampil:

```js
duration: 9000
```

Hero signature nama mempelai sekarang otomatis mengambil dari:

```text
config/couple.config.js
```

Bagian:

```js
groom.shortName
bride.shortName
separator
```

Jadi tidak perlu mengubah teks "Hafiz & Ayu" lagi di `signature.config.js`.


### V18: Video dan hero signature diperbaiki

Penyebab bug:

```text
Config dibuat dengan const, jadi tidak selalu terbaca sebagai window.VIDEO_CONFIG / window.COUPLE_CONFIG.
```

Perbaikan:

```text
1. video.js sekarang membaca VIDEO_CONFIG langsung
2. signature.js sekarang membaca COUPLE_CONFIG langsung
3. Hero signature tidak lagi jatuh ke teks fallback "Mempelai"
4. Intro video akan tetap mencoba tampil meskipun audio video diblokir browser
```

Hero signature otomatis mengambil:

```text
COUPLE_CONFIG.groom.shortName
COUPLE_CONFIG.separator
COUPLE_CONFIG.bride.shortName
```


### V19: Audio video tidak putus, tombol pause, cover card backdrop

Perubahan:

```text
1. Audio dari video tidak lagi dihentikan saat visual video hilang
2. Overlay video tidak memakai visibility:hidden saat menjadi backsound
3. Tombol pause/play backsound muncul di kanan atas setelah Buka Undangan
4. Tombol pause/play muncul dengan animasi pop-in
5. Card Buka Undangan memakai backdrop/glass
6. Backdrop card Buka Undangan bisa diatur di config/backdrop.config.js
7. Transisi cover ke video dibuat lebih smooth
```

Pengaturan tombol pause backsound:

```text
config/video.config.js
```

Bagian:

```js
intro: {
  audioButton: {
    enabled: true,
    position: "top-right",
    showDelayAfterOpen: 420,
    pauseText: "❚❚",
    playText: "▶"
  }
}
```

Pengaturan card Buka Undangan:

```text
config/backdrop.config.js
```

Bagian:

```js
coverCard: {
  enabled: true,
  blur: "26px",
  opacity: 0.56,
  borderOpacity: 0.30,
  shadowIntensity: 0.20,
  tint: "255, 255, 255"
}
```


### V20: Preload asset dan preview foto diperbaiki

Asset bisa dipreload sebelum undangan dibuka agar lebih minim lag.

File pengaturan:

```text
config/preload.config.js
```

Pengaturan utama:

```js
enabled: true,
waitBeforeOpen: true,
waitUntilProgress: 0.85,
timeout: 12000,

assets: {
  cover: true,
  heroImages: true,
  gallery: true,
  video: true,
  audio: false
}
```

Cara kerjanya:

```text
1. Saat halaman pertama dibuka, browser mulai memuat foto dan video.
2. File yang berhasil dimuat akan tersimpan di cache/memori browser.
3. Saat tombol Buka Undangan ditekan, sistem menunggu preload sesuai config.
4. Jika koneksi lambat, sistem tetap lanjut setelah timeout.
```

Catatan:

```text
Browser tidak selalu mengizinkan seluruh video disimpan penuh di memori.
Namun preload video akan membantu memuat metadata/data awal agar transisi lebih ringan.
```

Preview foto gallery juga diperbaiki:

```text
1. Foto preview center di tengah layar
2. Ada margin kiri-kanan
3. Tidak nempel ke kanan
4. Bisa ditutup dengan tombol X atau Escape
```


### V21: Transisi cover → video → hero diperhalus

Perbaikan:

```text
1. Cover keluar dengan fade + scale + blur yang lebih lembut
2. Video masuk dengan fade/scale/blur yang lebih smooth
3. Video keluar dengan fade yang lebih panjang
4. Hero mulai masuk dengan crossfade sebelum video benar-benar selesai
5. Khusus mobile, durasi animasi dibuat sedikit lebih panjang agar tidak patah
6. Audio video tetap tidak diputus saat visual video hilang
```

Pengaturan ada di:

```text
config/video.config.js
```

Bagian:

```js
intro: {
  fadeInDuration: 850,
  fadeOutDuration: 1200,

  smoothTransition: {
    startDelay: 120,
    heroPrepareBeforeFadeEnd: 420,
    navDelayAfterHero: 360,

    mobile: {
      fadeInDuration: 900,
      fadeOutDuration: 1250,
      heroEnterDuration: 950,
      heroPrepareBeforeFadeEnd: 520
    }
  }
}
```

Jika mobile masih terasa lambat, kecilkan:

```js
fadeOutDuration: 900,
heroEnterDuration: 750
```


### V22: Cover glass, preload penuh, hero cerah, gallery grid

Perubahan:

```text
1. Card cover dibuat lebih glass/backdrop blur
2. Jika backdrop-filter tidak didukung browser, card tetap dibuat transparan
3. Tombol "Buka Undangan" disable sampai seluruh asset selesai preload
4. Video ke Hero dibuat lebih smooth terutama di mobile
5. Hero dibuat lebih cerah dan tidak gelap
6. Pesan "ketuk video untuk mendengarkan suara" disembunyikan
7. Gallery default menjadi grid
```

Preload penuh:

```text
config/preload.config.js
```

```js
waitUntilProgress: 1,
disableButtonUntilReady: true
```

Cover glass:

```text
config/backdrop.config.js
```

```js
coverCard: {
  blur: "34px",
  opacity: 0.38,
  fallbackOpacity: 0.48
}
```

Gallery:

```text
config/media.config.js
```

```js
mode: "grid"
```


### V23: Google Sheet RSVP, ucapan/doa, dan maps diaktifkan

Google Sheet Web App:

```text
https://script.google.com/macros/s/AKfycbz8JDlQwi2cnhXw7uUUIi0Gaaclgq4Beb-FIZ_zDb8e5PcXFr1p1u7Sde2ckYEugSA/exec
```

File config:

```text
config/google-sheet.config.js
```

Status:

```js
enabled: true
scriptUrl: "https://script.google.com/macros/s/AKfycbz8JDlQwi2cnhXw7uUUIi0Gaaclgq4Beb-FIZ_zDb8e5PcXFr1p1u7Sde2ckYEugSA/exec"
```

Data yang dikirim:

```text
RSVP  -> sheet RSVP
Ucapan & Doa -> sheet UCAPAN
```

Maps:

```text
config/location.config.js
```

Link Google Maps:

```text
https://maps.app.goo.gl/oGhyVhrudGG7YhWAA
```

Embed map sudah dimasukkan memakai URL `src` iframe.

Catatan penting deployment Apps Script:

```text
Execute as: Me
Who has access: Anyone
```

Jika Google Sheet belum menerima data, buka URL Web App di browser.
Jika muncul pesan "Google Sheet Web App aktif", berarti deploy sudah benar.


### V24: CORS Google Sheet diperbaiki + tracking klik link

Masalah pada gambar:

```text
No 'Access-Control-Allow-Origin'
Failed to fetch
```

Penyebabnya: Google Apps Script Web App tidak mengirim header CORS standar untuk `fetch` biasa.

Solusi di v24:

```text
1. Kirim RSVP/ucapan/tracking memakai POST no-cors
2. Ambil data RSVP/ucapan/tracking memakai JSONP
3. Halaman test tidak lagi memunculkan error CORS merah seperti fetch biasa
```

Fitur baru:

```text
1. Test RSVP
2. Test ucapan dan doa
3. Test klik link
4. Test klik link dengan lokasi tamu jika diizinkan browser
5. Ambil data RSVP
6. Ambil data ucapan
7. Ambil data klik link
```

File test:

```text
google-sheet-test.html
```

Sheet baru untuk tracking link:

```text
KLIK_LINK
```

Kolom tracking:

```text
timestamp
eventType
guestName
locationStatus
latitude
longitude
accuracy
mapsUrl
pageUrl
referrer
userAgent
```

Penting: karena `Code.gs` juga diperbarui, Hafiz perlu update Apps Script lalu redeploy:

```text
Deploy > Manage deployments > Edit
Version: New version
Deploy
```

URL tetap sama:

```text
https://script.google.com/macros/s/AKfycbz8JDlQwi2cnhXw7uUUIi0Gaaclgq4Beb-FIZ_zDb8e5PcXFr1p1u7Sde2ckYEugSA/exec
```


### V25: Perbaikan google-sheet-test.html `URL is not a constructor`

Penyebab error:

```text
const URL = "https://script.google.com/..."
```

Nama variabel `URL` menimpa constructor bawaan browser `URL`, sehingga kode:

```js
new URL(...)
```

menjadi error.

Perbaikan:

```text
1. Variabel URL diganti menjadi APP_SCRIPT_URL
2. Pembuatan URL memakai window.URL
3. Test page diberi catatan agar dijalankan lewat localhost
```

Jalankan test lebih aman lewat terminal:

```bash
python -m http.server 8000
```

Lalu buka:

```text
http://localhost:8000/google-sheet-test.html
```


### V26: Fix error `locationCfg is not defined`

Error:

```text
ReferenceError: locationCfg is not defined
at renderEvent
```

Penyebab:

```text
Variabel locationCfg hanya dibuat di renderLocation(),
tetapi ada bagian renderEvent() yang ikut memakai locationCfg.
```

Perbaikan:

```text
renderEvent() sekarang memakai eventLocationCfg sendiri,
sehingga index.html bisa dibuka kembali tanpa error render.
```


### V28: Buku Tamu Digital memakai pagination dan badge jumlah

Perubahan:

```text
1. Daftar RSVP memakai pagination
2. Daftar ucapan & doa memakai pagination
3. Jumlah RSVP tampil di kanan judul "Konfirmasi Kehadiran"
4. Jumlah doa tampil di kanan judul "Ucapan & Doa"
5. Jumlah otomatis update setelah submit atau load dari Google Sheet
```

Pengaturan RSVP:

```text
config/rsvp.config.js
```

```js
pagination: {
  enabled: true,
  perPage: 5,
  showInfo: true,
  prevText: "Sebelumnya",
  nextText: "Berikutnya"
}
```

Pengaturan ucapan/doa:

```text
config/wishes.config.js
```

```js
pagination: {
  enabled: true,
  perPage: 5,
  showInfo: true,
  prevText: "Sebelumnya",
  nextText: "Berikutnya"
}
```


### V29: Polish closing, pagination, skip video, badge, title & logo

Perubahan:

```text
1. Card Terima Kasih diberi margin bawah agar tidak tertutup nav
2. Tombol di dalam card dibuat full mengikuti lebar card
3. Tombol pagination "Sebelumnya" diganti "<"
4. Tombol pagination "Berikutnya" diganti ">"
5. Tombol "Lewati" pada video langsung pindah ke Hero dengan transisi smooth
6. Badge Buku Tamu hanya menampilkan angka
7. Badge diposisikan di kanan atas dekat tulisan Konfirmasi Kehadiran / Ucapan & Doa
8. Ditambahkan config title halaman dan logo/favicon
```

Config title dan logo:

```text
config/page.config.js
```

```js
const PAGE_CONFIG = {
  title: "Undangan Pernikahan Hafiz & Ayu",
  description: "Undangan akad nikah dan resepsi Hafiz & Ayu",
  logo: {
    enabled: true,
    favicon: "assets/images/cover.jpeg",
    appleTouchIcon: "assets/images/cover.jpeg"
  }
};
```

Config tombol pagination:

```text
config/rsvp.config.js
config/wishes.config.js
```

```js
prevText: "<",
nextText: ">"
```


### V30: Badge sejajar, closing signature, komentar config, hero spacing, foto mempelai

Perubahan:

```text
1. Badge jumlah RSVP dan doa pada Buku Tamu Digital disejajarkan dengan teks judul
2. Badge hanya menampilkan angka
3. Closing signature diganti menjadi "Sakinah Mawaddah Warahmah"
4. Semua file config diberi komentar opsi pengaturan yang siap digunakan
5. Hero diberi spacing lebih seimbang antara "Akad Nikah & Resepsi", "Hafiz & Ayu", dan jadwal acara
6. Card mempelai diberi foto rounded masing-masing mempelai
```

Foto mempelai tersimpan di:

```text
assets/images/couple/hafiz-4x6.jpg
assets/images/couple/ayu-4x6.jpg
```

Pengaturan foto ada di:

```text
config/couple.config.js
```

Contoh:

```js
photo: {
  enabled: true,
  src: "assets/images/couple/hafiz-4x6.jpg",
  alt: "Foto Hafiz",
  shape: "rounded"
}
```

Pilihan bentuk foto:

```text
rounded
circle
soft-square
```


### V31: Fix foto mempelai dan background Hero

Perubahan:

```text
1. Border putih foto mempelai dibuat rata dan presisi
2. Rounded foto mempelai diperbaiki agar tidak terlihat tebal sebelah
3. Background Hero dipaksa menempel ke atas
4. Celah putih/margin atas pada Hero dihilangkan
5. Mobile menggunakan 100dvh agar background tidak menyisakan ruang putih
```


### V32: Update data dan navigasi preview galeri

Perubahan:

```text
1. Preview foto galeri sekarang punya tombol < dan >
2. Preview foto bisa digeser tanpa keluar dari modal
3. Keyboard ArrowLeft dan ArrowRight juga bisa digunakan
4. Lokasi acara diperbarui
5. URL Google Sheet diperbarui
6. Nama ibu mempelai perempuan diperbarui
7. Nama panggilan "Ayu" diganti menjadi "Ayudita"
```

Lokasi acara:

```text
JL Raya Kopang Praya, Ruket, Semparu II, Semparu, Kopang
```

Google Sheet Web App:

```text
https://script.google.com/macros/s/AKfycbwRv4bY5txID8y7_MPFanN9gTY1ZzI5ZrN0FXl5udqmQn1qD7oqAZT6-N1sa8AhebW8jA/exec
```


### V33: Badge Buku Tamu ambil semua data + pemisah bawah Hero

Kenapa badge sebelumnya hanya 80?

```text
Karena google-apps-script/Code.gs masih membatasi data dengan slice(0, 80).
Jadi meskipun Google Sheet lebih dari 80, Web App hanya mengirim 80 item.
```

Perbaikan:

```text
1. Batas 80 data dihapus
2. DATA_LIMITS.RSVP = 0 berarti ambil semua RSVP
3. DATA_LIMITS.WISHES = 0 berarti ambil semua ucapan/doa
4. DATA_LIMITS.OPENS = 0 berarti ambil semua tracking klik link
5. Ditambahkan light divider di bagian bawah Hero agar foto background menyatu rapi ke section berikutnya
```

Pengaturan batas data ada di:

```text
google-apps-script/Code.gs
```

```js
const DATA_LIMITS = {
  RSVP: 0,
  WISHES: 0,
  OPENS: 0
};
```

Penting: paste ulang `google-apps-script/Code.gs` ke Apps Script lalu redeploy dengan New Version.


### V34: URL Google Sheet baru + fix divider Hero

Perubahan:

```text
1. URL Google Sheet diganti ke URL baru
2. Divider Hero tidak lagi memakai .hero-section::after
3. Divider dipindahkan ke elemen .hero-light-border di bawah foto
4. Divider dibuat blur ke atas sedikit supaya foto dan background/section bawah terlihat menyatu
5. Fallback garis di hero-content dimatikan agar divider tidak muncul di atas foto
```

URL Google Sheet:

```text
https://script.google.com/macros/s/AKfycbwpd5fYdLKpaJTZJTkPa3lbpbj7tH0I9IMn_ZwN18_2cz544gGWtjd3d1lawHRkZRXa/exec
```


### V35: Ornamen cinta baru + sinkronisasi nama form

Perubahan:

```text
1. Ornamen lama diganti dengan ornamen baru bertema cinta dan kasih sayang
2. Cover/area yang memakai ornament sekarang memakai heart-love SVG baru
3. Nama pada form Ucapan otomatis mengikuti nama di form Konfirmasi Kehadiran
4. Jika nama di form Ucapan diedit manual, nama RSVP tidak ikut berubah
5. Jika ada nama tamu pada parameter link undangan, kedua form nama otomatis terisi
```

File ornamen baru:

```text
assets/ornaments/love-heart-1.svg
assets/ornaments/love-heart-2.svg
```

Logika sinkronisasi form:

```text
js/form-sync.js
```


### V36: Parameter undangan grup `togroup`

Perubahan:

```text
1. Ditambahkan parameter togroup untuk undangan grup
2. Cover bisa menampilkan nama utama dari parameter to dan grup dari parameter togroup
3. Nama otomatis pada form Konfirmasi Kehadiran tetap hanya mengambil parameter to
4. Nama otomatis pada form Ucapan & Doa tetap hanya mengambil parameter to
```

Contoh undangan personal:

```text
index.html?to=Abdul_Hafiz
```

Contoh undangan grup:

```text
index.html?to=Abdul_Hafiz&togroup=Keluarga_Besar
```

Contoh dua baris pada grup:

```text
index.html?to=Abdul_Hafiz&togroup=Dinas_Kesehatan|Kabupaten_Lombok_Tengah
```

Hasil:

```text
Cover:
Abdul Hafiz
Dinas Kesehatan
Kabupaten Lombok Tengah

Nama RSVP:
Abdul Hafiz

Nama Ucapan:
Abdul Hafiz
```

Pengaturan ada di:

```text
config/main.config.js
```

```js
guest: {
  urlParameter: "to",
  groupUrlParameter: "togroup",
  showGroupOnCover: true
}
```


### V37: Perbaikan tampilan dropdown

Perubahan:

```text
1. Dropdown/select dibuat lebih rapi
2. Panah bawah tidak lagi nempel ke kanan
3. Padding kanan select diperbesar
4. Panah bawaan browser diganti custom arrow
5. Warna, border, radius, dan focus state disamakan dengan input form
```


### V38: Update signature config dan foto mempelai

Perubahan:

```text
1. config/signature.config.js diganti sesuai konfigurasi terbaru
2. Hero signature tetap mengambil nama dari couple config
3. Section title signature tetap memakai mode text-and-line
4. Closing signature tetap "Sakinah Mawaddah Warahmah"
5. Foto mempelai pada card diganti dengan foto terbaru yang diupload
```

Foto baru tersimpan di:

```text
assets/images/couple/hafiz-4x6.jpg
assets/images/couple/ayu-4x6.jpg
```


### V39: Signature terbaru, blur Hero, video top fix, smooth video ke Hero

Perubahan:

```text
1. config/signature.config.js diganti sesuai konfigurasi terbaru
2. Durasi animasi signature dibuat lebih lambat/smooth
3. Ditambahkan pengaturan blur background Hero di config/media.config.js
4. Video intro dipaksa menempel ke bagian atas layar
5. Transisi video ke Hero dibuat crossfade lebih halus
6. Hero mulai muncul saat video fade out, sehingga tidak terasa tiba-tiba
```

Pengaturan blur background Hero:

```text
config/media.config.js
```

```js
heroBackground: {
  backdropBlur: {
    enabled: true,
    blur: "2px",
    scale: 1.018,
    brightness: 1.08,
    saturation: 1.06,
    contrast: 1.02
  }
}
```

Untuk tanpa blur:

```js
backdropBlur: {
  enabled: false,
  blur: "0px"
}
```


### V41 dari V39: Desktop Hero full screen + transisi video pendek

Perubahan:

```text
1. Basis perubahan menggunakan v39
2. Hero desktop dibuat full mengikuti ukuran layar
3. Background Hero desktop dipaksa cover 100vw x 100vh
4. Transisi video ke Hero dipendekkan
5. Video fade out transparan, bukan transisi gelap panjang
6. Hero reveal dibuat singkat agar tidak terasa tiba-tiba tetapi tetap cepat
```

Pengaturan transisi video ada di:

```text
config/video.config.js
```

Nilai utama:

```js
fadeOutDuration: 850
heroEnterDuration: 650
```


### V42: Signature config terbaru + center alert Google Sheet

Perubahan:

```text
1. config/signature.config.js diganti sesuai konfigurasi terbaru
2. sectionTitle.lineDuration diubah menjadi 3000
3. Alert proses pengiriman Google Sheet tampil di tengah layar
4. Alert dibuat sebagai center card glass/backdrop
5. Berlaku untuk RSVP dan Ucapan/Doa
```

File baru:

```text
js/center-alert.js
```


### V43: Status pesan form rata tengah

Perubahan:

```text
1. Pesan sukses RSVP dibuat rata tengah di dalam card/form
2. Pesan sukses Ucapan & Doa dibuat rata tengah di dalam card/form
3. Pesan error dan proses kirim juga dibuat rata tengah
4. Tampilan status message diberi padding, radius, dan warna lembut
```


### V44: Couple config terbaru + video portrait desktop center crop

Perubahan:

```text
1. config/couple.config.js diganti sesuai konfigurasi terbaru
2. Video portrait di desktop dibuat tetap memenuhi layar
3. Video desktop mengambil bagian tengah video
4. Pengaturan object-fit dan object-position video ditambahkan ke config/video.config.js
```

Pengaturan video portrait:

```text
config/video.config.js
```

```js
videoFit: {
  enabled: true,
  desktopObjectFit: "cover",
  desktopObjectPosition: "center center",
  mobileObjectFit: "cover",
  mobileObjectPosition: "center center"
}
```

Jika ingin mengambil bagian atas video di desktop:

```js
desktopObjectPosition: "center top"
```

Jika ingin mengambil bagian bawah video di desktop:

```js
desktopObjectPosition: "center bottom"
```


### V45: Perbaikan scroll mouse desktop

Perubahan:

```text
1. Memastikan no-scroll dan opening-invitation selalu dilepas setelah Hero tampil
2. Menambahkan fallback unlock scroll otomatis jika class lock terlambat hilang
3. Overlay video setelah fade out tidak lagi menangkap scroll/click
4. Efek parallax desktop dibuat lebih ringan
5. Mousemove parallax desktop dimatikan agar scroll wheel tidak terasa tertahan
6. AOS/animasi desktop dibuat lebih ringan saat halaman sudah terbuka
```

File yang diperbaiki:

```text
js/app.js
js/video.js
js/parallax.js
css/components.css
config/parallax.config.js
```


### V46: Timestamp Google Sheet WITA / GMT+8

Perubahan:

```text
1. Timestamp Google Sheet dipaksa menggunakan zona waktu Indonesia Tengah
2. Zona waktu menggunakan Asia/Makassar
3. Format timestamp: yyyy-MM-dd HH:mm:ss WITA
4. Berlaku untuk RSVP, Ucapan/Doa, dan Tracking Klik Link
5. Saat membaca data lama, timestamp Date juga dinormalisasi ke WITA
```

File yang wajib dipaste ulang ke Apps Script:

```text
google-apps-script/Code.gs
```

Setelah paste kode terbaru, lakukan:

```text
Deploy > Manage deployments > Edit > Version: New version > Deploy
```
