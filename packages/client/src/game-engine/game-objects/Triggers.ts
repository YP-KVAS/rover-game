import { BaseTrigger } from './base-classes/BaseTrigger'
import { TriggerInfo } from '../../utils/types/game'

export class CargoTrigger extends BaseTrigger {
  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize, triggerInfo)
  }

  onTriggered() {
    this.disable()
    console.warn('Get cargo')
  }
}

export class DeliveryTrigger extends BaseTrigger {
  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize, triggerInfo)
  }

  onTriggered() {
    this.disable()
    console.warn('cargo delivery')
  }
}
