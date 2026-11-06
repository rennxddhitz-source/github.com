# Bagian 14 — Lampiran

## 14A Daftar [ASUMSI-NN]

| Nomor | Isi Singkat | Blok |
|-------|-------------|------|
| ASUMSI-01 | Kecepatan dasar kereta = 20 km/menit | A |
| ASUMSI-02 | Jarak rute minimum 50 km, maksimum 500 km | A |
| ASUMSI-03 | Faktor cuaca hujan 0.7, salju 0.5 | A |
| ASUMSI-04 | Kapasitas gerbong default 10 ton, tangki 50 unit | A |
| ASUMSI-05 | Faktor efisiensi gerbong standar 0.02, upgrade 0.015 | A |
| ASUMSI-06 | Harga bahan bakar 2 Gold per unit | A |
| ASUMSI-07 | Harga base upgrade kapasitas 100, kecepatan 150, efisiensi 200 Gold | A |
| ASUMSI-08 | XP base naik level 100, pengali 1.4 | A |
| ASUMSI-09 | Bayaran minimum 50 Gold, maksimum 500 Gold per kontrak | A |
| ASUMSI-10 | Perkalian bayaran 0.8 Gold per km | A |
| ASUMSI-11 | XP gain delivery biasa 25, legendaris 100 | A |
| ASUMSI-12 | Game feel: depart 600ms/2px, cargo 12 partikel, level-up 400ms/4px | A |
| ASUMSI-13 | 5 wilayah dengan rentang jarak dan nama biome | B |
| ASUMSI-14 | Level unlock wilayah: 3, 5, 7, 10 | B |
| ASUMSI-15 | 8 tipe hazard dengan mekanisme gangguan berbeda | B |
| ASUMSI-16 | 2 boss: Si Raksasa Rel dan Musim Salju Abadi | B |
| ASUMSI-17 | 5 karakter kunci dengan peran dan hubungan | B |
| ASUMSI-18 | 10 quest dengan reward dan tipe | B |
| ASUMSI-19 | Game feel hazard: 3px, 200ms | B |
| ASUMSI-20 | Palet warna 5 warna hex utama | B |
| ASUMSI-21 | Durasi transisi UI 250–400 ms | C |
| ASUMSI-22 | HUD update frekuensi per detik / transaksi | C |
| ASUMSI-23 | Model monetisasi F2P non-P2W, tidak ada gacha | C |
| ASUMSI-24 | Harga offer dalam rentang 29.000–79.000 IDR | C |
| ASUMSI-25 | Kriteria lolos milestone berdasarkan 3 lapisan prototipe | C |

Semua [ASUMSI-NN] tercatat di `docs/assumptions.md` dengan nomor yang sama.

## 14B Data Dictionary Master

Sinkron dengan `data/schema.json` dan `specs/data-schema.json`.

| File | Konten |
|------|--------|
| `data/registry/*.yaml` | Setiap ID stabil (angka, nama, hex, faktor) |
| `data/feel/*.json` | Game feel numerik |
| `data/progression/xp_curve.json` | Kurva XP level 1–10 |
| `data/economy/sources_sinks.json` | Sumber dan sink Gold |
| `data/world/regions.json` | 5 wilayah, rentang jarak, level unlock |
| `data/enemies/hazards.json` | 8 hazard + 2 boss |
| `data/quests/quest_list.json` | 10 quest |
| `specs/data-schema.json` | Skema JSON untuk save/load dan runtime |
| `specs/state-machines/train_state.json` | State machine kereta |
| `specs/events.yaml` | Daftar event ID dan handler |

## 14C Checklist Kelengkapan

| Bagian | Target Minimum | Status | Item Terpenuhi |
|--------|----------------|--------|----------------|
| 0 Ringkasan Eksekutif | Pitch, fantasi, 3 USP, target | ✔ | 4/4 |
| 1 Visi & Pilar | 3–5 pilar, Signature Moment, game feel, skrip 5 menit | ✔ | 4/4 |
| 2 Core Loop | Mikro, meso, makro, keputusan menarik, feedback | ✔ | 5/5 |
| 3 Mekanik | ≥1 mekanik dengan rumus, contoh, tabel, sanity check | ✔ | 4 mekanik |
| 4 Progression & Economy | Kurva XP, mata uang, sumber & sink, sanity check/jam | ✔ | 4/4 |
| 5 Level / World | ≥5 wilayah, pacing, kritik ruang | ✔ | 5/5 |
| 6 AI & Musuh | ≥8 tipe, 2 boss, pseudocode, sanity check | ✔ | 8/2 |
| 7 Narasi & Quest | Premis, karakter kunci, ≥10 quest | ✔ | 10/10 |
| 8 Spesifikasi Teknis | Schema, state machine, events, save/load | ✔ | 4/4 |
| 9 Art & Audio | Gaya, palet hex, aset, musik & SFX | ✔ | 5/5 |
| 10 UI/UX | Alur layar, elemen, state, transisi, HUD, failure mode | ✔ | 6/6 |
| 11 Monetisasi | Model adil, daftar offer, uji etika | ✔ | 3/3 |
| 12 Roadmap | 3 lapisan, kriteria terukur, milestone | ✔ | 3/3 |
| 13 Risiko | Tabel risiko, label risk, milestone | ✔ | 3/3 |
| 14 Lampiran | 14A, 14B, 14C | ✔ | 3/3 |
