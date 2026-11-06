# Bagian 4 — Progression & Economy

## Kurva XP & Level

**Rumus**:
```
XP Diperlukan Level N = 100 × 1.4^(N-1)
```

**ID Registry**:
- `PLR-XP-01`: XP awal level 1 = 0 [ASUMSI-08]
- `PLR-XP-02`: XP gain delivery biasa = 25 [ASUMSI-11]
- `PLR-XP-03`: XP gain delivery legendaris = 100 [ASUMSI-11]

**Tabel rentang**:

| Level | XP Diperlukan | XP Kumulatif | Hadiah Unlock |
|-------|---------------|--------------|---------------|
| 1 | 0 | 0 | Kereta default |
| 2 | 100 | 100 | Upgrade gerbong tersedia |
| 3 | 140 | 240 | Rute wilayah kedua |
| 4 | 196 | 436 | Kereta jenis baru |
| 5 | 274 | 710 | Efisiensi bahan bakar +10% |

**Contoh hitung**: Naik ke level 4 butuh 196 XP setelah level 3.
```
XP kumulatif level 4 = 100 + 140 + 196 = 436
```

## Mata Uang & Sumber/Sink

**Mata uang**: Gold (ECN-GLD-01). Tidak ada mata uang premium di Fase 1.

**Sumber Gold**:

| Sumber | Jumlah (Gold) | Frekuensi | ID |
|--------|---------------|-----------|-----|
| Delivery biasa | 80–150 | Setiap kontrak | ECN-SRC-01 |
| Bonus kecepatan (selesai <80% waktu target) | +20 | Opsional | ECN-SRC-02 |
| Harian login | 50 | Sekali per hari | ECN-SRC-03 |

**Sink Gold**:

| Sink | Harga (Gold) | ID |
|------|--------------|-----|
| Upgrade kapasitas level 1 | 100 | ECN-SNK-01 |
| Bahan bakar per unit | 2 | ECN-SNK-02 |
| Rescue kereta (habis BB di tengah jalan) | 50 | ECN-SNK-03 |

## Sanity Check Arus Ekonomi per Jam

Pemain rata-rata menyelesaikan 4 delivery per jam (rata-rata 15 menit per delivery termasuk waktu nyata dan manajemen UI).

```
Gold per jam = 4 × 115 (rata-rata) = 460 Gold
Biaya bahan bakar per jam = 4 × 24 unit × 2 Gold = 192 Gold
Net Gold per jam = 460 - 192 = 268 Gold
```

Dengan net 268 Gold/jam, pemain bisa beli upgrade kapasitas level 1 (100 Gold) setiap 22 menit, atau upgrade level 3 (225 Gold) setiap 50 menit. Kurva terasa progresif tanpa terlalu lambat. [LULUS]
