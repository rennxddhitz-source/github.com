# Bagian 1 — Visi, Pilar Desain & Standar Mahakarya

## Pilar Desain

| Pilar | Deskripsi | Contoh Implementasi |
|-------|-----------|---------------------|
| P1 — Simulasi Terukur | Setiap keputusan didukung angka; tidak ada "magic" tersembunyi. | Waktu tempuh dihitung dari jarak, kecepatan, dan cuaca. |
| P2 — Fantasi Logistik | Setiap rute memiliki konsekuensi ekonomis nyata. | Mengabaikan perawatan gerbong berdampak pada efisiensi bahan bakar. |
| P3 — Game Feel Pixel | Setiap interaksi gerak memiliki respons numerik dan visual. | Keberangkatan kereta disertai partikel asap dan screen shake 150ms. |

## Signature Moment

**[Stasiun Pertama] — [memenangkan kontrak rute pertama setelah 3 kali gagal] — [input: klik "Terima Kontrak" dan atur jadwal keberangkatan] — [respons: kereta berangkat dengan partikel asap, UI menampilkan ETA, musik naik nada, layar getir 2px selama 150ms] — [emosi: kemenangan kecil, rasa bertanggung jawab] — [mengapa tak terlupakan: mirip pertama kali membuka rute di *Tiny Rails*, tetapi sistem kami konsekuensi bahan bakar yang nyata membuat keberangkatan terasa berisiko dan berharga.]**

Referensi: *Tiny Rails* (Trophy Games) — berhasil menarik pemain dengan simulasi kereta sederhana. Game kami lebih dalam dengan sistem bahan bakar dan cuaca yang mempengaruhi strategi.

## Spesifikasi Game Feel

| ID | Elemen | Nilai | Satuan | Catatan |
|----|--------|-------|--------|---------|
| FEEL-DEPART-01 | Durasi animasi keberangkatan | 600 | ms | Tween ease-out |
| FEEL-DEPART-02 | Screen shake amplitude | 2 | px | 150 ms durasi |
| FEEL-CARGO-01 | Partikel muatan masuk per gerbong | 12 | count | Emit saat dock |
| FEEL-LEVELUP-01 | Tween duration naik level | 400 | ms | Skala 1.0 → 1.2 → 1.0 |
| FEEL-LEVELUP-02 | Screen shake naik level | 4 | px | 300 ms |

File terkait: `data/feel/train_depart.json`, `data/feel/cargo_dock.json`, `data/feel/level_up.json`

## Skrip 5 Menit Pertama

1. **0:00–0:30**: Layar judul, pilih "Mulai Baru". Muncul popup pilih nama perusahaan kereta (default: "Raja Kereeta").
2. **0:30–1:30**: Tutorial gerak kamera (drag layar) dan zoom (pinch). Petunjuk teks: "Geser untuk melihat peta wilayah."
3. **1:30–2:30**: Stasiun awal muncul. Pilih kereta default (PLR-TRN-01). Petunjuk: "Klik stasiun untuk mengelola kereta."
4. **2:30–4:00**: Tampilkan daftar kontrak tersedia. Pilih rute pertama (jarak 120 km, bayaran 150 Gold). Klik "Terima".
5. **4:00–5:00**: Kereta berangkat. FEEL-DEPART-01 dan FEEL-DEPART-02 dipicu. UI menampilkan ETA 3:00 (menit nyata). Selesai tutorial dasar.
