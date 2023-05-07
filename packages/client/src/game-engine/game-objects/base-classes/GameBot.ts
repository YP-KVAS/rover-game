import { DynamicGameCharacter } from './DynamicGameCharacter'
import { Coords, MovingDirection } from '../../../utils/types/game'

export abstract class GameBot extends DynamicGameCharacter {
  protected img: HTMLImageElement
  protected width: number
  protected height: number

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
    this.width = tileSize
    this.height = tileSize
  }

  coordsAreIntersecting(
    rect1: { coords: Coords; width: number; height: number },
    rect2: { coords: Coords; width: number; height: number }
  ): boolean {
    const rect1MinX = rect1.coords.x
    const rect1MaxX = rect1.coords.x + rect1.width - 1
    const rect1MinY = rect1.coords.y
    const rect1MaxY = rect1.coords.y + rect1.height - 1

    const rect2MinX = rect2.coords.x
    const rect2MaxX = rect2.coords.x + rect2.width - 1
    const rect2MinY = rect2.coords.y
    const rect2MaxY = rect2.coords.y + rect2.height - 1

    return (
      rect1MaxX >= rect2MinX &&
      rect1MinX <= rect2MaxX &&
      rect1MinY <= rect2MaxY &&
      rect1MaxY >= rect2MinY
    )
  }

  collideWithRover(
    roverCoords: Coords,
    rect?: { coords: Coords; width: number; height: number }
  ): boolean {
    const roverRect = {
      coords: roverCoords,
      width: this.tileSize,
      height: this.tileSize,
    }
    rect ||= {
      coords: {
        x:
          this.width < this.tileSize
            ? this.coords.x + this.width / 2
            : this.coords.x,
        y:
          this.height < this.tileSize
            ? this.coords.y + this.height / 2
            : this.coords.y,
      },
      width: this.width,
      height: this.height,
    }
    return this.coordsAreIntersecting(rect, roverRect)
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
