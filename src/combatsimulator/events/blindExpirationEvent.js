import CombatEvent from './combatEvent'

export default class BlindExpirationEvent extends CombatEvent {
    static type = 'blindExpiration'

    constructor(time, source) {
        super(BlindExpirationEvent.type, time)

        this.source = source
    }
}
