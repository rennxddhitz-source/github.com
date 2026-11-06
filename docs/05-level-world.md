# Bagian 5 — Level / World Design

## Struktur Dunia

Dunia dibagi menjadi 5 wilayah yang dibuka seiring naik level pemain. Setiap wilayah memiliki biome, rute, dan karakter ekonomi unik.

| Wilayah | ID | Biome | Jarak Rute (km) | Level Unlock | ID Unlock |
|---------|-----|-------|-----------------|--------------|-----------|
| Pegalmanan | WLD-REG-01 | Pegunungan | 50–150 | 1 (default) | PLR-LVL-01 |
| Dataran Indah | WLD-REG-02 | Dataran Rendah | 100–250 | 3 | PLR-LVL-01 |
| Pantai Biru | WLD-REG-03 | Pantai | 150–350 | 5 | PLR-LVL-01 |
| Gurun Kering | WLD-REG-04 | Gurun | 200–400 | 7 | ASUMSI-13 |
| Salju Abadi | WLD-REG-05 | Tundra | 300–500 | 10 | ASUMSI-13 |

**Peringkat Wilayah (Rentang Jarak)**:

| ID Wilayah | Rentang Minimum (km) | Rentang Maksimum (km) | Rata-rata Jarak (km) |
|------------|----------------------|-----------------------|----------------------|
| WLD-REG-01 | 50 | 150 | 100 |
| WLD-REG-02 | 100 | 250 | 175 |
| WLD-REG-03 | 150 | 350 | 250 |
| WLD-REG-04 | 200 | 400 | 300 |
| WLD-REG-05 | 300 | 500 | 400 |

**ID Baru**:
- `WLD-REG-01` s.d. `WLD-REG-05`: ID wilayah [ASUMSI-13]
- `PLR-LVL-03`: Level unlock Wilayah 2 = 3 [ASUMSI-14]
- `PLR-LVL-04`: Level unlock Wilayah 3 = 5 [ASUMSI-14]
- `PLR-LVL-05`: Level unlock Wilayah 4 = 7 [ASUMSI-14]
- `PLR-LVL-06`: Level unlock Wilayah 5 = 10 [ASUMSI-14]

## Pacing Dunia

| Fase | Durasi Estimasi | Aktivitas Dominan | ID Pacing |
|------|-----------------|-------------------|-----------|
| Awal (Wilayah 1–2) | 0–2 jam | Belajar rute pendek, upgrade dasar | WLD-PAC-01 |
| Tengah (Wilayah 3) | 2–5 jam | Manajemen bahan bakar rute panjang | WLD-PAC-02 |
| Akhir (Wilayah 4–5) | 5–10 jam | Optimasi rute legendaris, boss event | WLD-PAC-03 |

**Kritik Ruang**: Wilayah 1 (Pegalmanan) terlalu sempit jika hanya 50–150 km; perlu ditambahkan cabang rute alternativ agar pemain tidak merasa terjebak dalam satu jalur linear. Wilayah 5 (Salju Abadi) harus diberi rute "pintasan berisiko" yang melewati area berbahaya untuk menciptakan keputusan strategis.
