import CombatEvent from './combatEvent'

export default class RegenTickEvent extends CombatEvent {
    static type = 'regenTick'

    constructor(time) {
        super(RegenTickEvent.type, time)
    }
}
