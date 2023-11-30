import CombatEvent from './combatEvent'

export default class AwaitCooldownEvent extends CombatEvent {
    static type = 'awaitCooldownEvent'

    constructor(time, source) {
        super(AwaitCooldownEvent.type, time)

        this.source = source
    }
}
