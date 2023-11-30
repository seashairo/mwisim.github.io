import CombatEvent from './combatEvent'

export default class AutoAttackEvent extends CombatEvent {
    static type = 'autoAttack'

    constructor(time, source) {
        super(AutoAttackEvent.type, time)

        this.source = source
    }
}
