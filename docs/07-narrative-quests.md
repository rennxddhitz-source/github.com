# Bagian 7 — Narasi & Quest

## Premis

Pada tahun 2026, jaringan kereta api di benara baru bangkit setelah era kemunduran. Pemain adalah pemuda yang mewarisi satu gerbong roboh dari kakeknya. Misi: membangun kembali jaringan kereta, menyatukan wilayah, dan menjadi "Raja Kereta" yang diingat sejarah.

## Karakter Kunci

| ID | Nama | Peran | Hubungan dengan Pemain |
|----|------|-------|------------------------|
| NPC-01 | Pak Entis | Mentor tukang mesin | Memberikan tutorial awal dan saya perawatan |
| NPC-02 | Ibu Lina | Manajer stasiun pusat | Memberikan kontrak awal dan reputasi |
| NPC-03 | Rival Dara | Pemilik kereta lawan | Antagonis utama, mengajak kompetisi rute |
| NPC-04 | Mas Arief | Kurir peat | Memberikan quest pengiriman darurat |
| NPC-05 | Nenek Sari | Kolektor barang langka | Memberikan quest muatan spesial |

## Quest (Minimal 10)

| ID | Judul | Pemberi | Tujuan | Reward | Tipe |
|----|-------|---------|--------|--------|------|
| QST-01 | Gerbong Pertama | Pak Entis | Selesaikan 1 rute Pegalmanan | 100 Gold, 25 XP | Tutorial |
| QST-02 | Antrik Pesawat | Ibu Lina | Kirim paket ke Dataran Indah | 150 Gold, 40 XP | Delivery |
| QST-03 | Bahan Bakar Habis | Pak Entis | Selamatkan kereta dari macet | 50 Gold, 20 XP | Rescue |
| QST-04 | Kontrak Rival | Rival Dara | Kalahkan rencana kereta lawan | 200 Gold, 60 XP | Kompetisi |
| QST-05 | Barang Langka | Nenek Sari | Antar barang rawan ke Pantai Biru | 300 Gold, 100 XP | Spesial |
| QST-06 | Darurat Medis | Mas Arief | Kirim obat dalam waktu terbatas | 250 Gold, 80 XP | Timed |
| QST-07 | Upgrade Mesin | Pak Entis | Upgrade efisiensi ke level 2 | 100 Gold, 50 XP | Progresi |
| QST-08 | Rute Salju | Ibu Lina | Buka wilayah Salju Abadi | 500 Gold, 200 XP | Unlock |
| QST-09 | Perompakan Rel | Bandit Rel (event) | Hentikan pencurian muatan | 100 Gold, 30 XP | Pertahanan |
| QST-10 | Raja Kereta | Semua NPC | Selesaikan semua wilayah | 1000 Gold, 500 XP | Finale |

**ID Baru**:
- `WLD-REG-04` (Gurun Kering): level unlock 7 [ASUMSI-13]
- `WLD-REG-05` (Salju Abadi): level unlock 10 [ASUMSI-13]
- `PLR-LVL-03` s.d. `PLR-LVL-06`: unlock wilayah [ASUMSI-14]
- `ENM-01` s.d. `ENM-08`: tipe hazard [ASUMSI-15]
- `BOSS-01`, `BOSS-02`: boss [ASUMSI-16]
- `NPC-01` s.d. `NPC-05`: karakter [ASUMSI-17]
- `QST-01` s.d. `QST-10`: quest [ASUMSI-18]
- `FEEL-HAZARD-01`: screen shake saat hazard muncul = 3px, 200ms [ASUMSI-19]
