# Bagian 3 — Mekanik Gameplay

## Mekanik A: Sistem Jarak & Waktu Tempuh

**Aturan**: Waktu tempuh bergantung pada jarak rute, kecepatan kereta, dan faktor cuaca.

**Rumus**:
```
Waktu Tempuh (detik) = Jarak (km) / (Kecepatan (km/menit) × Faktor Cuaca)
```

**ID Registry**:
- `TRN-SPD-01`: Kecepatan dasar kereta = 20 km/menit [ASUMSI-01]
- `RTE-DIST-01`: Jarak rute minimum = 50 km [ASUMSI-02]
- `RTE-DIST-02`: Jarak rute maksimum = 500 km [ASUMSI-02]
- `WTH-CLR-01`: Faktor cuaca cerah = 1.0 [TERKONFIRMASI]
- `WTH-RNY-01`: Faktor cuaca hujan = 0.7 [ASUMSI-03]
- `WTH-SNY-01`: Faktor cuaca salju = 0.5 [ASUMSI-03]

**Contoh hitung**: Jarak 120 km, kecepatan 20 km/menit, cuaca hujan (0.7).
```
Waktu = 120 / (20 × 0.7) = 120 / 14 = 8,57 menit ≈ 514 detik
```

**Tabel rentang**:

| Jarak (km) | Kecepatan (km/menit) | Cuaca | Waktu Tempuh (menit) | Rentang Waktu |
|------------|----------------------|-------|----------------------|---------------|
| 50 | 20 | Cerah | 2.5 | 2.5–3.5 |
| 120 | 20 | Hujan | 8.57 | 8.0–9.5 |
| 300 | 25 | Salju | 6.0 | 5.5–7.0 |
| 500 | 30 | Cerah | 16.67 | 16.0–18.0 |

**Interaksi**: Jika pemain menahan kereta di tengah jalan, waktu tempuh bertambah sesuai durasi penahanan.
**Failure state**: Bahan bakar habis di tengah jalan → kereta berhenti → pemain harus menunggu rescue (biaya 50 Gold) atau menggunakan item cadangan.

**SANITY CHECK**: Kereta level 1 (kecepatan 20 km/menit) melakukan rute 100 km cuaca cerah. Waktu = 100/20 = 5 menit. Dalam sesi 20 menit, pemain bisa menyelesaikan 3-4 rute pendek — cukup untuk satu loop memuaskan. [LULUS]

---

## Mekanik B: Manajemen Cargo & Bahan Bakar

**Aturan**: Setiap gerbong memiliki kapasitas muatan. Konsumsi bahan bakar bergantung pada jarak, bobot muatan, dan efisiensi gerbong.

**Rumus**:
```
Konsumsi Bahan Bakar (unit) = Jarak (km) × Total Bobot Muatan (ton) × Faktor Efisiensi Gerbong
```

**ID Registry**:
- `TRN-CAP-01`: Kapasitas gerbong default = 10 ton [ASUMSI-04]
- `TRN-FUEL-01`: Kapasitas tangki default = 50 unit [ASUMSI-04]
- `TRN-EFF-01`: Faktor efisiensi gerbong standar = 0.02 [ASUMSI-05]
- `TRN-EFF-02`: Faktor efisiensi gerbong upgrade = 0.015 [ASUMSI-05]
- `ECN-FUEL-01`: Harga bahan bakar per unit = 2 Gold [ASUMSI-06]

**Contoh hitung**: Jarak 120 km, muatan 10 ton, efisiensi 0.02.
```
Konsumsi = 120 × 10 × 0.02 = 24 unit bahan bakar
```

**Tabel rentang**:

| Jarak (km) | Muatan (ton) | Efisiensi | Bahan Bakar (unit) | Sisa Tangki (50 unit) |
|------------|--------------|-----------|--------------------|-----------------------|
| 50 | 5 | 0.02 | 5 | 45 |
| 120 | 10 | 0.02 | 24 | 26 |
| 300 | 10 | 0.02 | 60 | Habis (butuh istirahat) |
| 200 | 15 | 0.015 | 45 | 5 |

