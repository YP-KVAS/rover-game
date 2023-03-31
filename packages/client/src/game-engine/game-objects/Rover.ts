import { DynamicGameCharacter } from './base-classes/DynamicGameCharacter'
import { roverImages } from '../game-images'
import { Coords, MovingDirection } from '../../utils/types/game'
import { IMG_WIDTH } from '../../utils/const-variables/game'

export class Rover extends DynamicGameCharacter {
  protected img: HTMLImageElement

  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number
  ) {
    super(gameMap, tileSize, coords, movingDirection, speed)
    this.img = this.getRoverImg()
  }

  getRoverImg() {
    switch (this.movingDirection) {
      case MovingDirection.UP:
        return roverImages.roverUp
      case MovingDirection.DOWN:
        return roverImages.roverDown
      case MovingDirection.RIGHT:
        return roverImages.roverRight
      case MovingDirection.LEFT:
        return roverImages.roverLeft
    }
  }

  changeMovingDirection(newMovingDirection: MovingDirection) {
    this.movingDirection = newMovingDirection
    this.img = this.getRoverImg()
  }

  draw(ctx: CanvasRenderingContext2D): void {
    const img = this.getRoverImg()

    // vertical offset to correctly display rover in a tile
    const offset = Math.round(
      (img.height / IMG_WIDTH) * this.tileSize - this.tileSize
    )
    const additionalOffset =
      this.movingDirection === MovingDirection.RIGHT ||
      this.movingDirection === MovingDirection.LEFT
        ? this.tileSize / 8
        : 0

    ctx.drawImage(
      img,
      this.coords.x,
      this.coords.y - offset - additionalOffset,
      this.tileSize,
      this.tileSize + offset
    )
  }

  move(movingDirection: MovingDirection): void {
    if (this.movingDirection !== movingDirection) {
      this.changeMovingDirection(movingDirection)
      return
    }

    // change y-coords for up and down
    if (
      this.movingDirection === MovingDirection.UP ||
      this.movingDirection === MovingDirection.DOWN
    ) {
      const futureYCoordinate =
        this.movingDirection === MovingDirection.UP
          ? this.coords.y - this.speed
          : this.coords.y + this.speed

      // if rover stays in the same tile(-s)
      if (!Number.isInteger(this.coords.y / this.tileSize)) {
        this.coords.y = futureYCoordinate
        return
      }

      const rowIndexLeft = Math.floor(this.coords.x / this.tileSize)
      const rowIndexRight = Math.floor(
        (this.coords.x + this.tileSize - 1) / this.tileSize
      )
      const futureColumnIndex =
        this.movingDirection === MovingDirection.UP
          ? Math.floor(futureYCoordinate / this.tileSize)
          : Math.ceil(futureYCoordinate / this.tileSize)

      const futureTileLeft = this.gameMap[1][futureColumnIndex][rowIndexLeft]
      const futureTileRight = this.gameMap[1][futureColumnIndex][rowIndexRight]

      if (futureTileLeft === -1 && futureTileRight === -1) {
        this.coords.y = futureYCoordinate
      }
    }
    // change x-coords for right and left
    else {
      const futureXCoordinate =
        this.movingDirection === MovingDirection.RIGHT
          ? this.coords.x + this.speed
          : this.coords.x - this.speed

      // if rover stays in the same tile(-s)
      if (!Number.isInteger(this.coords.x / this.tileSize)) {
        this.coords.x = futureXCoordinate
        return
      }

      const columnIndexTop = Math.floor(this.coords.y / this.tileSize)
      const columnIndexBottom = Math.floor(
        (this.coords.y + this.tileSize - 1) / this.tileSize
      )
      const futureRowIndex =
        this.movingDirection === MovingDirection.RIGHT
          ? Math.ceil(futureXCoordinate / this.tileSize)
          : Math.floor(futureXCoordinate / this.tileSize)

      const futureTileTop = this.gameMap[1][columnIndexTop][futureRowIndex]
      const futureTileBottom =
        this.gameMap[1][columnIndexBottom][futureRowIndex]

      if (futureTileTop === -1 && futureTileBottom === -1) {
        this.coords.x = futureXCoordinate
      }
    }
  }
}
