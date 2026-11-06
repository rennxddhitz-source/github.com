/**
 * Weather.js — Sistem cuaca dinamis
 * Ref: docs/03-mechanics.md (Mekanik A: Sistem Jarak & Waktu Tempuh)
 * ID Registry: WTH-CLR-01 (1.0), WTH-RNY-01 (0.7), WTH-SNY-01 (0.5)
 */

const WEATHER_TYPES = {
  cerah: { id: 'WTH-CLR-01', factor: 1.0, name: 'Cerah', color: '#87CEEB' },
  hujan: { id: 'WTH-RNY-01', factor: 0.7, name: 'Hujan', color: '#4a90e2' },
  salju: { id: 'WTH-SNY-01', factor: 0.5, name: 'Salju', color: '#ffffff' }
};

class WeatherSystem {
  constructor() {
    this.currentWeather = 'cerah';
    this.weatherDuration = 0; // detik
    this.weatherChangeInterval = 300; // ganti cuaca setiap 5 menit (300 detik)
  }

  /**
   * Update cuaca setiap tick
   * @param {number} deltaTime - detik
   */
  update(deltaTime) {
    this.weatherDuration += deltaTime;
    if (this.weatherDuration >= this.weatherChangeInterval) {
      this.changeWeather();
      this.weatherDuration = 0;
    }
  }

  /**
   * Ganti cuaca secara acak
   */
  changeWeather() {
    const types = Object.keys(WEATHER_TYPES);
    this.currentWeather = types[Math.floor(Math.random() * types.length)];
    console.log(`Cuaca berubah menjadi: ${WEATHER_TYPES[this.currentWeather].name}`);
  }

  /**
   * Dapatkan faktor cuaca saat ini
   * @returns {number} - 1.0, 0.7, atau 0.5
   */
  getFactor() {
    return WEATHER_TYPES[this.currentWeather].factor;
  }

  /**
   * Dapatkan informasi cuaca lengkap
   * @returns {Object}
   */
  getInfo() {
    return WEATHER_TYPES[this.currentWeather];
  }
}

export { WeatherSystem, WEATHER_TYPES };
