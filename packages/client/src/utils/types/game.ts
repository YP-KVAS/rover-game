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

export interface Rover {
  coords: Coords
  movingDirection: MovingDirection
  speed: number
}

export interface Car extends Rover {
  img: HTMLImageElement
}

export interface TriggerInfo {
  triggerId: number
  description?: string
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
  timer: number
}
