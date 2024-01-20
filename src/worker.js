import CombatSimulator from './combatsimulator/combatSimulator'
import Player from './combatsimulator/player'
import Zone from './combatsimulator/zone'
import actionDetailMap from './combatsimulator/data/actionDetailMap.json'

onmessage = async function (event) {
    if (event.data.type === 'start_simulation') {
        let player = Player.createFromDTO(event.data.player)
        let zone = new Zone(event.data.zoneHrid)
        let simulationTimeLimit = event.data.simulationTimeLimit
        let optimiseFor = event.data.optimiseFor

        if (optimiseFor === 'None') {
            let combatSimulator = new CombatSimulator(player, zone)
            combatSimulator.addEventListener('progress', (event) => {
                this.postMessage({
                    type: 'simulation_progress',
                    progress: event.detail,
                })
            })

            try {
                let simResult =
                    await combatSimulator.simulate(simulationTimeLimit)
                this.postMessage({
                    type: 'simulation_result',
                    simResult: [simResult],
                })
            } catch (e) {
                this.postMessage({ type: 'simulation_error', error: e })
            }

            return
        }

        let gameZones = Object.values(actionDetailMap)
            .filter((action) => action.type == '/action_types/combat')
            .sort((a, b) => a.sortIndex - b.sortIndex)
            .map((z) => new Zone(z.hrid))

        const results = []
        for (const gameZone of gameZones) {
            try {
                let combatSimulator = new CombatSimulator(
                    Player.createFromDTO(event.data.player),
                    gameZone,
                )

                combatSimulator.addEventListener('progress', (event) => {
                    const currentProgress = results.length / gameZones.length
                    this.postMessage({
                        type: 'simulation_progress',
                        progress:
                            currentProgress + event.detail / gameZones.length,
                    })
                })

                let result = await combatSimulator.simulate(simulationTimeLimit)
                results.push(result)
            } catch (e) {
                this.postMessage({ type: 'simulation_error', error: e })
            }
        }

        const skills = [
            'Stamina',
            'Intelligence',
            'Attack',
            'Power',
            'Defense',
            'Ranged',
            'Magic',
        ]

        this.postMessage({
            type: 'simulation_result',
            simResult: results.sort((a, b) => {
                if (skills.includes(optimiseFor)) {
                    return (
                        b.experienceGained.player[optimiseFor.toLowerCase()] -
                        a.experienceGained.player[optimiseFor.toLowerCase()]
                    )
                }

                if (optimiseFor === 'Total XP') {
                    return (
                        Object.values(b.experienceGained.player).reduce(
                            (acc, value) => acc + value,
                            0,
                        ) -
                        Object.values(a.experienceGained.player).reduce(
                            (acc, value) => acc + value,
                            0,
                        )
                    )
                }
            }),
        })
    }
}
