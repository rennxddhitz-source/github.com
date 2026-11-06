/**
 * Game.js — Logika utama game (Vertical Slice + Milestone 02)
 * Ref: docs/03-06-mechanics.md, docs/04-progression-economy.md, milestones/01-02
 * Integrasi: Train, Route, UI, Weather, Hazard, Upgrade, Economy
 */

import { Train } from './train.js';
import { generateRoutes, calculateTravelTime, calculateFuelConsumption, REGIONS } from './route.js';
import { WeatherSystem } from './weather.js';
import { HazardSystem } from './hazard.js';
import { UpgradeSystem } from './upgrade.js';
import { EconomySystem } from './economy.js';
import { UI } from './ui.js';

class Game {
  constructor() {
    this.train = new Train();
    this.ui = new UI();
    this.weather = new WeatherSystem();
    this.hazards = new HazardSystem();
    this.upgrades = new UpgradeSystem();
    this.economy = new EconomySystem();

    this.player = {
      level: { current: 1, next: 100 },
      xp: { current: 0, next: 100 },
      gold: 0,
      fuel: { current: 50, capacity: 50 }
    };

    this.currentRegionId = 'WLD-REG-01';
    this.currentRoute = null;
    this.transitStartTime = null;
    this.transitInterval = null;
    this.isPaused = false;
    this.lastTick = Date.now();

    this.init();
  }

  init() {
    document.getElementById('btn-start').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-load').onclick = () => this.loadGame();
    document.getElementById('btn-view-map').onclick = () => this.openMap();
    document.getElementById('btn-view-train').onclick = () => this.viewTrain();
    document.getElementById('btn-view-contracts').onclick = () => this.openMap();
    document.getElementById('btn-back-station').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-back-station-from-result').onclick = () => this.ui.showScreen('station');
    document.getElementById('btn-pause-transit').onclick = () => this.togglePause();

    this.ui.showScreen('main-menu');
    this.ui.updateStationHUD(this.getPlayerState());
    this.startGameLoop();
  }

