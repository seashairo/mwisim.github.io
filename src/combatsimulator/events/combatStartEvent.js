import CombatEvent from './combatEvent'

export default class CombatStartEvent extends CombatEvent {
    static type = 'combatStart'

    constructor(time) {
        super(CombatStartEvent.type, time)
    }
}
