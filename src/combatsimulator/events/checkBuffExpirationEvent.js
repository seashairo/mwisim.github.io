import CombatEvent from './combatEvent'

export default class CheckBuffExpirationEvent extends CombatEvent {
    static type = 'checkBuffExpiration'

    constructor(time, source) {
        super(CheckBuffExpirationEvent.type, time)

        this.source = source
    }
}
