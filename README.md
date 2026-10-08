# Fertipro Landing Page (GitHub Pages Ready)

Landing page resmi dan mandiri (*self-contained static website*) untuk produk **Fertipro Pupuk Organik Kelapa Sawit** (Paket Standar 1 Hektar, Paket Jumbo 25 Liter untuk 5 Hektar, serta Layanan Kerjasama Maklon & Distributor B2B).

---

## 📁 Struktur Direktori

```
landingpage/
├── index.html                      # Halaman utama landing page
├── README.md                       # Panduan deploy & konfigurasi
└── assets/
    ├── css/
    │   └── style.css               # Styling kustom, animasi glow, & responsif
    ├── js/
    │   └── app.js                  # Logika kalkulator kebun & form order ke WA CS
    └── images/
        ├── logo-fertipro.png       # Logo resmi Fertipro
        ├── cara-pemakaian.png      # Infografis SOP aplikasi drum 200L
        ├── paket-fertipro-1ha.png  # Mockup Paket Standar 1 Hektar (5L + 1Kg)
        ├── paket-fertipro-25l.jpg  # Mockup Paket Jumbo 25 Liter (25L + 5Kg)
        ├── mockup-5l.png           # Kemasan POC 5 Liter
        ├── mockup-pelarut.jpg      # Kemasan Bio Humat Pasta 1 Kg
        ├── mockup-25l.png          # Kemasan Jerigen Jumbo 25 Liter
        ├── sampul.jpg              # Foto latar belakang perkebunan
        └── gallery/
            ├── 1.jpg s/d 8.jpg     # Galeri dokumentasi nyata buah sawit & panen TBS
```

---

## 🚀 Panduan Deploy ke GitHub Pages

Semua aset menggunakan path relatif (`./assets/...`), sehingga website ini **langsung aktif tanpa proses build (zero-build)** di GitHub Pages.

### Opsi A: Push Folder `landingpage` Sebagai Repository Baru
1. Buka terminal di dalam folder `landingpage`:
   ```bash
   cd landingpage
   git init
   git add .
   git commit -m "Initial commit Fertipro landing page"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
   ```
2. Buka repository di GitHub: **Settings** > **Pages** > Pada bagian **Branch**, pilih `main` dan folder `/ (root)` > Klik **Save**.
3. Dalam 1-2 menit, landing page akan aktif di: `https://USERNAME.github.io/NAMA-REPO/`.

---

### Opsi B: Push Bersama Seluruh Folder Proyek
Jika Anda mengunggah seluruh folder `FERTIPRO` ke GitHub:
1. Pastikan file `landingpage/index.html` dapat diakses pada URL: `https://USERNAME.github.io/NAMA-REPO/landingpage/`.
2. Atau salin isi folder `landingpage/*` ke root repository GitHub Anda.

---

## ⚙️ Konfigurasi Nomor WhatsApp CS

Nomor WhatsApp CS default yang terpasang adalah nomor resmi SOP Fertipro:
- **Nomor**: `+62 857-0422-1717` (Format kode: `6285704221717`)
- Jika ingin mengganti nomor CS di kemudian hari, cukup buka berkas:
  `assets/js/app.js` pada baris ke-8:
  ```javascript
  const WA_NUMBER = '6285704221717'; // Ganti dengan nomor WhatsApp baru
  ```