  startGameLoop() {
    const loop = () => {
      const now = Date.now();
      const deltaTime = (now - this.lastTick) / 1000;
      this.lastTick = now;

      this.weather.update(deltaTime);

      if (this.train.state === 'EN_ROUTE' && !this.isPaused) {
        const hazardUpdates = this.hazards.update(deltaTime, this.currentRegionId);
        this.handleHazardUpdates(hazardUpdates);

        const result = this.train.update(deltaTime);
        if (result) {
          if (result.event === 'ARRIVED') {
            this.finishTransit(result.route);
          } else if (result.event === 'BROKEN_DOWN') {
            this.handleBreakdown();
          }
        }

        this.updateTransitDisplay();
      }

      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  getPlayerState() {
    return {
      fuel: { current: this.train.fuelCurrent, capacity: this.train.fuelCapacity },
      gold: this.economy.gold,
      xp: { current: this.economy.xp, next: this.economy.xpNext },
      level: { current: this.economy.level }
    };
  }

  openMap() {
    const region = REGIONS[this.currentRegionId];
    if (!region) return;

    // Cek unlock level
    if (this.economy.level < region.levelUnlock) {
      alert(`Butuh Level ${region.levelUnlock} untuk membuka ${region.name}`);
      return;
    }

    const routes = generateRoutes(region, this.weather);
    this.ui.renderRoutes(routes, (route) => this.selectRoute(route));
    this.ui.updateMapHUD(this.getPlayerState());
    this.ui.showScreen('map');
  }

  selectRoute(route) {
    const fuelNeeded = route.fuelRequired;
    if (this.train.fuelCurrent < fuelNeeded) {
      alert('Bahan bakar tidak cukup untuk rute ini!');
      return;
    }

    // Cek hazard blokir
    if (this.hazards.isRouteBlocked()) {
      alert('Rute tersedia sedang diblokir oleh hazard! Tunggu hingga hilang.');
      return;
    }

    this.currentRoute = route;
    this.train.fuelCurrent -= fuelNeeded;

    const speedMultiplier = this.upgrades.getSpeedMultiplier();
    const weatherFactor = route.weatherFactor;
    const effectiveSpeed = this.train.speed * speedMultiplier;

    const travelTimeSeconds = calculateTravelTime(route.distance, effectiveSpeed, weatherFactor);

    this.ui.showScreen('transit');
    this.transitStartTime = Date.now();
    this.isPaused = false;

    this.transitInterval = setInterval(() => {
      if (this.isPaused) return;

      const now = Date.now();
      const elapsedSeconds = (now - this.transitStartTime) / 1000;
      const progressPercent = Math.min(100, (elapsedSeconds / travelTimeSeconds) * 100);
      const remainingSeconds = Math.max(0, travelTimeSeconds - elapsedSeconds);

      // Kurangi bahan bakar secara bertahap
      const fuelBurnPerTick = (fuelNeeded / travelTimeSeconds) * 0.1;
      const fuelPenalty = this.hazards.getTotalFuelPenalty();
      this.train.fuelCurrent = Math.max(0, this.train.fuelCurrent - (fuelBurnPerTick * fuelPenalty));

      this.ui.updateTransitHUD(this.train, {
        etaSeconds: remainingSeconds,
        progressPercent
      });

      if (progressPercent >= 100) {
        clearInterval(this.transitInterval);
        this.finishTransit(route);
      }
    }, 100);
  }

  handleHazardUpdates(newHazards) {
    newHazards.forEach(hazard => {
      this.ui.addTransitLog(`⚠️ ${hazard.name}: ${hazard.effect}`);
      if (hazard.id === 'ENM-02') {
        this.ui.addTransitLog('Rel diblokir! Tunggu hazard hilang atau cari alternatif.');
      }
    });
  }

  handleBreakdown() {
    clearInterval(this.transitInterval);
    this.ui.showScreen('station');
    alert('Kereta rusak! Biaya rescue: 50 Gold.');
    this.ui.updateStationHUD(this.getPlayerState());
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    document.getElementById('btn-pause-transit').textContent = this.isPaused ? 'Lanjutkan' : 'Jeda';
  }

  finishTransit(route) {
    const reward = this.economy.getContractReward(route.distance, route.cargoType);
    const xpGain = 25; // PLR-XP-02

    this.economy.addGold(reward);
    const leveledUp = this.economy.addXP(xpGain);

    this.train.state = 'IDLE';
    this.currentRoute = null;

    this.ui.updateStationHUD(this.getPlayerState());
    this.ui.showResult({
      gold: reward,
      xp: xpGain,
      route,
      leveledUp
    });

    if (leveledUp) {
      setTimeout(() => alert(`Selamat! Anda naik ke Level ${this.economy.level}!`), 500);
    }
  }

  viewTrain() {
    const capMult = this.upgrades.getCapacityMultiplier();
    const spdMult = this.upgrades.getSpeedMultiplier();
    const effMult = this.upgrades.getEfficiencyMultiplier();
    alert(
      `Kereta: ${this.train.id}
` +
      `Kapasitas: ${Math.floor(this.train.capacity * capMult)} ton
` +
      `Kecepatan: ${(this.train.speed * spdMult).toFixed(1)} km/menit
` +
      `Bahan bakar: ${Math.floor(this.train.fuelCurrent)}/${this.train.fuelCapacity}
` +
      `Efisiensi: ${(this.train.efficiency * effMult).toFixed(4)}
` +
      `Cuaca: ${this.weather.getInfo().name}
` +
      `Level: ${this.economy.level}`
    );
  }

  loadGame() {
    const saved = localStorage.getItem('tinyrails-save');
    if (saved) {
      const data = JSON.parse(saved);
      this.economy.gold = data.player?.gold ?? 0;
      this.economy.xp = data.player?.xp ?? 0;
      this.economy.level = data.player?.level ?? 1;
      this.economy.xpNext = data.player?.xpNext ?? 100;
      this.train.fuelCurrent = data.train?.fuelCurrent ?? 50;
      this.currentRegionId = data.player?.currentRegionId ?? 'WLD-REG-01';
      this.ui.updateStationHUD(this.getPlayerState());
      this.ui.showScreen('station');
    } else {
      alert('Tidak ada data tersimpan.');
    }
  }

  saveGame() {
    const data = {
      player: {
        gold: this.economy.gold,
        xp: this.economy.xp,
        level: this.economy.level,
        xpNext: this.economy.xpNext,
        currentRegionId: this.currentRegionId
      },
      train: {
        fuelCurrent: this.train.fuelCurrent,
        speed: this.train.speed,
        capacity: this.train.capacity,
        efficiency: this.train.efficiency
      }
    };
    localStorage.setItem('tinyrails-save', JSON.stringify(data));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.game = new Game();
});
