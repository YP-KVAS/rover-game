import { DynamicGameCharacter } from './base-classes/DynamicGameCharacter'
import { Coords, MovingDirection } from '../../utils/types/game'
import { IMG_WIDTH, immunityTimeMs } from '../../utils/const-variables/game'
import { RoverImages } from '../../utils/types/game-images'
import { GameImages } from '../GameImages'

interface FreezeMov {
  start: number
  duration: number
}

export class Rover extends DynamicGameCharacter {
  protected img: HTMLImageElement
  protected roverImages: RoverImages
  private _freezeMov: FreezeMov | null = null
  private _blinking = false
  private _blink = false

  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number
  ) {
    super(gameMap, tileSize, coords, movingDirection, speed)
    this.roverImages = GameImages.getInstance().roverImages
    this.img = this.getRoverImg()
  }

  getRoverImg() {
    switch (this.movingDirection) {
      case MovingDirection.UP:
        return this.roverImages.roverUp
      case MovingDirection.DOWN:
        return this.roverImages.roverDown
      case MovingDirection.RIGHT:
        return this.roverImages.roverRight
      case MovingDirection.LEFT:
        return this.roverImages.roverLeft
    }
  }

  changeMovingDirection(newMovingDirection: MovingDirection) {
    this.movingDirection = newMovingDirection
    this.img = this.getRoverImg()
  }

  openRover(freezeSec = 1000) {
    switch (this.movingDirection) {
      case MovingDirection.UP:
        this.movingDirection = MovingDirection.RIGHT
        this.img = this.roverImages.roverOpenRight
        break
      case MovingDirection.DOWN:
        this.movingDirection = MovingDirection.LEFT
        this.img = this.roverImages.roverOpenLeft
        break
      case MovingDirection.RIGHT:
        this.img = this.roverImages.roverOpenRight
        break
      case MovingDirection.LEFT:
        this.img = this.roverImages.roverOpenLeft
        break
    }
    this._freezeMov = { start: performance.now(), duration: freezeSec }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this._blink) return

    // vertical offset to correctly display rover in a tile
    const offset = Math.round(
      (this.img.height / IMG_WIDTH) * this.tileSize - this.tileSize
    )
    const additionalOffset =
      this.movingDirection === MovingDirection.RIGHT ||
      this.movingDirection === MovingDirection.LEFT
        ? this.tileSize / 8
        : 0

    this.drawTile(
      ctx,
      this.img,
      this.coords.x,
      this.coords.y - offset - additionalOffset,
      0,
      0,
      this.img.width,
      this.img.height,
      this.tileSize,
      this.tileSize + offset
    )

    if (this._freezeMov) {
      if (
        performance.now() - this._freezeMov.start >=
        this._freezeMov.duration
      ) {
        this._freezeMov = null
        this.img = this.getRoverImg()
      }
    }
  }

  private async _blinkFoo() {
    function sleep(ms: number) {
      return new Promise(resolve => setTimeout(resolve, ms))
    }

    this._blink = true
    await sleep(200)
    this._blink = false
    console.log('blink')
  }

  hitting() {
    if (this._blinking) return

    this._blinking = true

    this._blinkFoo()
    const interval = setInterval(this._blinkFoo.bind(this), 400)

    setTimeout(() => {
      clearInterval(interval)
      this._blinking = false
    }, immunityTimeMs)
  }

  move(movingDirection: MovingDirection): void {
    // disable movement if not allowed
    if (this._freezeMov) {
      return
    }

    // switch direction
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
