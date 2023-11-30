import CombatEvent from './combatEvent'

export default class ConsumableTickEvent extends CombatEvent {
    static type = 'consumableTick'

    constructor(time, source, consumable, totalTicks, currentTick) {
        super(ConsumableTickEvent.type, time)

        this.source = source
        this.consumable = consumable
        this.totalTicks = totalTicks
        this.currentTick = currentTick
    }
}
