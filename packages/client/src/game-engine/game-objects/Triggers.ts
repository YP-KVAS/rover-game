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
    console.warn('Get cargo')
  }

  draw(ctx: CanvasRenderingContext2D) {
    return
  }
}
