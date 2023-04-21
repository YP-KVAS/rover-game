import { DynamicGameCharacter } from './DynamicGameCharacter'
import { Coords, MovingDirection } from '../../../utils/types/game'
import { Rover } from '../Rover'

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

  isIntersectingTopLeft(
    coords: Coords,
    objCoords: Coords,
    sizeRatio: number,
    includeLastPoints: boolean
  ): boolean {
    return (
      coords.x <= objCoords.x &&
      (includeLastPoints
        ? coords.x + this.tileSize * sizeRatio >= objCoords.x
        : coords.x + this.tileSize * sizeRatio > objCoords.x) &&
      coords.y <= objCoords.y &&
      (includeLastPoints
        ? coords.y + this.tileSize * sizeRatio >= objCoords.y
        : coords.y + this.tileSize * sizeRatio > objCoords.y)
    )
  }

  isIntersectingTopRight(
    coords: Coords,
    objCoords: Coords,
    sizeRatio: number,
    includeLastPoints: boolean
  ): boolean {
    return (
      (includeLastPoints
        ? coords.x <= objCoords.x + this.tileSize
        : coords.x < objCoords.x + this.tileSize) &&
      coords.x + this.tileSize * (sizeRatio - 1) >= objCoords.x &&
      coords.y <= objCoords.y &&
      (includeLastPoints
        ? coords.y + this.tileSize * sizeRatio >= objCoords.y
        : coords.y + this.tileSize * sizeRatio > objCoords.y)
    )
  }

  isIntersectingLeftBottom(
    coords: Coords,
    objCoords: Coords,
    sizeRatio: number,
    includeLastPoints: boolean
  ): boolean {
    return (
      coords.x <= objCoords.x &&
      (includeLastPoints
        ? coords.x + this.tileSize * sizeRatio >= objCoords.x
        : coords.x + this.tileSize * sizeRatio > objCoords.x) &&
      (includeLastPoints
        ? coords.y <= objCoords.y + this.tileSize
        : coords.y < objCoords.y + this.tileSize) &&
      coords.y + this.tileSize * (sizeRatio - 1) >= objCoords.y
    )
  }

  isIntersectingRightBottom(
    coords: Coords,
    objCoords: Coords,
    sizeRatio: number,
    includeLastPoints: boolean
  ): boolean {
    return (
      (includeLastPoints
        ? coords.x <= objCoords.x + this.tileSize
        : coords.x < objCoords.x + this.tileSize) &&
      coords.x + this.tileSize * (sizeRatio - 1) >= objCoords.x &&
      (includeLastPoints
        ? coords.y <= objCoords.y + this.tileSize
        : coords.y < objCoords.y + this.tileSize) &&
      coords.y + this.tileSize * (sizeRatio - 1) >= objCoords.y
    )
  }

  coordsAreIntersecting(
    coords: Coords,
    objCoords: Coords,
    sizeRatio = 1,
    includeLastPoints = false
  ): boolean {
    return (
      this.isIntersectingTopLeft(
        coords,
        objCoords,
        sizeRatio,
        includeLastPoints
      ) ||
      this.isIntersectingTopRight(
        coords,
        objCoords,
        sizeRatio,
        includeLastPoints
      ) ||
      this.isIntersectingLeftBottom(
        coords,
        objCoords,
        sizeRatio,
        includeLastPoints
      ) ||
      this.isIntersectingRightBottom(
        coords,
        objCoords,
        sizeRatio,
        includeLastPoints
      )
    )
  }

  collideWithRover(roverCoords: Coords): boolean {
    return this.coordsAreIntersecting(this.coords, roverCoords)
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

  abstract move(rover: Rover, otherBotsCoords: Array<Coords>): void
}
