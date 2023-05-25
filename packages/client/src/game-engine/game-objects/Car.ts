import { Coords, MovingDirection } from '../../utils/types/game'
import { GameBot } from './base-classes/GameBot'
import eventBus, { RoverEvents } from '../services/EventBus'

export class Car extends GameBot {
  private _directionChanged = false
  private _isOutOfField = false

  constructor(
    gameMap: number[][][],
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    speed: number,
    img: HTMLImageElement
  ) {
    super(gameMap, tileSize, coords, movingDirection, speed, img)
    this.setWidthAndHeight()
  }

  setWidthAndHeight() {
    switch (this.movingDirection) {
      case MovingDirection.UP:
      case MovingDirection.DOWN:
        this.width = this.tileSize / 2
        this.height = this.tileSize
        break
      case MovingDirection.RIGHT:
      case MovingDirection.LEFT:
        this.width = this.tileSize
        this.height = this.tileSize / 2
        break
    }
  }

  needToStopOnCrosswalk(roverCoords: Coords): boolean {
    let needToStop = false
    switch (this.movingDirection) {
      case MovingDirection.UP:
        needToStop = this.coords.y - roverCoords.y >= this.tileSize
        break
      case MovingDirection.DOWN:
        needToStop = roverCoords.y - this.coords.y >= this.tileSize
        break
      case MovingDirection.RIGHT:
        needToStop = roverCoords.x - this.coords.x >= this.tileSize
        break
      case MovingDirection.LEFT:
        needToStop = this.coords.x - roverCoords.x >= this.tileSize
        break
    }

    return needToStop
  }

  getCrosswalkCoords(tileCoords: Coords): Coords | null {
    const tile =
      this.gameMap[0][tileCoords.y / this.tileSize][
        tileCoords.x / this.tileSize
      ]

    let startX: number | null = null
    let startY: number | null = null

    // check if next tile is crosswalk
    switch (this.movingDirection) {
      case MovingDirection.UP:
        if (tile === 133) {
          startX = tileCoords.x - this.tileSize
          startY = tileCoords.y - this.tileSize
        }
        break
      case MovingDirection.DOWN:
        if (tile === 131) {
          startX = tileCoords.x
          startY = tileCoords.y
        }
        break
      case MovingDirection.RIGHT:
        if (tile === 143) {
          startX = tileCoords.x
          startY = tileCoords.y - this.tileSize
        }
        break
      case MovingDirection.LEFT:
        if (tile === 141) {
          startX = tileCoords.x - this.tileSize
          startY = tileCoords.y
        }
        break
    }

    return startX && startY ? { x: startX, y: startY } : null
  }

