import actionDetailMap from './data/actionDetailMap.json'
import Monster from './monster'

class Zone {
    constructor(hrid) {
        this.hrid = hrid

        let gameZone = actionDetailMap[this.hrid]
        this.monsterSpawnInfo = gameZone.monsterSpawnInfo
        this.encountersKilled = 0
        this.monsterSpawnInfo.battlesPerBoss = 10
    }

    getRandomEncounter() {
        if (
            this.monsterSpawnInfo.bossFightMonsters &&
            this.encountersKilled == this.monsterSpawnInfo.battlesPerBoss
        ) {
            this.encountersKilled = 1
            return this.monsterSpawnInfo.bossFightMonsters.map(
                (hrid) => new Monster(hrid),
            )
        }

        let totalWeight = this.monsterSpawnInfo.spawns.reduce(
            (prev, cur) => prev + cur.rate,
            0,
        )

        let encounterHrids = []
        let totalStrength = 0

        outer: for (let i = 0; i < this.monsterSpawnInfo.maxSpawnCount; i++) {
            let randomWeight = totalWeight * Math.random()
            let cumulativeWeight = 0

            for (const spawn of this.monsterSpawnInfo.spawns) {
                cumulativeWeight += spawn.rate
                if (randomWeight <= cumulativeWeight) {
                    totalStrength += spawn.strength

                    if (
                        totalStrength <= this.monsterSpawnInfo.maxTotalStrength
                    ) {
                        encounterHrids.push(spawn.combatMonsterHrid)
                    } else {
                        break outer
                    }
                    break
                }
            }
        }
        this.encountersKilled++
        return encounterHrids.map((hrid) => new Monster(hrid))
    }
}

export default Zone
