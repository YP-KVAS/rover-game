import { BaseGameObject } from './BaseGameObject'
import { Coords, TriggerInfo } from '../../../utils/types/game'

export abstract class BaseTrigger extends BaseGameObject {
  static triggers: BaseTrigger[] = []

  private id: number
  protected coords: Coords
  protected img: HTMLImageElement
  private enabled?: boolean
  private readonly logic?: () => unknown
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

  check(roverCoords: Coords) {
    if (!this.enabled) return

    if (this.collideWithRover(roverCoords)) {
      this._onTriggered()
    }
  }

  collideWithRover(roverCoords: Coords): boolean {
    const xIntersection =
      Math.abs(roverCoords.x - this.coords.x) < this.tileSize / 2
    const yIntersection =
      Math.abs(roverCoords.y - this.coords.y) < this.tileSize / 2
    return xIntersection && yIntersection
  }

  private _onTriggered() {
    if (this.logic) this.logic()
    this.onTriggered()
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
