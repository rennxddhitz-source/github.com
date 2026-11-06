/**
 * Economy.js — Manajemen ekonomi game
 * Ref: docs/04-progression-economy.md
 * ID Registry: ECN-FUEL-01 (2 Gold/unit), ECN-SNK-01..03, ECN-SRC-01..03
 */

class EconomySystem {
  constructor() {
    this.gold = 0;
    this.xp = 0;
    this.level = 1;
    this.xpNext = 100; // PLR-LVL-01
    this.reputation = 0;
    this.totalEarned = 0;
    this.totalSpent = 0;
  }

  /**
   * Tambah gold dari delivery
   * @param {number} amount
   */
  addGold(amount) {
    this.gold += amount;
    this.totalEarned += amount;
  }

  /**
   * Kurangi gold untuk pembelian
   * @param {number} amount
   * @returns {boolean} - true jika berhasil
   */
  spendGold(amount) {
    if (this.gold < amount) return false;
    this.gold -= amount;
    this.totalSpent += amount;
    return true;
  }

  /**
   * Tambah XP
   * @param {number} amount
   * @returns {boolean} - true jika naik level
   */
  addXP(amount) {
    this.xp += amount;
    if (this.xp >= this.xpNext) {
      this.level++;
      this.xp = this.xp - this.xpNext;
      this.xpNext = Math.floor(this.xpNext * 1.4); // PLR-LVL-02
      return true; // naik level
    }
    return false;
  }

  /**
   * Hitung biaya bahan bakar
   * @param {number} units - jumlah unit bahan bakar
   * @returns {number} - biaya dalam Gold
   */
  getFuelCost(units) {
    return units * 2; // ECN-FUEL-01: 2 Gold per unit
  }

  /**
   * Hitung reward kontrak
   * @param {number} distance - jarak dalam km
   * @param {string} cargoType - 'biasa', 'murni', 'legendaris'
   * @returns {number} - reward dalam Gold
   */
  getContractReward(distance, cargoType) {
    const basePay = Math.floor(distance * 0.8); // CON-DIST-01: 0.8 Gold/km
    const bonuses = { biasa: 0, murni: 50, legendaris: 200 };
    return basePay + (bonuses[cargoType] || 0);
  }

  /**
   * Dapatkan statistik ekonomi
   * @returns {Object}
   */
  getStats() {
    return {
      gold: this.gold,
      xp: this.xp,
      xpNext: this.xpNext,
      level: this.level,
      reputation: this.reputation,
      totalEarned: this.totalEarned,
      totalSpent: this.totalSpent,
      net: this.totalEarned - this.totalSpent
    };
  }
}

export { EconomySystem };
