import CombatEvent from './combatEvent'

export default class SilenceExpirationEvent extends CombatEvent {
    static type = 'silenceExpiration'

    constructor(time, source) {
        super(SilenceExpirationEvent.type, time)

        this.source = source
    }
}
