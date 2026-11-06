# Project Board — Definisi Kolom & Kartu

## Kolom

| Kolom | Deskripsi | Kriteria Masuk |
|-------|-----------|----------------|
| Backlog | Ide dan tugas yang belum diurutkan | Semua issue baru masuk di sini |
| Ready | Siap dikerjakan, prioritas ditentukan | Issue memiliki label dan estimasi |
| In Progress | Sedang dikerjakan | Assignee ditetapkan, branch dibuat |
| Review | Menunggu review | PR terbuka, checklist milestone terpenuhi |
| Done | Selesai dan di-merge | PR di-merge ke main |

## Mapping Issue ke Milestone

| Milestone | Kolom Target | Label Wajib |
|-----------|--------------|-------------|
| 01-vertical-slice | In Progress | implementation
| 02-system-depth | Ready | implementation
| 03-meta-content | Ready | implementation

## Kartu Contoh

| Judul | Kolom | Label | Milestone |
|-------|-------|-------|-----------|
| Implementasi state machine kereta | In Progress | implementation | 01-vertical-slice |
| UI HUD bahan bakar & ETA | Ready | implementation | 01-vertical-slice |
| Sistem hazard hujan & longsor | Ready | risk | 02-system-depth |
| Quest finale Raja Kereta | Backlog | implementation | 03-meta-content |