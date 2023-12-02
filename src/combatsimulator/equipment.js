import itemDetailMap from './data/itemDetailMap.json'
import enhancementLevelTotalMultiplierTable from './data/enhancementLevelTotalMultiplierTable.json'

export default class Equipment {
    constructor(hrid, enhancementLevel) {
        this.hrid = hrid
        let gameItem = itemDetailMap[this.hrid]
        if (!gameItem) {
            throw new Error('No equipment found for hrid: ' + this.hrid)
        }
        this.gameItem = gameItem
        this.enhancementLevel = enhancementLevel
    }

    static createFromDTO(dto) {
        return new Equipment(dto.hrid, dto.enhancementLevel)
    }

    getCombatStat(combatStat) {
        let multiplier =
            enhancementLevelTotalMultiplierTable[this.enhancementLevel]

        let stat =
            this.gameItem.equipmentDetail.combatStats[combatStat] +
            multiplier *
                this.gameItem.equipmentDetail.combatEnhancementBonuses[
                    combatStat
                ]

        return stat
    }

    getCombatStyle() {
        return this.gameItem.equipmentDetail.combatStats.combatStyleHrids[0]
    }

    getDamageType() {
        return this.gameItem.equipmentDetail.combatStats.damageType
    }
}
