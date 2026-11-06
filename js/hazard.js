/**
 * Hazard.js — Sistem hazard dan boss
 * Ref: docs/06-ai-enemies.md
 * ID Registry: ENM-01..08, BOSS-01, BOSS-02, FEEL-HAZARD-01 (3px, 200ms)
 */

const HAZARD_TYPES = {
  'ENM-01': { id: 'ENM-01', name: 'Hujan Lepas', effect: 'Waktu tempuh +30%', speedPenalty: 0.7, fuelPenalty: 1.0, duration: 120 },
  'ENM-02': { id: 'ENM-02', name: 'Longsor Tanah', effect: 'Blokir rel sepenuhnya', speedPenalty: 0, fuelPenalty: 0, duration: 300 },
  'ENM-03': { id: 'ENM-03', name: 'Sabotase Rel', effect: 'Kecepatan -50%, bahan bakar boros 2x', speedPenalty: 0.5, fuelPenalty: 2.0, duration: 180 },
  'ENM-04': { id: 'ENM-04', name: 'Perusahaan Rival', effect: 'Kontrak tersedia berkurang', speedPenalty: 1.0, fuelPenalty: 1.0, duration: 600 },
  'ENM-05': { id: 'ENM-05', name: 'Bandit Rel', effect: 'Hilang 20% muatan jika berhenti >5 menit', speedPenalty: 1.0, fuelPenalty: 1.0, duration: 300 },
  'ENM-06': { id: 'ENM-06', name: 'Kerusakan Mesin', effect: 'Bahan bakar turun 2x lebih cepat', speedPenalty: 1.0, fuelPenalty: 2.0, duration: 240 },
  'ENM-07': { id: 'ENM-07', name: 'Stasiun Macet', effect: 'Tunda dock 3-10 menit', speedPenalty: 1.0, fuelPenalty: 1.0, duration: 600 },
  'ENM-08': { id: 'ENM-08', name: 'Salju Lebat', effect: 'Kecepatan -60%, efisiensi bahan bakar turun', speedPenalty: 0.4, fuelPenalty: 1.5, duration: 300 }
};

const BOSSES = {
  'BOSS-01': { id: 'BOSS-01', name: 'Si Raksasa Rel', location: 'Wilayah 3', condition: 'Selesaikan 5 kontrak rute premium', defeated: false },
  'BOSS-02': { id: 'BOSS-02', name: 'Musim Salju Abadi', location: 'Wilayah 5', condition: 'Kumpulkan 1000 Gold untuk Pelana Salju', defeated: false }
};

class HazardSystem {
  constructor() {
    this.activeHazards = [];
    this.hazardSpawnRate = 0.1; // 10% chance per check
    this.lastSpawnTime = 0;
    this.spawnInterval = 180; // cek spawn setiap 3 menit
  }

  /**
   * Update sistem hazard
   * @param {number} deltaTime - detik
   * @param {string} regionId - ID wilayah saat ini
   * @returns {Array} - daftar hazard yang baru muncul
   */
  update(deltaTime, regionId) {
    this.lastSpawnTime += deltaTime;
    const newHazards = [];

    if (this.lastSpawnTime >= this.spawnInterval) {
      if (Math.random() < this.hazardSpawnRate) {
        const hazardId = this.randomHazardId();
        const hazard = {
          ...HAZARD_TYPES[hazardId],
          regionId,
          startTime: Date.now(),
          remainingDuration: HAZARD_TYPES[hazardId].duration * 1000
        };
        this.activeHazards.push(hazard);
        newHazards.push(hazard);
      }
      this.lastSpawnTime = 0;
    }

    // Kurangi durasi hazard aktif
    this.activeHazards = this.activeHazards.filter(h => {
      h.remainingDuration -= deltaTime * 1000;
      return h.remainingDuration > 0;
    });

    return newHazards;
  }

  /**
   * Pilih hazard ID secara acak
   * @returns {string}
   */
  randomHazardId() {
    const ids = Object.keys(HAZARD_TYPES);
    return ids[Math.floor(Math.random() * ids.length)];
  }

  /**
   * Dapatkan total penalti kecepatan dari semua hazard aktif
   * @returns {number} - pengali kecepatan (1.0 = tidak ada penalti)
   */
  getTotalSpeedPenalty() {
    if (this.activeHazards.length === 0) return 1.0;
    // Ambil penalti terburik
    const penalties = this.activeHazards.map(h => h.speedPenalty);
    return Math.min(...penalties);
  }

  /**
   * Dapatkan total penalti bahan bakar dari semua hazard aktif
   * @returns {number} - pengali bahan bakar (1.0 = tidak ada penalti)
   */
  getTotalFuelPenalty() {
    if (this.activeHazards.length === 0) return 1.0;
    // Gabungkan semua penalti
    return this.activeHazards.reduce((acc, h) => acc * h.fuelPenalty, 1.0);
  }

  /**
   * Cek apakah ada hazard yang memblokir rel sepenuhnya
   * @returns {boolean}
   */
  isRouteBlocked() {
    return this.activeHazards.some(h => h.id === 'ENM-02');
  }
}

export { HazardSystem, HAZARD_TYPES, BOSSES };
