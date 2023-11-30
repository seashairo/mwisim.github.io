import Buff from './buff'
import houseRoomDetailMap from './data/houseRoomDetailMap.json'

export default class HouseRoom {
    constructor(hrid, level) {
        this.hrid = hrid
        this.level = level

        let gameHouseRoom = houseRoomDetailMap[this.hrid]
        if (!gameHouseRoom) {
            throw new Error('No house room found for hrid: ' + this.hrid)
        }

        const roomBuffs = [
            ...(gameHouseRoom.actionBuffs ?? []),
            ...(gameHouseRoom.globalBuffs ?? []),
        ]

        this.buffs = roomBuffs.map((buff) => new Buff(buff, level))
    }
}
