import CombatEvent from './combatEvent'

export default class PlayerRespawnEvent extends CombatEvent {
    static type = 'playerRespawn'

    constructor(time) {
        super(PlayerRespawnEvent.type, time)
    }
}
