/**
 * Route.js — Sistem rute dan kontrak
 * Ref: docs/03-mechanics.md (Mekanik D: Sistem Kontrak & Ekonomi Rute)
 * ID Registry: CON-DIST-01 (0.8 Gold/km), CON-PAY-01/02, ECN-FUEL-01
 */

const REGION_WELD_01 = {
  id: 'WLD-REG-01',
  name: 'Pegalmanan',
  biome: 'Pegunungan',
  distanceMin: 50,
  distanceMax: 150
};

/**
 * Generate daftar rute tersedia untuk suatu wilayah
 * @param {Object} region - { id, name, distanceMin, distanceMax }
 * @returns {Array<{id, name, distance, weather, reward, fuelRequired, cargoWeight}>
 */
function generateRoutes(region) {
  const routes = [];
  const routeCount = 3;

  for (let i = 0; i < routeCount; i++) {
    const distance = Math.floor(Math.random() * (region.distanceMax - region.distanceMin + 1)) + region.distanceMin;
    const weather = Math.random() < 0.3 ? 'hujan' : 'cerah';
    const weatherFactor = weather === 'hujan' ? 0.7 : 1.0; // WTH-RNY-01 / WTH-CLR-01
    const cargoWeight = Math.floor(Math.random() * 6) + 5; // 5–10 ton
    const fuelNeeded = Math.ceil((distance * cargoWeight * 0.02) / weatherFactor); // TRN-EFF-01

    // Bayaran: jarak × 0.8 + bonus jenis barang (CON-DIST-01)
    const basePay = Math.floor(distance * 0.8);
    const cargoBonus = i === 0 ? 0 : i === 1 ? 50 : 200; // Biasa, Murni, Legendaris
    const reward = basePay + cargoBonus;

    routes.push({
      id: `route-${region.id}-${i + 1}`,
      name: `Rute ${i + 1}: ${region.name}`,
      distance,
      weather,
      weatherFactor,
      cargoWeight,
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
 * @param {number} weatherFactor - 1.0 cerah, 0.7 hujan
 * @returns {number} detik
 */
function calculateTravelTime(distance, speed, weatherFactor) {
  const timeMinutes = distance / (speed * weatherFactor);
  return timeMinutes * 60; // detik
}

export { generateRoutes, calculateTravelTime, REGION_WELD_01 };
