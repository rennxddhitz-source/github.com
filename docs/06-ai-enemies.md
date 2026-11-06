# Bagian 6 — AI & Musuh

*Catatan: Dalam konteks simulasi kereta, "musuh" adalah sistem adversarial dan hazards yang mengganggu operasional kereta.*

## Tipe Musuh / Hazard (Minimal 8)

| ID | Nama Tipe | Mekanisme Gangguan | Efek pada Kereta | Counter Pemain |
|----|-----------|--------------------|------------------|----------------|
| ENM-01 | Hujan Lepas | Kurangi faktor kecepatan | Waktu tempuh +30% | Tunggu lalu atau terima keterlambatan |
| ENM-02 | Longsor Tanah | Blokir rel sepenuhnya | Kereta terpaksa berhenti | Cari rute alternatif atau tunggu perbaikan |
| ENM-03 | Sabotase Rel | Kurangi kecepatan 50% | Bahan bakar boros 2× | Perbaiki rel di stasiun berikutnya |
| ENM-04 | Perusahaan Rival | Ambil kontrak sebelum pemain | Kontrak tersedia berkurang | Selesaikan kontrak cepat untuk prioritas |
| ENM-05 | Bandit Rel | Curigakan muatan jika berhenti >5 menit | Hilang 20% muatan | Jeda singkat atau beri pilihan "beresiko" |
| ENM-06 | Kerusakan Mesin | Naikkan konsumsi bahan bakar | Bahan bakar turun 2× lebih cepat | Perawatan rutin di stasiun |
| ENM-07 | Stasiun Macet | Tunda dock 3–10 menit | Waktu delivery melebihi deadline | Pilih stasiun lain jika tersedia |
| ENM-08 | Salju Lebat | Kurangi kecepatan 60% | Efisiensi bahan bakar turun | Upgrade efisiensi atau hindari wilayah |

## Boss

| ID | Nama Boss | Mekanisme | Lokasi | Kondisi Kalah |
|----|-----------|-----------|--------|---------------|
| BOSS-01 | Si Raksasa Rel | Kereta rival yang menempati rute premium | Wilayah 3 | Selesaikan 5 kontrak rute premium di depannya |
| BOSS-02 | Musim Salju Abadi | Event dunia yang membeku wilayah 5 | Wilayah 5 | Kumpulkan 1000 Gold untuk "Pelana Salju" |

## Pseudocode State Machine — Musuh / Hazard

```
STATE HAZARD_MANAGER:
  ENUM State: IDLE, ACTIVE, RESOLVED, ESCALATED

  onTick(deltaTime):
    if state == IDLE:
      if random() < hazardSpawnRate(region):
        state = ACTIVE
        spawnHazard(randomType(region))

    if state == ACTIVE:
      hazard.progress(deltaTime)
      if hazard.isResolved():
        state = RESOLVED
        applyReward(player)
      elif hazard.isEscalated():
        state = ESCALATED
        applyPenalty(player)

    if state == RESOLVED:
      cooldownTimer -= deltaTime
      if cooldownTimer <= 0:
        state = IDLE

STATE TRAIN_AI (musim lawan / rival):
  ENUM State: IDLE, EN_ROUTE, DOCKED, COMPETING

  onContractAvailable(contract):
    if contract.reward > myThreshold:
      state = COMPETING
      claimContract(contract)

  onTick(deltaTime):
    if state == COMPETING:
      if player.claimedFirst():
        state = IDLE
        releaseContract()
      else:
        progressTowardDestination(deltaTime)
```

## Sanity Check: Gangguan vs Integritas Muatan

Adaptasi dari DPS vs HP: "Gangguan per detik" (hazard pressure) vs "Integritas Muatan" (cargo HP).

| Skenario | Tekanan Gangguan (unit/detik) | Integritas Muatan (unit) | Waktu hingga Gagal (detik) |
|----------|-------------------------------|--------------------------|----------------------------|
| Hujan Ringan (ENM-01) | 0.5 | 100 | 200 |
| Longsor (ENM-02) | 5.0 | 100 | 20 |
| Salju Lebat (ENM-07) | 3.0 | 100 | 33 |

**Contoh hitung**: Longsor menutup rel. Tekanan 5 unit/detik, integritas muatan 100 unit. Waktu hingga gagal = 100 / 5 = 20 detik. Pemain harus mencari alternatif dalam 20 detik. [LULUS — memberikan tekanan waktu yang signifikan namun tidak mustahil.]
