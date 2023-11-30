import CombatEvent from './combatEvent'

export default class EnemyRespawnEvent extends CombatEvent {
    static type = 'enemyRespawn'

    constructor(time) {
        super(EnemyRespawnEvent.type, time)
    }
}
