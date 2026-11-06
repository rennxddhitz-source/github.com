# Milestone 01 — Vertical Slice

## Tujuan

Pemain menyelesaikan 3 rute Wilayah 1 (Pegalmanan) tanpa crash, dengan UI responsif di perangkat target.

## Output Utama

- Build awal game (HTML5/JavaScript)
- 3 rute kerja di Wilayah 1
- Sistem kereta dasar (berangkat, transit, docking)
- UI HUD (bahan bakar, ETA, gold, XP)
- Sistem kontrak sederhana

## Kriteria Lolos Terukur

1. Pemain bisa menyelesaikan 3 rute berturut-turut tanpa crash
2. UI responsif di perangkat mobile target (layar 375px lebar minimum)
3. Waktu tempuh dihitung sesuai rumus di `docs/03-mechanics.md`
4. Konsumsi bahan bakar sesuai rumus di `docs/03-mechanics.md`
5. Save/load berfungsi untuk progresi rute

## File Implementasi

- `index.html` — Entry point game
- `css/style.css` — Styling game
- `js/game.js` — Logika utama game
- `js/train.js` — Kelas Train dengan state machine
- `js/route.js` — Sistem rute dan kontrak
- `js/ui.js` — Manajemen UI dan HUD

## Definition of Done

- [ ] 3 rute Wilayah 1 tersedia dan bisa diselesaikan
- [ ] Kereta berangkat, transit, dan docking berfungsi
- [ ] HUD menampilkan bahan bakar, ETA, gold, XP dengan benar
- [ ] Sistem kontrak memberikan reward saat delivery selesai
- [ ] Tidak ada crash selama 3 rute berturut-turut
- [ ] Build bisa diakses via GitHub Pages atau langsung dibuka di browser
