import { BaseTrigger } from './base-classes/BaseTrigger'
import { TriggerInfo } from '../../utils/types/game'
import gameManager from '../GameManager'

class SwingTrigger extends BaseTrigger {
  rotateDegree = 0
  rotateSpeed = 2
  rotateMax = 5

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.enabled) return

    this.drawRotatedTile(
      ctx,
      this.img,
      this.coords.x,
      this.coords.y,
      this.rotateDegree
    )
    this.rotateDegree += this.rotateSpeed
    if (
      this.rotateDegree > this.rotateMax ||
      this.rotateDegree < this.rotateMax * -1
    ) {
      this.rotateSpeed = this.rotateSpeed * -1
    }
  }
}

export class CargoTrigger extends SwingTrigger {
  constructor(
    gameMap: number[][][],
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize, triggerInfo)
  }

  onTriggered() {
    this.disable()
    gameManager.addPoints(1000)
  }
}

export class DeliveryTrigger extends SwingTrigger {
  constructor(
    gameMap: number[][][],
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize, triggerInfo)
  }

  onTriggered() {
    this.disable()
    gameManager.addPoints(3000)
  }
}
