/**
 * Route.js — Sistem rute dan kontrak (diperbarui untuk Milestone 02)
 * Ref: docs/03-mechanics.md, docs/05-level-world.md
 * ID Registry: CON-DIST-01 (0.8 Gold/km), WLD-REG-01..05
 */

const REGIONS = {
  'WLD-REG-01': { id: 'WLD-REG-01', name: 'Pegalmanan', biome: 'Pegunungan', distanceMin: 50, distanceMax: 150, levelUnlock: 1 },
  'WLD-REG-02': { id: 'WLD-REG-02', name: 'Dataran Indah', biome: 'Dataran Rendah', distanceMin: 100, distanceMax: 250, levelUnlock: 3 },
  'WLD-REG-03': { id: 'WLD-REG-03', name: 'Pantai Biru', biome: 'Pantai', distanceMin: 150, distanceMax: 350, levelUnlock: 5 },
  'WLD-REG-04': { id: 'WLD-REG-04', name: 'Gurun Kering', biome: 'Gurun', distanceMin: 200, distanceMax: 400, levelUnlock: 7 },
  'WLD-REG-05': { id: 'WLD-REG-05', name: 'Salju Abadi', biome: 'Tundra', distanceMin: 300, distanceMax: 500, levelUnlock: 10 }
};

/**
 * Generate daftar rute tersedia untuk suatu wilayah
 * @param {Object} region - { id, name, distanceMin, distanceMax }
 * @param {Object} weatherSystem - WeatherSystem instance
 * @returns {Array<{id, name, distance, weather, weatherFactor, cargoWeight, fuelRequired, reward, regionId}>
 */
function generateRoutes(region, weatherSystem) {
  const routes = [];
  const routeCount = 3;
  const weatherInfo = weatherSystem.getInfo();

  for (let i = 0; i < routeCount; i++) {
    const distance = Math.floor(Math.random() * (region.distanceMax - region.distanceMin + 1)) + region.distanceMin;
    const weather = weatherInfo.id === 'WTH-CLR-01' ? 'cerah' : weatherInfo.id === 'WTH-RNY-01' ? 'hujan' : 'salju';
    const weatherFactor = weatherSystem.getFactor();
    const cargoWeight = Math.floor(Math.random() * 6) + 5; // 5–10 ton
    const fuelNeeded = Math.ceil((distance * cargoWeight * 0.02) / weatherFactor); // TRN-EFF-01

    const cargoType = i === 0 ? 'biasa' : i === 1 ? 'murni' : 'legendaris';
    const basePay = Math.floor(distance * 0.8); // CON-DIST-01
    const cargoBonuses = { biasa: 0, murni: 50, legendaris: 200 };
    const reward = basePay + cargoBonuses[cargoType];

    routes.push({
      id: `route-${region.id}-${Date.now()}-${i + 1}`,
      name: `Rute ${i + 1}: ${region.name}`,
      regionId: region.id,
      regionName: region.name,
      distance,
      weather,
      weatherFactor,
      cargoWeight,
      cargoType,
      fuelRequired: fuelNeeded,
      reward,
      status: 'available'
    });
  }

  return routes;
}

/**
 * Hitung waktu tempuh (detik)
 * Ref: Waktu Tempuh = Jarak / (Kecepatan × Faktor Cuaca)
 * @param {number} distance - km
 * @param {number} speed - km/menit
 * @param {number} weatherFactor - 1.0 cerah, 0.7 hujan, 0.5 salju
 * @returns {number} detik
 */
function calculateTravelTime(distance, speed, weatherFactor) {
  const timeMinutes = distance / (speed * weatherFactor);
  return timeMinutes * 60; // detik
}

/**
 * Hitung konsumsi bahan bakar
 * Ref: Konsumsi = Jarak × Muatan × Efisiensi
 * @param {number} distance - km
 * @param {number} cargoWeight - ton
 * @param {number} efficiency - faktor
 * @param {number} weatherFactor - faktor cuaca
 * @returns {number} unit bahan bakar
 */
function calculateFuelConsumption(distance, cargoWeight, efficiency, weatherFactor) {
  return Math.ceil((distance * cargoWeight * efficiency) / weatherFactor);
}

export { generateRoutes, calculateTravelTime, calculateFuelConsumption, REGIONS };
