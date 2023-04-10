import { Coords, MovingDirection } from '../../utils/types/game'
import { GameBot } from './base-classes/GameBot'
import gameManager from '../GameManager'

export class Car extends GameBot {
  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number,
    img: HTMLImageElement
  ) {
    super(gameMap, tileSize, coords, movingDirection, speed, img)
  }

  needToStopOnCrosswalk(tileCoords: Coords, roverCoords: Coords): boolean {
    return this.coordsAreIntersecting(tileCoords, roverCoords, 2, true)
  }

  getCrosswalkCoords(tileCoords: Coords): Coords | null {
    const tile =
      this.gameMap[0][tileCoords.y / this.tileSize][
        tileCoords.x / this.tileSize
      ]

    let startX: number | null = null
    let startY: number | null = null

    // check if next tile is crosswalk
    switch (tile) {
      case 131:
      case 144:
        startX = tileCoords.x
        startY = tileCoords.y
        break
      case 132:
      case 141:
        startX = tileCoords.x - this.tileSize
        startY = tileCoords.y
        break
      case 133:
      case 142:
        startX = tileCoords.x - this.tileSize
        startY = tileCoords.y - this.tileSize
        break
      case 134:
      case 143:
        startX = tileCoords.x
        startY = tileCoords.y - this.tileSize
        break
    }

    return startX && startY ? { x: startX, y: startY } : null
  }

  isAllowedToChangeDirection(tile: number): boolean {
    let allowedToChange = false
    switch (this.movingDirection) {
      case MovingDirection.UP:
        allowedToChange = tile === 211 || tile === 224 || tile === 232
        break
      case MovingDirection.DOWN:
        allowedToChange =
          tile === 212 || tile === 151 || tile === 204 || tile === 231
        break
      case MovingDirection.RIGHT:
        allowedToChange =
          tile === 221 ||
          tile === 202 ||
          tile === 204 ||
          tile === 154 ||
          tile === 153 ||
          tile === 234
        break
      case MovingDirection.LEFT:
        allowedToChange =
          tile === 214 || tile === 222 || tile === 201 || tile === 152
        break
    }
    return allowedToChange
  }

  changeMovingDirectionOrGoStraight(tile: number) {
    const random = Math.round(Math.random())
    switch (this.movingDirection) {
      case MovingDirection.UP:
        if (random === 0) {
          this.coords.y -= this.speed
        } else {
          this.movingDirection =
            tile === 232 ? MovingDirection.LEFT : MovingDirection.RIGHT
        }
        break
      case MovingDirection.DOWN:
        if (random === 0) {
          this.coords.y += this.speed
        } else {
          this.movingDirection =
            tile === 212 ? MovingDirection.RIGHT : MovingDirection.LEFT
        }
        break
      case MovingDirection.RIGHT:
        if (random === 0) {
          tile === 204
            ? (this.coords.y += this.speed)
            : (this.coords.x += this.speed)
        } else {
          this.movingDirection =
            tile === 204
              ? MovingDirection.LEFT
              : tile === 202 || tile === 153
              ? MovingDirection.UP
              : MovingDirection.DOWN
        }
        break
      case MovingDirection.LEFT:
        if (random === 0) {
          this.coords.x -= this.speed
        } else {
          this.movingDirection =
            tile === 222 ? MovingDirection.DOWN : MovingDirection.UP
        }
        break
    }
  }

  changeDirectionIfCrossOrCorner(tile: number): boolean {
    let directionChanged = false
    switch (this.movingDirection) {
      case MovingDirection.UP:
        if (tile === 162) {
          this.movingDirection = MovingDirection.RIGHT
          directionChanged = true
        } else if (tile === 174 || tile === 223) {
          this.movingDirection = MovingDirection.LEFT
          directionChanged = true
        }
        break
      case MovingDirection.DOWN:
        if (tile === 182) {
          this.movingDirection = MovingDirection.LEFT
          directionChanged = true
        } else if (tile === 194 || tile === 203) {
          this.movingDirection = MovingDirection.RIGHT
          directionChanged = true
        }
        break
      case MovingDirection.RIGHT:
        if (tile === 144 || tile === 184 || tile === 233) {
          this.movingDirection = MovingDirection.UP
          directionChanged = true
        } else if (tile === 172) {
          this.movingDirection = MovingDirection.DOWN
          directionChanged = true
        }
        break
      case MovingDirection.LEFT:
        if (tile === 164 || tile === 213) {
          this.movingDirection = MovingDirection.DOWN
          directionChanged = true
        } else if (tile === 192 || tile === 214) {
          this.movingDirection = MovingDirection.UP
          directionChanged = true
        }
        break
    }
    return directionChanged
  }

  changeDirectionIfCrossBusy(
    tile: number,
    otherCarsCoords: Array<Coords>,
    nextCoords: Coords
  ) {
    switch (this.movingDirection) {
      case MovingDirection.DOWN:
        if (tile === 204) {
          const rightX = this.coords.x + this.tileSize
          const rightTileNotEmpty = otherCarsCoords.find(
            coords => rightX === coords.x && this.coords.y === coords.y
          )
          const diagTileNotEmpty = otherCarsCoords.find(
            coords => rightX === coords.x && nextCoords.y === coords.y
          )
          if (rightTileNotEmpty && diagTileNotEmpty) {
            this.movingDirection = MovingDirection.LEFT
          }
        }
        break
      case MovingDirection.RIGHT:
        if (tile === 154 || tile === 221) {
          const upperY = this.coords.y - this.tileSize
          const upperTileNotEmpty = otherCarsCoords.find(
            coords => this.coords.x === coords.x && upperY === coords.y
          )
          const diagTileNotEmpty = otherCarsCoords.find(
            coords => nextCoords.x === coords.x && upperY === coords.y
          )
          if (upperTileNotEmpty && diagTileNotEmpty) {
            this.movingDirection = MovingDirection.DOWN
          }
        }
        break
    }
  }

  getCurrentTileCoords(): Coords {
    let row: number
    let column: number
    if (
      this.movingDirection === MovingDirection.UP ||
      this.movingDirection === MovingDirection.DOWN
    ) {
      row = Math.floor(this.coords.y / this.tileSize)
      column =
        this.movingDirection === MovingDirection.UP
          ? Math.floor(this.coords.x / this.tileSize)
          : Math.ceil(this.coords.x / this.tileSize)
    } else {
      row =
        this.movingDirection === MovingDirection.LEFT
          ? Math.floor(this.coords.y / this.tileSize)
          : Math.ceil(this.coords.y / this.tileSize)
      column = Math.floor(this.coords.x / this.tileSize)
    }
    return { x: column * this.tileSize, y: row * this.tileSize }
  }

  move(roverCoords: Coords, allCarsCoords: Array<Coords>) {
    if (this.collideWithRover(roverCoords)) {
      gameManager.roverHit()
      return
    }

    // check if there is a car ahead
    const nextCoords = this.getNextCoords()
    const nextCoordsNotEmpty = !!allCarsCoords.find(
      coords =>
        Math.abs(nextCoords.x - coords.x) < this.tileSize &&
        Math.abs(nextCoords.y - coords.y) < this.tileSize &&
        !(this.coords.x === coords.x && this.coords.y === coords.y)
    )

    // Tile border
    if (
      Number.isInteger(this.coords.x / this.tileSize) &&
      Number.isInteger(this.coords.y / this.tileSize)
    ) {
      // allow car to go out of the field
      // car should disappear and appear after 5 sec
      if (
        this.movingDirection === MovingDirection.RIGHT &&
        this.coords.x / this.tileSize === this.gameMap[0][0].length - 1
      ) {
        this.coords.x += this.tileSize
        window.setTimeout(() => {
          this.coords.y -= this.tileSize
          this.movingDirection = MovingDirection.LEFT
        }, 5_000)
        return
      }

      const tile =
        this.gameMap[0][this.coords.y / this.tileSize][
          this.coords.x / this.tileSize
        ]

      // if tile is corner, certain part of cross => change direction
      const directionChanged = this.changeDirectionIfCrossOrCorner(tile)
      if (directionChanged) {
        return
      }

      // if there is a car ahead, stop or change direction on busy cross
      if (nextCoordsNotEmpty) {
        this.changeDirectionIfCrossBusy(tile, allCarsCoords, nextCoords)
        return
      }

      // if next tile is crosswalk with rover, stop
      const nextTileCoords = this.getNextCoords(this.tileSize)
      const nextCrosswalkCoords = this.getCrosswalkCoords(nextTileCoords)
      if (
        nextCrosswalkCoords &&
        this.needToStopOnCrosswalk(nextCrosswalkCoords, roverCoords)
      ) {
        return
      }

      // if current tile is cross, go straight or change direction randomly
      if (this.isAllowedToChangeDirection(tile)) {
        this.changeMovingDirectionOrGoStraight(tile)
        return
      }
    }
    // Tile middle
    else {
      // if there is a car ahead, stop
      if (nextCoordsNotEmpty) {
        return
      }

      // if current tile is crosswalk with rover, stop
      const tileCoords = this.getCurrentTileCoords()
      const crosswalkCoords = this.getCrosswalkCoords(tileCoords)
      if (
        crosswalkCoords &&
        this.needToStopOnCrosswalk(crosswalkCoords, roverCoords)
      ) {
        return
      }
    }

    this.goStraight()
  }
}
