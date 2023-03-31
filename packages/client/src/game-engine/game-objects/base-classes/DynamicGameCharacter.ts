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
}
