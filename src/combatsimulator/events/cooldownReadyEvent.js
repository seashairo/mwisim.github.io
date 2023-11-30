import CombatEvent from './combatEvent'

export default class CooldownReadyEvent extends CombatEvent {
    static type = 'cooldownReady'

    constructor(time) {
        super(CooldownReadyEvent.type, time)
    }
}
