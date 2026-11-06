/**
 * Game.js — Logika utama game (Vertical Slice)
 * Ref: docs/03-mechanics.md, docs/04-progression-economy.md, milestones/01-vertical-slice.md
 * Integrasi: Train, Route, UI
 */

import { Train } from './train.js';
import { generateRoutes, calculateTravelTime, REGION_WELD_01 } from './route.js';
import { UI } from './ui.js';

class Game {
  constructor() {
    this.train = new Train();
    this.ui = new UI();
    this.player = {
      level: { current: 1, next: 100 }, // PLR-LVL-01, PLR-LVL-02
      xp: { current: 0, next: 100 },
      gold: 0,
      fuel: { current: 50, capacity: 50 } // TRN-FUEL-01
    };

    this.currentRoute = null;
    this.transitStartTime = null;
    this.transitInterval = null;
    this.isPaused = false;

    this.init();
  }

  init() {
    // Event listeners
    document.getElementById('btn-start').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-load').onclick = () => this.loadGame();
    document.getElementById('btn-view-map').onclick = () => this.openMap();
    document.getElementById('btn-view-train').onclick = () => this.viewTrain();
    document.getElementById('btn-view-contracts').onclick = () => this.openMap();
    document.getElementById('btn-back-station').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-back-station-from-result').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-pause-transit').onclick = () => this.togglePause();

    this.ui.showScreen('main-menu');
    this.ui.updateStationHUD(this.player);
  }

  openMap() {
    const routes = generateRoutes(REGION_WELD_01);
    this.ui.renderRoutes(routes, (route) => this.selectRoute(route));
    this.ui.updateMapHUD(this.player);
    this.ui.showScreen('map');
  }

  selectRoute(route) {
    // Cek bahan bakar mencukupi
    const fuelNeeded = route.fuelRequired;
    if (this.player.fuel.current < fuelNeeded) {
      alert('Bahan bakar tidak cukup untuk rute ini!');
      return;
    }

    this.currentRoute = route;
    this.player.fuel.current -= fuelNeeded;
    this.ui.updateStationHUD(this.player);

    // Mulai transit
    this.startTransit(route);
  }

  startTransit(route) {
    this.ui.showScreen('transit');
    this.transitStartTime = Date.now();
    this.isPaused = false;

    const travelTimeSeconds = calculateTravelTime(route.distance, this.train.speed, route.weatherFactor);

    this.transitInterval = setInterval(() => {
      if (this.isPaused) return;

      const now = Date.now();
      const elapsedSeconds = (now - this.transitStartTime) / 1000;
      const progressPercent = Math.min(100, (elapsedSeconds / travelTimeSeconds) * 100);
      const remainingSeconds = Math.max(0, travelTimeSeconds - elapsedSeconds);

      // Kurangi bahan bakar secara bertahap selama transit
      const fuelBurnPerTick = (fuelNeeded / (travelTimeSeconds / 1));
      this.player.fuel.current = Math.max(0, this.player.fuel.current - fuelBurnPerTick);

      this.ui.updateTransitHUD(this.train, {
        etaSeconds: remainingSeconds,
        progressPercent
      });

      if (progressPercent >= 100) {
        this.finishTransit(route);
      }
    }, 100);
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    document.getElementById('btn-pause-transit').textContent = this.isPaused ? 'Lanjutkan' : 'Jeda';
  }

  finishTransit(route) {
    clearInterval(this.transitInterval);
    const result = this.train.completeRoute();

    this.player.gold += result.gold;
    this.player.xp.current += result.xp;

    // Cek naik level
    if (this.player.xp.current >= this.player.xp.next) {
      this.player.level.current++;
      this.player.xp.current = 0;
      this.player.xp.next = Math.floor(this.player.xp.next * 1.4); // PLR-LVL-02
    }

    this.ui.updateStationHUD(this.player);
    this.ui.showResult({
      gold: result.gold,
      xp: result.xp,
      route
    });
  }

  viewTrain() {
    alert(`Kereta: ${this.train.id}
Kapasitas: ${this.train.capacity} ton
Bahan bakar: ${this.train.fuelCurrent}/${this.train.fuelCapacity}
Efisiensi: ${this.train.efficiency}`);
  }

  loadGame() {
    const saved = localStorage.getItem('tinyrails-save');
    if (saved) {
      const data = JSON.parse(saved);
      this.player = data.player;
      this.train = Object.assign(this.train, data.train);
      this.ui.updateStationHUD(this.player);
      this.ui.showScreen('station');
    } else {
      alert('Tidak ada data tersimpan.');
    }
  }

  saveGame() {
    const data = {
      player: this.player,
      train: this.train
    };
    localStorage.setItem('tinyrails-save', JSON.stringify(data));
  }
}

// Inisialisasi game saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
