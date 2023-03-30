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