import CombatEvent from './combatEvent'

export default class StunExpirationEvent extends CombatEvent {
    static type = 'stunExpiration'

    constructor(time, source) {
        super(StunExpirationEvent.type, time)

        this.source = source
    }
}
