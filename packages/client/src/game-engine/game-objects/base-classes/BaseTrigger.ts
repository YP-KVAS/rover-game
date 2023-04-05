import { BaseGameObject } from './BaseGameObject'
import { Coords, TriggerInfo } from '../../../utils/types/game'

export abstract class BaseTrigger extends BaseGameObject {
  protected coords: Coords
  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize)
    this.coords = triggerInfo.coords
  }

  check(roverCoords: Coords) {
    if (this.collideWithRover(roverCoords)) {
      this.onTriggered()
    }
  }

  collideWithRover(roverCoords: Coords): boolean {
    return Math.abs(roverCoords.x - this.coords.x) < this.tileSize / 2
  }

  protected onTriggered() {
    return
  }
}
