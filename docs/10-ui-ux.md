# Bagian 10 — UI/UX

## Alur Layar

| Urutan | Layar | Tujuan | ID Layar |
|--------|-------|--------|----------|
| 1 | Main Menu | Memulai, memuat, pengaturan | SCR-01 |
| 2 | Stasiun Hub | Kelola kereta, lihat kontrak, upgrade | SCR-02 |
| 3 | Peta Dunia | Pilih wilayah, lihat rute tersedia | SCR-03 |
| 4 | Detail Kontrak | Lihat reward, jarak, deadline | SCR-04 |
| 5 | Manajemen Kereta | Bahan bakar, muatan, status | SCR-05 |
| 6 | Transit | Pantau perjalanan, ETA, cuaca | SCR-06 |
| 7 | Hasil Delivery | Klaim Gold dan XP | SCR-07 |

## Elemen UI

| ID | Elemen | Posisi | Nilai Default | Update Frekuensi | Satuan |
|----|--------|--------|---------------|------------------|--------|
| HUD-01 | Bahan Bakar | Kiri atas | 50/50 unit | Setiap detik | unit |
| HUD-02 | ETA | Kanan atas | 00:00 | Setiap detik | menit:detik |
| HUD-03 | Gold | Kiri bawah | 0 | Setiap transaksi | Gold |
| HUD-04 | XP | Kanan bawah | 0/100 | Setiap XP gain | XP |

## State UI

| State | Layar Aktif | Aksi Pemain Utama | ID State |
|-------|-------------|-------------------|----------|
| IDLE | Stasiun | Pilih kereta, lihat kontrak | UI-ST-01 |
| SELECTING_ROUTE | Peta | Pilih rute, terima kontrak | UI-ST-02 |
| IN_TRANSIT | Transit | Pantau bahan bakar, lihat peta mini | UI-ST-03 |
| DOCKED | Stasiun | Bongkar muatan, klaim reward | UI-ST-04 |
| UPGRADE_MENU | Stasiun | Beli upgrade, lihat harga | UI-ST-05 |

## Transisi Layar

| Transisi | Durasi | Jenis | ID |
|----------|--------|-------|-----|
| Main Menu → Stasiun | 300 | ms | fade-in | UI-TRN-01 |
| Stasiun → Peta | 250 | ms | slide-left | UI-TRN-02 |
| Transit → Hasil | 400 | ms | scale-up | UI-TRN-03 |

## Game Feel UI

| ID | Elemen | Nilai | Satuan | Catatan |
|----|--------|-------|--------|---------|
| UI-FEEL-01 | Tombol tekan | 100 | ms | Hit-stop visual |
| UI-FEEL-02 | Notifikasi muncul | 300 | ms | Tween slide-up |
| UI-FEEL-03 | HUD shake warning | 2 | px | Saat bahan bakar <5 unit |

## UX Failure Mode & Solusi

| Failure Mode | Penyebab | Solusi |
|--------------|----------|--------|
| Tombol upgrade tidak responsif | Tidak cukup Gold | Tooltip "Butuh X Gold lagi" + tautan ke quest harian |
| ETA tidak berubah selama transit | Game lag / frame drop | Fallback hitungan manual berdasarkan waktu sistem |
| Kontrak hilang saat memindai | Race condition jaringan | Simpan kontrak di local cache sebelum render |