**Interaksi**: Muatan lebih berat meningkatkan konsumsi bahan bakar secara linier. Pemain bisa membuang sebagian muatan untuk hemat bahan bakar (dengan kehilangan potensi profit).
**Failure state**: Bahan bakar <5 unit → peringatan berkedip di UI (FEEL-WARN-01). Bahan bakar 0 → kereta terpaksa berhenti.

**SANITY CHECK**: Rute 300 km dengan muatan penuh butuh 60 unit, melebihi tangki 50 unit. Pemain dipaksa memilih muatan 8 ton (48 unit) atau rute lebih pendek. Menciptakan keputusan menarik yang baik. [LULUS]

---

## Mekanik C: Upgrade Gerbong & Kereta

**Aturan**: Setiap level upgrade meningkatkan kapasitas, mengurangi konsumsi bahan bakar, atau meningkatkan kecepatan. Harga naik eksponensial.

**Rumus**:
```
Harga Upgrade Level N = Harga Base × 1.5^(N-1)
```

**ID Registry**:
- `UPG-CAP-01`: Harga base upgrade kapasitas = 100 Gold [ASUMSI-07]
- `UPG-SPD-01`: Harga base upgrade kecepatan = 150 Gold [ASUMSI-07]
- `UPG-EFF-01`: Harga base upgrade efisiensi = 200 Gold [ASUMSI-07]
- `PLR-LVL-01`: XP base naik level = 100 [ASUMSI-08]
- `PLR-LVL-02`: Pengali XP per level = 1.4 [ASUMSI-08]

**Contoh hitung**: Upgrade kapasitas level 3.
```
Harga = 100 × 1.5^(3-1) = 100 × 2.25 = 225 Gold
```

**Tabel rentang**:

| Level | Harga Kapasitas (Gold) | Harga Kecepatan (Gold) | Harga Efisiensi (Gold) | Kenaikan Kapasitas (ton) |
|-------|------------------------|------------------------|------------------------|--------------------------|
| 1 | 100 | 150 | 200 | +2 |
| 2 | 150 | 225 | 300 | +2 |
| 3 | 225 | 338 | 450 | +3 |
| 4 | 338 | 507 | 675 | +3 |

**Interaksi**: Upgrade efisiensi mengurangi faktor `TRN-EFF-01` sebesar 10% per level, memungkinkan rute jauh tanpa istirahat bahan bakar.
**Failure state**: Tidak cukup Gold → tombol upgrade abu-abu dengan tooltip "Butuh 50 Gold lagi."

**SANITY CHECK**: Pemain mendapatkan 300 Gold per delivery rata-rata. Upgrade level 2 (150 Gold) terjangkau setelah 1 delivery. Upgrade level 4 (338 Gold) butuh 2 delivery. Kurva terasa terjangkau tetapi memerlukan kerja. [LULUS]

---

## Mekanik D: Sistem Kontrak & Ekonomi Rute

**Aturan**: Kontrak menentukan jenis barang, tujuan, dan bayaran. Harga barang fluktuasi berdasarkan wilayah dan permintaan.

**ID Registry**:
- `ECN-GLD-01`: Mata uang utama = Gold [TERKONFIRMASI]
- `CON-PAY-01`: Bayaran minimum per kontrak = 50 Gold [ASUMSI-09]
- `CON-PAY-02`: Bayaran maksimum per kontrak = 500 Gold [ASUMSI-09]
- `CON-DIST-01`: Perkalian bayaran per km = 0.8 Gold/km [ASUMSI-10]

**Rumus**:
```
Bayaran Kontrak = Jarak (km) × 0.8 + Bonus Jenis Barang
```

**Contoh hitung**: Jarak 120 km, barang biasa (bonus 0).
```
Bayaran = 120 × 0.8 = 96 Gold
```

**Tabel rentang**:

| Jenis Barang | Bonus (Gold) | Jarak (km) | Bayaran Total (Gold) | Rentang Bayaran |
|--------------|--------------|------------|----------------------|-----------------|
| Biasa | 0 | 100 | 80 | 80–100 |
| Murni | 50 | 200 | 210 | 200–250 |
| Legendaris | 200 | 400 | 520 | 500–600 |

**Interaksi**: Pemain memilih kontrak berdasarkan rasio bayaran per bahan bakar yang dibutuhkan.
**Failure state**: Melewati deadline kontrak (jika ada) → penalti reputasi -10 poin.