  isAllowedToChangeDirection(tile: number): boolean {
    let allowedToChange = false
    switch (this.movingDirection) {
      case MovingDirection.UP:
        allowedToChange =
          tile === 152 ||
          tile === 153 ||
          tile === 211 ||
          tile === 224 ||
          tile === 232
        break
      case MovingDirection.DOWN:
        allowedToChange =
          tile === 212 ||
          tile === 151 ||
          tile === 154 ||
          tile === 204 ||
          tile === 231
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

  changeMovingDirectionOrNotRandomly(tile: number): boolean {
    const random = Math.round(Math.random())
    let directionChanged = false

    switch (this.movingDirection) {
      case MovingDirection.UP:
        if (random === 0) {
          this.movingDirection =
            tile === 232 || tile === 152
              ? MovingDirection.LEFT
              : MovingDirection.RIGHT
          directionChanged = true
          this.setWidthAndHeight()
        }
        break

      case MovingDirection.DOWN:
        if (random === 0) {
          this.movingDirection =
            tile === 212 || tile === 154
              ? MovingDirection.RIGHT
              : MovingDirection.LEFT
          directionChanged = true
          this.setWidthAndHeight()
        }
        break

      case MovingDirection.RIGHT:
        if (random === 0) {
          this.movingDirection =
            tile === 204
              ? MovingDirection.LEFT
              : tile === 202 || tile === 153
              ? MovingDirection.UP
              : MovingDirection.DOWN
          directionChanged = true
          this.setWidthAndHeight()
        }
        break

      case MovingDirection.LEFT:
        if (random === 0) {
          this.movingDirection =
            tile === 222 || tile === 151
              ? MovingDirection.DOWN
              : MovingDirection.UP
          directionChanged = true
          this.setWidthAndHeight()
        }
        break
    }

    return directionChanged
  }

  changeDirectionIfCrossOrCorner(tile: number): boolean {
    let directionChanged = false
    switch (this.movingDirection) {
      case MovingDirection.UP:
        if (tile === 162) {
          this.movingDirection = MovingDirection.RIGHT
          directionChanged = true
          this.setWidthAndHeight()
        } else if (tile === 174 || tile === 223) {
          this.movingDirection = MovingDirection.LEFT
          directionChanged = true
          this.setWidthAndHeight()
        }
        break
      case MovingDirection.DOWN:
        if (tile === 182) {
          this.movingDirection = MovingDirection.LEFT
          directionChanged = true
          this.setWidthAndHeight()
        } else if (tile === 194 || tile === 203) {
          this.movingDirection = MovingDirection.RIGHT
          directionChanged = true
          this.setWidthAndHeight()
        }
        break
      case MovingDirection.RIGHT:
        if (tile === 144 || tile === 184 || tile === 233) {
          this.movingDirection = MovingDirection.UP
          directionChanged = true
          this.setWidthAndHeight()
        } else if (tile === 172) {
          this.movingDirection = MovingDirection.DOWN
          directionChanged = true
          this.setWidthAndHeight()
        }
        break
      case MovingDirection.LEFT:
        if (tile === 164 || tile === 213) {
          this.movingDirection = MovingDirection.DOWN
          directionChanged = true
          this.setWidthAndHeight()
        } else if (tile === 192) {
          this.movingDirection = MovingDirection.UP
          directionChanged = true
          this.setWidthAndHeight()
        }
        break
    }
    return directionChanged
  }

  changeDirectionIfCrossBusy(
    tile: number,
    otherCarsCoords: Coords[],
    nextTileCoords: Coords
  ) {
    switch (this.movingDirection) {
      case MovingDirection.DOWN:
        if (tile === 204) {
          const rightX = this.coords.x + this.tileSize
          const rightTileNotEmpty = otherCarsCoords.find(
            coords => rightX === coords.x && this.coords.y === coords.y
          )
          const diagTileNotEmpty = otherCarsCoords.find(
            coords => rightX === coords.x && nextTileCoords.y === coords.y
          )
          if (rightTileNotEmpty && diagTileNotEmpty) {
            this.movingDirection = MovingDirection.LEFT
            this.setWidthAndHeight()
          }
        }
        break
      case MovingDirection.RIGHT:
        if (tile === 154 || tile === 221 || tile === 234) {
          const upperY = this.coords.y - this.tileSize
          const upperTileNotEmpty = !!otherCarsCoords.find(
            coords => this.coords.x === coords.x && upperY === coords.y
          )
          const diagTileNotEmpty = !!otherCarsCoords.find(
            coords => nextTileCoords.x === coords.x && upperY === coords.y
          )
          if (upperTileNotEmpty && diagTileNotEmpty) {
            this.movingDirection = MovingDirection.DOWN
            this.setWidthAndHeight()
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

  move(roverCoords: Coords, allCarsCoords: Coords[]) {
    if (this._isOutOfField) {
      return
    }

    if (this.collideWithRover(roverCoords)) {
      eventBus.emit(RoverEvents.CAR_COLLIDE)
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
        this.coords.x / this.tileSize === this.gameMap[0][0].length
      ) {
        this.coords.x += this.tileSize * 2
        this._isOutOfField = true
        window.setTimeout(() => {
          this.coords.y -= this.tileSize
          this.movingDirection = MovingDirection.LEFT
          this._isOutOfField = false
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

      const nextTileCoords = this.getNextCoords(this.tileSize)

      // if there is a car ahead, stop or change direction on busy cross
      if (nextCoordsNotEmpty) {
        this.changeDirectionIfCrossBusy(tile, allCarsCoords, nextTileCoords)
        return
      }

      // if current tile is cross, change direction or not randomly
      if (!this._directionChanged && this.isAllowedToChangeDirection(tile)) {
        const directionChanged = this.changeMovingDirectionOrNotRandomly(tile)
        if (directionChanged) {
          this._directionChanged = true
          return
        }
      }

      // if next tile is crosswalk with rover, stop
      const nextCrosswalkCoords = this.getCrosswalkCoords(nextTileCoords)
      if (nextCrosswalkCoords) {
        const crosswalkRect = {
          coords: nextCrosswalkCoords,
          width: this.tileSize * 2,
          height: this.tileSize * 2,
        }
        if (
          this.collideWithRover(roverCoords, crosswalkRect) &&
          this.needToStopOnCrosswalk(roverCoords)
        ) {
          return
        }
      }

      this._directionChanged = false
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
      if (crosswalkCoords) {
        const crosswalkRect = {
          coords: crosswalkCoords,
          width: this.tileSize * 2,
          height: this.tileSize * 2,
        }
        if (
          this.collideWithRover(roverCoords, crosswalkRect) &&
          this.needToStopOnCrosswalk(roverCoords)
        ) {
          return
        }
      }
    }

    this.goStraight()
  }
}
