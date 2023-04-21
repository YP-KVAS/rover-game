import { BaseGameObject } from './BaseGameObject'
import { Coords, MovingDirection } from '../../../utils/types/game'

export abstract class DynamicGameCharacter extends BaseGameObject {
  coords: Coords
  protected movingDirection: MovingDirection
  protected speed: number

  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number
  ) {
    super(gameMap, tileSize)
    this.coords = coords
    this.movingDirection = movingDirection
    this.speed = speed
  }

  getNextCoords(offset: number = this.speed): Coords {
    let nextX: number
    let nextY: number
    switch (this.movingDirection) {
      case MovingDirection.UP:
        nextX = this.coords.x
        nextY = this.coords.y - offset
        break
      case MovingDirection.DOWN:
        nextX = this.coords.x
        nextY = this.coords.y + offset
        break
      case MovingDirection.RIGHT:
        nextX = this.coords.x + offset
        nextY = this.coords.y
        break
      case MovingDirection.LEFT:
        nextX = this.coords.x - offset
        nextY = this.coords.y
        break
    }

    return { x: nextX, y: nextY }
  }

  goStraight() {
    switch (this.movingDirection) {
      case MovingDirection.UP:
        this.coords.y -= this.speed
        break
      case MovingDirection.DOWN:
        this.coords.y += this.speed
        break
      case MovingDirection.RIGHT:
        this.coords.x += this.speed
        break
      case MovingDirection.LEFT:
        this.coords.x -= this.speed
        break
    }
  }
}
