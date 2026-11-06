/**
 * Upgrade.js — Sistem upgrade gerbong
 * Ref: docs/03-mechanics.md (Mekanik C: Upgrade Gerbong & Kereta)
 * ID Registry: UPG-CAP-01 (100), UPG-SPD-01 (150), UPG-EFF-01 (200)
 * Rumus: Harga = Base × 1.5^(N-1)
 */

const UPGRADE_TYPES = {
  capacity: { id: 'UPG-CAP-01', basePrice: 100, name: 'Kapasitas Gerbong', unit: 'ton', maxLevel: 5 },
  speed: { id: 'UPG-SPD-01', basePrice: 150, name: 'Kecepatan Kereta', unit: 'km/menit', maxLevel: 5 },
  efficiency: { id: 'UPG-EFF-01', basePrice: 200, name: 'Efisiensi Bahan Bakar', unit: 'faktor', maxLevel: 5 }
};

class UpgradeSystem {
  constructor() {
    this.upgrades = {
      capacity: { level: 0, price: 100 },
      speed: { level: 0, price: 150 },
      efficiency: { level: 0, price: 200 }
    };
  }

  /**
   * Hitung harga upgrade level berikutnya
   * @param {string} type - 'capacity', 'speed', atau 'efficiency'
   * @returns {number} - harga dalam Gold
   */
  getUpgradePrice(type) {
    const currentLevel = this.upgrades[type].level;
    const basePrice = UPGRADE_TYPES[type].basePrice;
    return Math.floor(basePrice * Math.pow(1.5, currentLevel));
  }

  /**
   * Cek apakah upgrade bisa dilakukan
   * @param {string} type
   * @param {number} playerGold
   * @returns {boolean}
   */
  canUpgrade(type, playerGold) {
    const currentLevel = this.upgrades[type].level;
    const maxLevel = UPGRADE_TYPES[type].maxLevel;
    if (currentLevel >= maxLevel) return false;
    return playerGold >= this.getUpgradePrice(type);
  }

  /**
   * Lakukan upgrade
   * @param {string} type
   * @returns {Object|null} - { level, price, benefit } atau null jika gagal
   */
  upgrade(type) {
    if (!this.canUpgrade(type, 0)) return null; // playerGold dicek di pemanggil

    const currentLevel = this.upgrades[type].level;
    const price = this.getUpgradePrice(type);
    this.upgrades[type].level++;
    this.upgrades[type].price = this.getUpgradePrice(type);

    let benefit = '';
    switch (type) {
      case 'capacity':
        benefit = '+2 ton kapasitas muatan';
        break;
      case 'speed':
        benefit = '+5 km/menit kecepatan';
        break;
      case 'efficiency':
        benefit = '-10% konsumsi bahan bakar';
        break;
    }

    return { level: this.upgrades[type].level, price, benefit };
  }

  /**
   * Dapatkan pengali kapasitas berdasarkan level upgrade
   * @returns {number}
   */
  getCapacityMultiplier() {
    return 1 + (this.upgrades.capacity.level * 0.2); // +20% per level
  }

  /**
   * Dapatkan pengali kecepatan berdasarkan level upgrade
   * @returns {number}
   */
  getSpeedMultiplier() {
    return 1 + (this.upgrades.speed.level * 0.1); // +10% per level
  }

  /**
   * Dapatkan pengali efisiensi berdasarkan level upgrade
   * @returns {number}
   */
  getEfficiencyMultiplier() {
    return 1 - (this.upgrades.efficiency.level * 0.1); // -10% per level
  }
}

export { UpgradeSystem, UPGRADE_TYPES };
