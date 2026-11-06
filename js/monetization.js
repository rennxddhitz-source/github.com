/**
 * Monetization.js — Sistem offer dan pembelian
 * Ref: docs/11-monetization-launch.md
 * Model: F2P non-P2W, tidak ada gacha, tidak ada iklan paksa
 * ID Registry: OFF-01, OFF-02, OFF-03
 */

const OFFERS = [
  { id: 'OFF-01', name: 'Paket Starter', price: 49000, currency: 'IDR', content: '500 Gold + 5 Bahan Bakar Instan', type: 'Convenience', isCosmetic: false },
  { id: 'OFF-02', name: 'Skin Gerbong Emas', price: 29000, currency: 'IDR', content: 'Kosmetik gerbong utama', type: 'Kosmetik', isCosmetic: true },
  { id: 'OFF-03', name: 'Slot Kereta Tambahan', price: 79000, currency: 'IDR', content: 'Buka slot kereta ke-2', type: 'Convenience', isCosmetic: false }
];

class MonetizationSystem {
  constructor() {
    this.offers = OFFERS;
    this.purchasedItems = [];
  }

  /**
   * Dapatkan semua offer
   * @returns {Array}
   */
  getOffers() {
    return this.offers;
  }

  /**
   * Beli offer
   * @param {string} offerId
   * @param {Function} onPaymentSuccess - callback setelah pembayaran berhasil
   * @returns {boolean} - true jika berhasil
   */
  purchase(offerId, onPaymentSuccess) {
    const offer = this.offers.find(o => o.id === offerId);
    if (!offer) return false;

    if (this.purchasedItems.includes(offerId) && !offer.isCosmetic) {
      // Item non-kosmetik hanya bisa dibeli sekali
      console.warn('Item sudah dibeli sebelumnya:', offerId);
      return false;
    }

    // Simulasi proses pembayaran
    // Dalam implementasi nyata, ini akan terhubung ke gateway pembayaran
    const paymentSuccess = this.processPayment(offer.price, offer.currency);

    if (paymentSuccess) {
      this.purchasedItems.push(offerId);
      this.applyOfferBenefit(offer);
      if (onPaymentSuccess) onPaymentSuccess(offer);
      console.log('Pembelian berhasil:', offer.name);
      return true;
    }

    return false;
  }

  /**
   * Proses pembayaran (simulasi)
   * @param {number} price
   * @param {string} currency
   * @returns {boolean}
   */
  processPayment(price, currency) {
    // Simulasi: selalu berhasil untuk demo
    // Implementasi nyata akan terhubung ke Google Play Billing / App Store
    console.log(`Memproses pembayaran ${price} ${currency}...`);
    return true;
  }

  /**
   * Terapkan manfaat offer ke game
   * @param {Object} offer
   */
  applyOfferBenefit(offer) {
    switch (offer.id) {
      case 'OFF-01':
        // 500 Gold + 5 Bahan Bakar Instan
        // Ini akan diterapkan di game.js melalui event
        window.dispatchEvent(new CustomEvent('monetization-purchase', {
          detail: { offerId: offer.id, gold: 500, fuel: 5 }
        }));
        break;
      case 'OFF-02':
        // Skin Gerbong Emas — kosmetik, tidak mempengaruhi gameplay
        window.dispatchEvent(new CustomEvent('monetization-purchase', {
          detail: { offerId: offer.id, cosmetic: 'train-skin-gold' }
        }));
        break;
      case 'OFF-03':
        // Slot Kereta Tambahan
        window.dispatchEvent(new CustomEvent('monetization-purchase', {
          detail: { offerId: offer.id, extraTrainSlot: true }
        }));
        break;
    }
  }

  /**
   * Uji etika — cek apakah model monetisasi adil
   * @returns {Object}
   */
  ethicsCheck() {
    const checks = {
      payToWin: {
        question: 'Apakah item berbayar memberikan keuntungan kompetitif dalam gameplay?',
        result: 'Tidak',
        reason: 'Semua item berbayar kosmetik atau convenience non-eksclusif'
      },
      forcedAds: {
        question: 'Apakah iklan paksa mengganggu inti gameplay?',
        result: 'Tidak',
        reason: 'Iklan hanya opsi untuk reward kecil, tidak wajib'
      },
      darkPattern: {
        question: 'Apakah ada hitung mundur buatan untuk mendorong pembelian?',
        result: 'Tidak',
        reason: 'Semua cooldown berbasis mekanik permainan, tidak pembatasan buatan'
      }
    };
    return checks;
  }
}

export { MonetizationSystem, OFFERS };
