/**
 * Quest.js — Sistem quest dan narasi
 * Ref: docs/07-narrative-quests.md
 * ID Registry: QST-01 s.d. QST-10, NPC-01 s.d. NPC-05
 */

const QUESTS = [
  { id: 'QST-01', title: 'Gerbong Pertama', giver: 'Pak Entis', objective: 'Selesaikan 1 rute Pegalmanan', rewardGold: 100, rewardXP: 25, type: 'Tutorial', required: { routesCompleted: 1, region: 'WLD-REG-01' } },
  { id: 'QST-02', title: 'Antrik Pesawat', giver: 'Ibu Lina', objective: 'Kirim paket ke Dataran Indah', rewardGold: 150, rewardXP: 40, type: 'Delivery', required: { routesCompleted: 1, region: 'WLD-REG-02' } },
  { id: 'QST-03', title: 'Bahan Bakar Habis', giver: 'Pak Entis', objective: 'Selamatkan kereta dari macet', rewardGold: 50, rewardXP: 20, type: 'Rescue', required: { rescueCount: 1 } },
  { id: 'QST-04', title: 'Kontrak Rival', giver: 'Rival Dara', objective: 'Kalahkan rencana kereta lawan', rewardGold: 200, rewardXP: 60, type: 'Kompetisi', required: { premiumRoutesCompleted: 1 } },
  { id: 'QST-05', title: 'Barang Langka', giver: 'Nenek Sari', objective: 'Antar barang rawan ke Pantai Biru', rewardGold: 300, rewardXP: 100, type: 'Spesial', required: { routesCompleted: 1, region: 'WLD-REG-03' } },
  { id: 'QST-06', title: 'Darurat Medis', giver: 'Mas Arief', objective: 'Kirim obat dalam waktu terbatas', rewardGold: 250, rewardXP: 80, type: 'Timed', required: { routesCompleted: 1, region: 'WLD-REG-02' } },
  { id: 'QST-07', title: 'Upgrade Mesin', giver: 'Pak Entis', objective: 'Upgrade efisiensi ke level 2', rewardGold: 100, rewardXP: 50, type: 'Progresi', required: { upgradeEfficiencyLevel: 2 } },
  { id: 'QST-08', title: 'Rute Salju', giver: 'Ibu Lina', objective: 'Buka wilayah Salju Abadi', rewardGold: 500, rewardXP: 200, type: 'Unlock', required: { levelReached: 10 } },
  { id: 'QST-09', title: 'Perompakan Rel', giver: 'Bandit Rel (event)', objective: 'Hentikan pencurian muatan', rewardGold: 100, rewardXP: 30, type: 'Pertahanan', required: { hazardSurvived: 1 } },
  { id: 'QST-10', title: 'Raja Kereta', giver: 'Semua NPC', objective: 'Selesaikan semua wilayah', rewardGold: 1000, rewardXP: 500, type: 'Finale', required: { allRegionsCompleted: true } }
];

const NPCS = [
  { id: 'NPC-01', name: 'Pak Entis', role: 'Mentor tukang mesin', relationship: 'Memberikan tutorial awal dan perawatan' },
  { id: 'NPC-02', name: 'Ibu Lina', role: 'Manajer stasiun pusat', relationship: 'Memberikan kontrak awal dan reputasi' },
  { id: 'NPC-03', name: 'Rival Dara', role: 'Pemilik kereta lawan', relationship: 'Antagonis utama, mengajak kompetisi rute' },
  { id: 'NPC-04', name: 'Mas Arief', role: 'Kurir peat', relationship: 'Memberikan quest pengiriman darurat' },
  { id: 'NPC-05', name: 'Nenek Sari', role: 'Kolektor barang langka', relationship: 'Memberikan quest muatan spesial' }
];

class QuestSystem {
  constructor() {
    this.quests = QUESTS.map(q => ({ ...q, status: 'available', progress: 0 }));
    this.completedQuests = [];
    this.currentQuest = null;
    this.stats = {
      routesCompleted: 0,
      routesByRegion: {},
      rescueCount: 0,
      premiumRoutesCompleted: 0,
      upgradeEfficiencyLevel: 0,
      hazardSurvived: 0,
      levelReached: 1,
      allRegionsCompleted: false
    };
  }

  /**
   * Dapatkan quest yang tersedia untuk level dan wilayah tertentu
   * @param {number} playerLevel
   * @param {string} currentRegionId
   * @returns {Array}
   */
  getAvailableQuests(playerLevel, currentRegionId) {
    return this.quests.filter(q => {
      if (q.status !== 'available') return false;
      // Cek prerequisite quest
      const qIndex = QUESTS.findIndex(x => x.id === q.id);
      if (qIndex > 0) {
        const prevQuest = this.quests[qIndex - 1];
        if (!this.completedQuests.includes(prevQuest.id)) return false;
      }
      return true;
    });
  }

  /**
   * Mulai quest
   * @param {string} questId
   * @returns {boolean}
   */
  startQuest(questId) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest || quest.status !== 'available') return false;
    quest.status = 'active';
    this.currentQuest = quest;
    return true;
  }

  /**
   * Update progres quest
   * @param {string} statKey
   * @param {number} value
   */
  updateStat(statKey, value) {
    if (this.stats[statKey] !== undefined) {
      this.stats[statKey] += value;
      this.checkQuestCompletion();
    }
  }

  /**
   * Cek apakah ada quest yang selesai
   */
  checkQuestCompletion() {
    for (const quest of this.quests) {
      if (quest.status !== 'active') continue;

      let completed = true;
      for (const [key, requiredValue] of Object.entries(quest.required)) {
        if (this.stats[key] < requiredValue) {
          completed = false;
          break;
        }
      }

      if (completed) {
        this.completeQuest(quest.id);
      }
    }
  }

  /**
   * Selesaikan quest dan klaim reward
   * @param {string} questId
   * @returns {Object|null} - { gold, xp, quest }
   */
  completeQuest(questId) {
    const quest = this.quests.find(q => q.id === questId);
    if (!quest || quest.status !== 'active') return null;

    quest.status = 'completed';
    this.completedQuests.push(questId);
    this.currentQuest = null;

    return { gold: quest.rewardGold, xp: quest.rewardXP, quest };
  }

  /**
   * Dapatkan semua quest dengan status
   * @returns {Array}
   */
  getAllQuests() {
    return this.quests;
  }
}

export { QuestSystem, QUESTS, NPCS };
