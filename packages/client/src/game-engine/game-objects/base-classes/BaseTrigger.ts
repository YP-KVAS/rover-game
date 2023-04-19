import { BaseGameObject } from './BaseGameObject'
import { Coords, TriggerInfo } from '../../../utils/types/game'
import { Rover } from '../Rover'

export abstract class BaseTrigger extends BaseGameObject {
  static triggers: BaseTrigger[] = []

  protected id: number
  protected coords: Coords
  protected img: HTMLImageElement
  protected enabled?: boolean
  protected readonly logic?: () => unknown
  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    triggerInfo: TriggerInfo
  ) {
    super(gameMap, tileSize)
    this.id = triggerInfo.triggerId
    this.coords = triggerInfo.coords
    this.img = triggerInfo.img
    this.enabled = triggerInfo.enabled ?? false
    this.logic = triggerInfo.logic

    const existTrigger = BaseTrigger.triggers.findIndex(
      trigger => trigger.id === triggerInfo.triggerId
    )

    if (existTrigger) {
      BaseTrigger.triggers[triggerInfo.triggerId] = this
    } else {
      BaseTrigger.triggers.push(this)
    }
  }

  static removeTriggers() {
    BaseTrigger.triggers = []
  }

  static disableTrigger(triggerId: number) {
    const trigger = this.triggers.find(trigger => trigger.id === triggerId)

    if (trigger) {
      trigger.disable()
    }
  }

  static enableTrigger(triggerId: number) {
    const trigger = this.triggers.find(trigger => trigger.id === triggerId)

    if (trigger) {
      trigger.enable()
    }
  }

  check(rover: Rover) {
    if (!this.enabled) return

    if (this.collideWithRover(rover.coords)) {
      rover.openRover()
      this._onTriggered(rover)
    }
  }

  collideWithRover(roverCoords: Coords): boolean {
    const xIntersection =
      Math.abs(roverCoords.x - this.coords.x) <= this.tileSize / 2
    const yIntersection =
      Math.abs(roverCoords.y - this.coords.y) <= this.tileSize / 2
    return xIntersection && yIntersection
  }

  private _onTriggered(rover: Rover) {
    this.onTriggered(rover)
    if (this.logic) this.logic()
  }

  protected onTriggered(rover: Rover) {
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
