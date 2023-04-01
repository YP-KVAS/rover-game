import { Coords, MovingDirection } from '../../utils/types/game'
import { GameBot } from './base-classes/GameBot'

export class Car extends GameBot {
  constructor(
    gameMap: Array<Array<Array<number>>>,
    tileSize: number,
    coords: Coords,
    movingDirection: MovingDirection,
    img: HTMLImageElement
  ) {
    super(gameMap, tileSize, coords, movingDirection, tileSize, img)
  }

  needToStopOnCrosswalk(tileCoords: Coords, roverCoords: Coords): boolean {
    const endX = tileCoords.x + this.tileSize * 2
    const endY = tileCoords.y + this.tileSize * 2
    return (
      (roverCoords.x >= tileCoords.x &&
        roverCoords.x <= endX &&
        roverCoords.y >= tileCoords.y &&
        roverCoords.y <= endY) ||
      (roverCoords.x + this.tileSize >= tileCoords.x &&
        roverCoords.x + this.tileSize <= endX &&
        roverCoords.y >= tileCoords.y &&
        roverCoords.y <= endY) ||
      (roverCoords.x + this.tileSize >= tileCoords.x &&
        roverCoords.x + this.tileSize <= endX &&
        roverCoords.y + this.tileSize >= tileCoords.y &&
        roverCoords.y + this.tileSize <= endY) ||
      (roverCoords.x >= tileCoords.x &&
        roverCoords.x <= endX &&
        roverCoords.y + this.tileSize >= tileCoords.y &&
        roverCoords.y + this.tileSize <= endY)
    )
  }

  getNextCrosswalkCoords(tile: number, tileCoords: Coords): Coords | null {
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

  move(roverCoords: Coords, allCarsCoords: Array<Coords>) {
    if (this.collideWithRover(roverCoords)) {
      // TODO: add game over or reduce health logic
      console.warn('Game Over')
      return
    }

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

    // if there is a car in the next tile, stop
    const nextCoords = this.getNextCoords()
    const nextTileNotEmpty = allCarsCoords.find(
      coords => nextCoords.x === coords.x && nextCoords.y === coords.y
    )
    const tile =
      this.gameMap[0][this.coords.y / this.tileSize][
        this.coords.x / this.tileSize
      ]
    if (nextTileNotEmpty) {
      // change direction if cross is fully busy
      this.changeDirectionIfCrossBusy(tile, allCarsCoords, nextCoords)
      return
    }

    // if next tile is crosswalk with rover, stop
    const nextRow = nextCoords.y / this.tileSize
    const nextColumn = nextCoords.x / this.tileSize
    const nextTile = this.gameMap[0][nextRow][nextColumn]
    const nextCrosswalkCoords = this.getNextCrosswalkCoords(
      nextTile,
      nextCoords
    )
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

    // if tile is corner, certain part of cross => change direction
    const directionChanged = this.changeDirectionIfCrossOrCorner(tile)
    if (directionChanged) {
      return
    }

    this.goStraight()
  }
}
