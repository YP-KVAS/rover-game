import { DynamicGameCharacter } from './DynamicGameCharacter'
import { Coords, MovingDirection } from '../../../utils/types/game'

export abstract class GameBot extends DynamicGameCharacter {
  protected img: HTMLImageElement

  protected constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number,
    img: HTMLImageElement
  ) {
    super(gameMap, tileSize, coords, movingDirection, speed)
    this.coords = coords
    this.movingDirection = movingDirection
    this.speed = speed
    this.img = img
  }

  collideWithRover(roverCoords: Coords) {
    return (
      (this.coords.x <= roverCoords.x &&
        this.coords.x + this.tileSize > roverCoords.x &&
        this.coords.y <= roverCoords.y &&
        this.coords.y + this.tileSize > roverCoords.y) ||
      (this.coords.x < roverCoords.x + this.tileSize &&
        this.coords.x >= roverCoords.x &&
        this.coords.y <= roverCoords.y &&
        this.coords.y + this.tileSize > roverCoords.y) ||
      (this.coords.x <= roverCoords.x &&
        this.coords.x + this.tileSize > roverCoords.x &&
        this.coords.y < roverCoords.y + this.tileSize &&
        this.coords.y >= roverCoords.y) ||
      (this.coords.x < roverCoords.x + this.tileSize &&
        this.coords.x >= roverCoords.x &&
        this.coords.y < roverCoords.y + this.tileSize &&
        this.coords.y >= roverCoords.y)
    )
  }

  draw(ctx: CanvasRenderingContext2D): void {
    switch (this.movingDirection) {
      case MovingDirection.UP:
        this.drawTile(ctx, this.img, this.coords.x, this.coords.y)
        break
      case MovingDirection.RIGHT:
        this.drawRotatedTile(ctx, this.img, this.coords.x, this.coords.y, 90)
        break
      case MovingDirection.DOWN:
        this.drawRotatedTile(ctx, this.img, this.coords.x, this.coords.y, 180)
        break
      case MovingDirection.LEFT:
        this.drawRotatedTile(ctx, this.img, this.coords.x, this.coords.y, -90)
        break
    }
  }

  abstract move(roverCoords: Coords, otherBotsCoords: Array<Coords>): void
}
