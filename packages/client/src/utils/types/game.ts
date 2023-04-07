import { BaseTrigger } from '../../game-engine/game-objects/base-classes/BaseTrigger'

export enum MovingDirection {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right',
}

export interface Coords {
  x: number
  y: number
}

interface MovingObject {
  coords: Coords
  movingDirection: MovingDirection
}

export interface Car extends MovingObject {
  img: HTMLImageElement
}

export interface Rover extends MovingObject {
  speed: number
}
export interface TriggerInfo {
  triggerId: number
  coords: Coords
  img: HTMLImageElement
  class: {
    new (
      gameMap: Array<Array<Array<number>>>,
      tileSize: number,
      triggerInfo: TriggerInfo
    ): BaseTrigger
  }
  enabled?: boolean
  action?: () => unknown
  logic?: () => unknown
}

export interface GameStatType {
  level: number
  points: number
  hitPoints: number
}
