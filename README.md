# Tiny Rails — Raja Kereta 2026

GDD prototipe lengkap untuk game simulasi kereta cargo. Repository ini berisi dokumen desain, data single-source-of-truth, spesifikasi teknis, dan milestone implementasi.

## Struktur Repository

```
/docs/          # GDD Markdown (Bagian 0–14 + asumsi + sacred risk)
/data/          # Single source of truth (YAML/JSON machine-readable)
/specs/         # Spesifikasi teknis (schema, state machine, events)
/playtest/      # Protokol dan hasil playtest
/milestones/    # Roadmap per fase implementasi
/labels.yml     # Taxonomy label GitHub Issues
/project-board.md  # Definisi kolom dan kartu (Issue mapping)
```

## Navigasi GDD

| Bagian | File | Deskripsi |
|--------|------|-----------|
| 0 | `/docs/00-executive-summary.md` | Ringkasan eksekutif, elevator pitch, USP |
| 1 | `/docs/01-vision-pillars.md` | Visi, pilar desain, signature moments, game feel |
| 2 | `/docs/02-core-loop.md` | Mikro, meso, makro loop, keputusan menarik |
| 3 | `/docs/03-mechanics.md` | Mekanik gameplay, rumus, contoh hitung |
| 4 | `/docs/04-progression-economy.md` | Kurva XP, mata uang, sumber & sink |
| 5 | `/docs/05-level-world.md` | Struktur dunia, pacing, kritik ruang |
| 6 | `/docs/06-ai-enemies.md` | Tipe musuh/hazard, boss, state machine |
| 7 | `/docs/07-narrative-quests.md` | Premis narasi, karakter kunci, 10 quest |
| 8 | `/docs/08-technical-spec.md` | Data schema, state machine, events, save/load |
| 9 | `/docs/09-art-audio.md` | Art direction, palet hex, aset, musik & SFX |
| 10 | `/docs/10-ui-ux.md` | Alur layar, elemen, state, transisi, HUD |
| 11 | `/docs/11-monetization-launch.md` | Model monetisasi, daftar offer, uji etika |
| 12 | `/docs/12-roadmap-prototype.md` | 3 lapisan roadmap, kriteria lolos terukur |
| 13 | `/docs/13-risk-mitigation.md` | Tabel risiko teknis, desain, kualitas |
| 14 | `/docs/14-appendix.md` | Asumsi, data dictionary, checklist kelengkapan |

## Data Registry

Semua angka stabil tersimpan di `/data/registry/<ID>.yaml`. Setiap ID memiliki format `KATEGORI-NAMA-NN`.

## Milestone Implementasi

| Milestone | File | Status |
|-----------|------|--------|
| Vertical Slice | `/milestones/01-vertical-slice.md` | Siap diimplementasi |
| System Depth | `/milestones/02-system-depth.md` | Rencana |
| Meta Content | `/milestones/03-meta-content.md` | Rencana |

## Lisensi

Lihat `LICENSE`.