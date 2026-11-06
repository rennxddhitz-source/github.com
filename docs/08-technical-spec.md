# Bagian 8 — Spesifikasi Teknis

## Data Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Train Cargo Game Data Schema",
  "type": "object",
  "properties": {
    "player": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "level": {"type": "integer", "minimum": 1},
        "xp": {"type": "integer", "minimum": 0},
        "gold": {"type": "integer", "minimum": 0},
        "train": {"$ref": "#/definitions/train"}
      },
      "required": ["id", "level", "xp", "gold", "train"]
    },
    "train": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "speed": {"type": "number"},
        "capacity": {"type": "integer"},
        "fuelCapacity": {"type": "integer"},
        "fuelCurrent": {"type": "integer"},
        "efficiency": {"type": "number"}
      },
      "required": ["id", "speed", "capacity", "fuelCapacity", "fuelCurrent", "efficiency"]
    },
    "route": {
      "type": "object",
      "properties": {
        "id": {"type": "string"},
        "distance": {"type": "number"},
        "regionId": {"type": "string"},
        "weather": {"type": "string"},
        "reward": {"type": "integer"},
        "status": {"type": "string", "enum": ["available", "active", "completed", "failed"]}
      },
      "required": ["id", "distance", "regionId", "reward", "status"]
    }
  },
  "required": ["player", "train"]
}
```

## State Machine — Kereta

```
STATE TRAIN:
  ENUM State: IDLE, DEPARTING, EN_ROUTE, DOCKING, REFUELING, BROKEN_DOWN

  onDepart(route):
    if train.fuelCurrent > route.fuelRequired:
      state = DEPARTING
      trigger(FEEL-DEPART-01, FEEL-DEPART-02)
    else:
      state = IDLE
      showWarning("Bahan bakar tidak cukup")

  onTick(deltaTime):
    if state == EN_ROUTE:
      train.fuelCurrent -= consumptionRate(deltaTime, weather)
      distanceCovered += speed(deltaTime, weather)
      if distanceCovered >= route.distance:
        state = DOCKING
      elif train.fuelCurrent <= 0:
        state = BROKEN_DOWN

    if state == DOCKING:
      dockProgress += deltaTime
      if dockProgress >= dockDuration:
        state = IDLE
        completeRoute(route)

    if state == BROKEN_DOWN:
      showRescueOption(cost: 50 Gold)
```

## Event / Trigger System

| Event ID | Trigger | Handler | Contoh |
|----------|---------|---------|--------|
| EVT-01 | train.fuelCurrent < 5 | showFuelWarning | FEEL-WARN-01: berkedip merah |
| EVT-02 | route.completed | grantReward | Gold + XP masuk ke player |
| EVT-03 | hazard.spawned | pauseTrain | Train berhenti, UI hazard muncul |
| EVT-04 | player.levelUp | unlockRegion | Tampilkan wilayah baru di peta |

## Struktur Save / Load

```
savegame.json
├── player (id, level, xp, gold, reputation)
├── trains[] (id, level, upgrades[], currentRouteId)
├── routes[] (id, status, progress, startedAt)
├── inventory[] (itemId, quantity)
├── unlockedRegions[] (regionId)
└── lastSaved (ISO 8601 timestamp)
```

Format: JSON, versioned (`schemaVersion: 1`). Auto-save setiap 60 detik dan saat transaksi penting (delivery selesai, upgrade).
