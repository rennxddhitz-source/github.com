/**
 * Train.js — Kelas Train dengan state machine
 * Ref: docs/08-technical-spec.md (State Machine Kereta)
 * ID Registry: TRN-SPD-01, TRN-CAP-01, TRN-FUEL-01, TRN-EFF-01
 */

class Train {
  constructor(id = 'PLR-TRN-01') {
    this.id = id;
    this.state = 'IDLE'; // IDLE, DEPARTING, EN_ROUTE, DOCKING, REFUELING, BROKEN_DOWN

    // Stat dasar (dari data/registry)
    this.speed = 20; // TRN-SPD-01: km/menit
    this.capacity = 10; // TRN-CAP-01: ton
    this.fuelCapacity = 50; // TRN-FUEL-01: unit
    this.fuelCurrent = 50;
    this.efficiency = 0.02; // TRN-EFF-01: faktor/ton/km

    // State runtime
    this.currentRoute = null;
    this.distanceCovered = 0;
    this.fuelConsumptionRate = 0; // unit per detik
    this.cargo = [];
    this.upgrades = { capacity: 0, speed: 0, efficiency: 0 };
  }

  /**
   * Mulai perjalanan ke rute yang dipilih
   * @param {Object} route - { id, distance, weather, reward, fuelRequired }
   * @returns {boolean} - true jika berhasil berangkat
   */
  depart(route) {
    const fuelNeeded = route.distance * route.cargoWeight * this.efficiency;

    if (this.fuelCurrent < fuelNeeded) {
      this.state = 'IDLE';
      return false; // Bahan bakar tidak cukup
    }

    this.currentRoute = route;
    this.distanceCovered = 0;
    this.fuelConsumptionRate = (route.distance * route.cargoWeight * this.efficiency) / (route.distance / this.speed * 60);
    this.state = 'DEPARTING';
    return true;
  }

  /**
   * Update state machine setiap tick
   * @param {number} deltaTime - detik sejak frame terakhir
   * @returns {Object|null} - { event: 'ARRIVED' | 'BROKEN_DOWN', data } atau null
   */
  update(deltaTime) {
    if (this.state === 'EN_ROUTE') {
      this.distanceCovered += (this.speed / 60) * deltaTime; // km per detik
      this.fuelCurrent -= this.fuelConsumptionRate * deltaTime;

      if (this.fuelCurrent <= 0) {
        this.fuelCurrent = 0;
        this.state = 'BROKEN_DOWN';
        return { event: 'BROKEN_DOWN', train: this };
      }

      if (this.distanceCovered >= this.currentRoute.distance) {
        this.distanceCovered = this.currentRoute.distance;
        this.state = 'DOCKING';
        return { event: 'ARRIVED', train: this, route: this.currentRoute };
      }
    }

    return null;
  }

  /**
   * Selesaikan docking dan klaim reward
   * @returns {Object} - { gold, xp }
   */
  completeRoute() {
    const reward = this.currentRoute.reward;
    const xp = 25; // PLR-XP-02: XP gain delivery biasa
    this.state = 'IDLE';
    this.currentRoute = null;
    this.distanceCovered = 0;
    return { gold: reward, xp };
  }

  /**
   * Rescue kereta dari BROKEN_DOWN
   * @param {number} cost - biaya rescue (default 50 Gold, ECN-SNK-03)
   * @returns {boolean}
   */
  rescue(cost = 50) {
    if (this.state !== 'BROKEN_DOWN') return false;
    this.fuelCurrent = this.fuelCapacity * 0.2; // Isi 20% tangki
    this.state = 'IDLE';
    return true;
  }

  /**
   * Hitung persentase progres perjalanan
   * @returns {number} 0–100
   */
  getProgress() {
    if (!this.currentRoute) return 0;
    return Math.min(100, (this.distanceCovered / this.currentRoute.distance) * 100);
  }

  /**
   * Hitung ETA sisa (detik)
   * @returns {number}
   */
  getETA() {
    if (!this.currentRoute || this.state !== 'EN_ROUTE') return 0;
    const remainingDistance = this.currentRoute.distance - this.distanceCovered;
    const timeMinutes = remainingDistance / this.speed;
    return timeMinutes * 60; // detik
  }
}

export { Train };
