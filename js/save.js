/**
 * Save.js — Sistem save/load yang robust
 * Ref: docs/08-technical-spec.md (Struktur Save / Load)
 * Format: JSON, versioned (schemaVersion: 1), auto-save setiap 60 detik
 */

const SAVE_KEY = 'tinyrails-save';
const SAVE_VERSION = 1;
const AUTO_SAVE_INTERVAL = 60000; // 60 detik

class SaveSystem {
  constructor(game) {
    this.game = game;
    this.autoSaveTimer = null;
    this.startAutoSave();
  }

  /**
   * Simpan game ke localStorage
   * @returns {boolean}
   */
  save() {
    try {
      const data = {
        schemaVersion: SAVE_VERSION,
        savedAt: new Date().toISOString(),
        player: {
          gold: this.game.economy.gold,
          xp: this.game.economy.xp,
          level: this.game.economy.level,
          xpNext: this.game.economy.xpNext,
          reputation: this.game.economy.reputation,
          currentRegionId: this.game.currentRegionId,
          questStats: this.game.questSystem?.stats || {},
          completedQuests: this.game.questSystem?.completedQuests || []
        },
        train: {
          id: this.game.train.id,
          speed: this.game.train.speed,
          capacity: this.game.train.capacity,
          fuelCapacity: this.game.train.fuelCapacity,
          fuelCurrent: this.game.train.fuelCurrent,
          efficiency: this.game.train.efficiency,
          state: this.game.train.state,
          upgrades: this.game.train.upgrades
        },
        weather: {
          currentWeather: this.game.weather.currentWeather,
          weatherDuration: this.game.weather.weatherDuration
        },
        hazards: this.game.hazards?.activeHazards || []
      };

      localStorage.setItem(SAVE_KEY, JSON.stringify(data));
      console.log('Game tersimpan:', data.savedAt);
      return true;
    } catch (e) {
      console.error('Gagal menyimpan game:', e);
      return false;
    }
  }

  /**
   * Muat game dari localStorage
   * @returns {boolean} - true jika berhasil memuat
   */
  load() {
    try {
      const saved = localStorage.getItem(SAVE_KEY);
      if (!saved) return false;

      const data = JSON.parse(saved);

      // Validasi schema version
      if (data.schemaVersion !== SAVE_VERSION) {
        console.warn('Versi save tidak cocok, memulai baru');
        return false;
      }

      // Restore player
      this.game.economy.gold = data.player.gold || 0;
      this.game.economy.xp = data.player.xp || 0;
      this.game.economy.level = data.player.level || 1;
      this.game.economy.xpNext = data.player.xpNext || 100;
      this.game.economy.reputation = data.player.reputation || 0;
      this.game.currentRegionId = data.player.currentRegionId || 'WLD-REG-01';

      // Restore quest
      if (this.game.questSystem) {
        this.game.questSystem.stats = data.player.questStats || {};
        this.game.questSystem.completedQuests = data.player.completedQuests || [];
      }

      // Restore train
      this.game.train.fuelCurrent = data.train.fuelCurrent || 50;
      this.game.train.state = data.train.state || 'IDLE';
      this.game.train.upgrades = data.train.upgrades || { capacity: 0, speed: 0, efficiency: 0 };

      // Restore weather
      this.game.weather.currentWeather = data.weather?.currentWeather || 'cerah';
      this.game.weather.weatherDuration = data.weather?.weatherDuration || 0;

      // Restore hazards
      if (data.hazards && this.game.hazards) {
        this.game.hazards.activeHazards = data.hazards;
      }

      console.log('Game dimuat:', data.savedAt);
      return true;
    } catch (e) {
      console.error('Gagal memuat game:', e);
      return false;
    }
  }

  /**
   * Mulai auto-save
   */
  startAutoSave() {
    this.autoSaveTimer = setInterval(() => {
      this.save();
    }, AUTO_SAVE_INTERVAL);
  }

  /**
   * Hentikan auto-save
   */
  stopAutoSave() {
    if (this.autoSaveTimer) {
      clearInterval(this.autoSaveTimer);
      this.autoSaveTimer = null;
    }
  }

  /**
   * Cek apakah ada data tersimpan
   * @returns {boolean}
   */
  hasSaveData() {
    return localStorage.getItem(SAVE_KEY) !== null;
  }

  /**
   * Hapus data tersimpan
   */
  clearSave() {
    localStorage.removeItem(SAVE_KEY);
    this.stopAutoSave();
  }
}

export { SaveSystem, SAVE_KEY, SAVE_VERSION };
