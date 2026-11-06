/**
 * UI.js — Manajemen UI dan HUD
 * Ref: docs/10-ui-ux.md
 * ID Registry: HUD-01..04, UI-TRN-01..03, UI-FEEL-01..03
 */

class UI {
  constructor() {
    this.screens = {
      'main-menu': document.getElementById('screen-main-menu'),
      'station': document.getElementById('screen-station'),
      'map': document.getElementById('screen-map'),
      'transit': document.getElementById('screen-transit'),
      'result': document.getElementById('screen-result')
    };

    this.hudElements = {
      fuel: document.getElementById('val-fuel'),
      gold: document.getElementById('val-gold'),
      xp: document.getElementById('val-xp'),
      level: document.getElementById('val-level'),
      mapFuel: document.getElementById('map-val-fuel'),
      mapGold: document.getElementById('map-val-gold'),
      transitFuel: document.getElementById('transit-val-fuel'),
      transitEta: document.getElementById('transit-val-eta'),
      transitProgress: document.getElementById('transit-val-progress'),
      progressFill: document.getElementById('progress-fill'),
      transitLog: document.getElementById('transit-log')
    };
  }

  /**
   * Tampilkan layar tertentu, sembunyikan yang lain
   * @param {string} screenId
   */
  showScreen(screenId) {
    Object.values(this.screens).forEach(screen => screen.classList.remove('active'));
    if (this.screens[screenId]) {
      this.screens[screenId].classList.add('active');
    }
  }

  /**
   * Update HUD stasiun
   * @param {Object} player - { fuel, gold, xp, level }
   */
  updateStationHUD(player) {
    this.hudElements.fuel.textContent = Math.floor(player.fuel.current);
    this.hudElements.gold.textContent = player.gold;
    this.hudElements.xp.textContent = `${player.xp.current}/${player.xp.next}`;
    this.hudElements.level.textContent = player.level.current;

    // UI-FEEL-03: Shake jika bahan bakar < 5 unit
    const fuelBar = document.getElementById('hud-fuel');
    if (player.fuel.current < 5) {
      fuelBar.classList.add('shake-warning');
    } else {
      fuelBar.classList.remove('shake-warning');
    }
  }

  /**
   * Update HUD peta
   * @param {Object} player
   */
  updateMapHUD(player) {
    this.hudElements.mapFuel.textContent = Math.floor(player.fuel.current);
    this.hudElements.mapGold.textContent = player.gold;
  }

  /**
   * Update HUD transit
   * @param {Object} train - { fuelCurrent, fuelCapacity }
   * @param {Object} transit - { etaSeconds, progressPercent }
   */
  updateTransitHUD(train, transit) {
    this.hudElements.transitFuel.textContent = Math.floor(train.fuelCurrent);
    this.hudElements.transitEta.textContent = this.formatTime(transit.etaSeconds);
    this.hudElements.transitProgress.textContent = Math.round(transit.progressPercent);
    this.hudElements.progressFill.style.width = `${transit.progressPercent}%`;
  }

  /**
   * Tambah log ke layar transit
   * @param {string} message
   */
  addTransitLog(message) {
    const log = this.hudElements.transitLog;
    log.textContent = message;
  }

  /**
   * Render daftar rute di layar peta
   * @param {Array} routes
   * @param {Function} onSelectRoute
   */
  renderRoutes(routes, onSelectRoute) {
    const container = document.getElementById('route-list');
    container.innerHTML = '';

    routes.forEach(route => {
      const card = document.createElement('div');
      card.className = 'route-card';
      card.innerHTML = `
        <h4>${route.name}</h4>
        <p>Jarak: ${route.distance} km</p>
        <p>Cuaca: ${route.weather}</p>
        <p>Bahan bakar butuh: ${route.fuelRequired} unit</p>
        <p>Reward: ${route.reward} Gold</p>
        <p>Muatan: ${route.cargoWeight} ton</p>
      `;
      card.onclick = () => onSelectRoute(route);
      container.appendChild(card);
    });
  }

  /**
   * Tampilkan hasil delivery
   * @param {Object} result - { gold, xp, route }
   */
  showResult(result) {
    const container = document.getElementById('result-details');
    container.innerHTML = `
      <div class="result-item gold">+${result.gold} Gold</div>
      <div class="result-item xp">+${result.xp} XP</div>
      <p>Rute: ${result.route.name}</p>
      <p>Jarak: ${result.route.distance} km</p>
    `;
    this.showScreen('result');
  }

  /**
   * Format detik menjadi mm:ss
   * @param {number} seconds
   * @returns {string}
   */
  formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
}

export { UI };
