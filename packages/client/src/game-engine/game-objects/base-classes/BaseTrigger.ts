import { BaseGameObject } from './BaseGameObject'
import { Coords, TriggerInfo } from '../../../utils/types/game'

export abstract class BaseTrigger extends BaseGameObject {
  protected coords: Coords
  protected img: HTMLImageElement
  private enabled: boolean
  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize)
    this.coords = triggerInfo.coords
    this.img = triggerInfo.img
    this.enabled = triggerInfo.enabled ?? false
  }

  check(roverCoords: Coords) {
    if (!this.enabled) return

    if (this.collideWithRover(roverCoords)) {
      this.onTriggered()
    }
  }

  collideWithRover(roverCoords: Coords): boolean {
    const xIntersection =
      Math.abs(roverCoords.x - this.coords.x) < this.tileSize / 2
    const yIntersection =
      Math.abs(roverCoords.y - this.coords.y) < this.tileSize / 2
    return xIntersection && yIntersection
  }

  protected onTriggered() {
    return
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.enabled) return
    this.drawTile(ctx, this.img, this.coords.x, this.coords.y)
  }

  enable() {
    this.enabled = true
  }

  disable() {
    this.enabled = false
  }
}
