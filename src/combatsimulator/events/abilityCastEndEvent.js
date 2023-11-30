import CombatEvent from './combatEvent'

export default class AbilityCastEndEvent extends CombatEvent {
    static type = 'abilityCastEndEvent'

    constructor(time, source, ability) {
        super(AbilityCastEndEvent.type, time)

        this.source = source
        this.ability = ability
    }
}
