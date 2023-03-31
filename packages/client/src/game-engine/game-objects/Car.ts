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

  needToStopOnCrosswalk(tile: number, tileCoords: Coords, roverCoords: Coords) {
    let needToStop = false
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

    // check if rover is on/in front of the crosswalk
    if (startX && startY) {
      const endX = startX + this.tileSize * 2
      const endY = startY + this.tileSize * 2
      needToStop =
        (roverCoords.x >= startX &&
          roverCoords.x <= endX &&
          roverCoords.y >= startY &&
          roverCoords.y <= endY) ||
        (roverCoords.x + this.tileSize >= startX &&
          roverCoords.x + this.tileSize <= endX &&
          roverCoords.y >= startY &&
          roverCoords.y <= endY) ||
        (roverCoords.x + this.tileSize >= startX &&
          roverCoords.x + this.tileSize <= endX &&
          roverCoords.y + this.tileSize >= startY &&
          roverCoords.y + this.tileSize <= endY) ||
        (roverCoords.x >= startX &&
          roverCoords.x <= endX &&
          roverCoords.y + this.tileSize >= startY &&
          roverCoords.y + this.tileSize <= endY)
    }
    return needToStop
  }

  move(roverCoords: Coords, allCarsCoords: Array<Coords>) {
    if (this.collideWithRover(roverCoords)) {
      // TODO: add game over or reduce health logic
      console.warn('Game Over')
      return
    }

    const row = this.coords.y / this.tileSize
    const column = this.coords.x / this.tileSize
    const tile = this.gameMap[0][row][column]

    switch (this.movingDirection) {
      case MovingDirection.UP: {
        const nextX = column * this.tileSize
        const nextY = (row - 1) * this.tileSize
        const nextTileNotEmpty = allCarsCoords.find(
          coords => nextX === coords.x && nextY === coords.y
        )
        // if there is a car in the next tile, stop
        if (nextTileNotEmpty) {
          break
        }
        const nextTile = this.gameMap[0][row - 1][column]
        // if next tile is crosswalk with rover, stop
        if (
          this.needToStopOnCrosswalk(
            nextTile,
            { x: nextX, y: nextY },
            roverCoords
          )
        ) {
          break
        }
        // if current tile is cross, go straight or change direction randomly
        if (tile === 211 || tile === 224 || tile === 232) {
          if (Math.round(Math.random()) === 0) {
            this.coords.y -= this.tileSize
          } else {
            this.movingDirection =
              tile === 232 ? MovingDirection.LEFT : MovingDirection.RIGHT
          }
        }
        // if corner or cross => change direction
        else if (tile === 162) {
          this.movingDirection = MovingDirection.RIGHT
        } else if (tile === 174 || tile === 223) {
          this.movingDirection = MovingDirection.LEFT
        }
        // if straight road, crosswalk or certain part corner/cross => continue to move
        else {
          this.coords.y -= this.tileSize
        }
        break
      }

      case MovingDirection.DOWN: {
        const nextX = column * this.tileSize
        const nextY = (row + 1) * this.tileSize
        const nextTileNotEmpty = allCarsCoords.find(
          coords => nextX === coords.x && nextY === coords.y
        )
        // if there is a car in the next tile, stop
        if (nextTileNotEmpty) {
          // change direction if cross is fully busy
          if (tile === 204) {
            const rightX = (column + 1) * this.tileSize
            const rightY = row * this.tileSize
            const rightTileNotEmpty = allCarsCoords.find(
              coords => rightX === coords.x && rightY === coords.y
            )
            const diagTileNotEmpty = allCarsCoords.find(
              coords => rightX === coords.x && nextY === coords.y
            )
            if (rightTileNotEmpty && diagTileNotEmpty) {
              this.movingDirection = MovingDirection.LEFT
            }
          }
          break
        }
        const nextTile = this.gameMap[0][row + 1][column]
        // if next tile is crosswalk with rover, stop
        if (
          this.needToStopOnCrosswalk(
            nextTile,
            { x: nextX, y: nextY },
            roverCoords
          )
        ) {
          break
        }
        // if current tile is cross, go straight or change direction randomly
        if (tile === 212 || tile === 151 || tile === 204 || tile === 231) {
          if (Math.round(Math.random()) === 0) {
            this.coords.y += this.tileSize
          } else {
            this.movingDirection =
              tile === 212 ? MovingDirection.RIGHT : MovingDirection.LEFT
          }
        }
        // if corner => change direction
        else if (tile === 182) {
          this.movingDirection = MovingDirection.LEFT
        } else if (tile === 194 || tile === 203) {
          this.movingDirection = MovingDirection.RIGHT
        }
        // if straight road, crosswalk or certain part corner/cross => continue to move
        else {
          this.coords.y += this.tileSize
        }
        break
      }

      case MovingDirection.RIGHT: {
        // allow car to go out of the field
        // car should disappear and appear after 5 sec
        if (column === this.gameMap[0][0].length - 1) {
          this.coords.x += this.tileSize
          window.setTimeout(() => {
            this.coords.y -= this.tileSize
            this.movingDirection = MovingDirection.LEFT
          }, 5_000)
          break
        }

        const nextX = (column + 1) * this.tileSize
        const nextY = row * this.tileSize
        const nextTileNotEmpty = allCarsCoords.find(
          coords => nextX === coords.x && nextY === coords.y
        )
        // if there is a car in the next tile, stop
        if (nextTileNotEmpty) {
          // change direction if cross is fully busy
          if (tile === 154 || tile === 221) {
            const upperX = column * this.tileSize
            const upperY = (row - 1) * this.tileSize
            const upperTileNotEmpty = allCarsCoords.find(
              coords => upperX === coords.x && upperY === coords.y
            )
            const diagTileNotEmpty = allCarsCoords.find(
              coords => nextX === coords.x && upperY === coords.y
            )
            if (upperTileNotEmpty && diagTileNotEmpty) {
              this.movingDirection = MovingDirection.DOWN
            }
          }
          break
        }

        const nextTile = this.gameMap[0][row][column + 1]
        // if next tile is crosswalk with rover, stop
        if (
          this.needToStopOnCrosswalk(
            nextTile,
            { x: nextX, y: nextY },
            roverCoords
          )
        ) {
          break
        }
        // if current tile is cross, go straight or change direction randomly
        if (
          tile === 221 ||
          tile === 202 ||
          tile === 204 ||
          tile === 154 ||
          tile === 153 ||
          tile === 234
        ) {
          if (Math.round(Math.random()) === 0) {
            tile === 204
              ? (this.coords.y += this.tileSize)
              : (this.coords.x += this.tileSize)
          } else {
            this.movingDirection =
              tile === 204
                ? MovingDirection.LEFT
                : tile === 202 || tile === 153
                ? MovingDirection.UP
                : MovingDirection.DOWN
          }
        }
        // if corner, cross => change direction
        else if (tile === 144 || tile === 184 || tile === 233) {
          this.movingDirection = MovingDirection.UP
        } else if (tile === 172) {
          this.movingDirection = MovingDirection.DOWN
        }
        // if straight road, crosswalk or certain part corner/cross => continue to move
        else {
          this.coords.x += this.tileSize
        }
        break
      }

      case MovingDirection.LEFT: {
        const nextX = (column - 1) * this.tileSize
        const nextY = row * this.tileSize
        const nextTileNotEmpty = allCarsCoords.find(
          coords => nextX === coords.x && nextY === coords.y
        )
        // if there is a car in the next tile, stop
        if (nextTileNotEmpty) {
          break
        }
        const nextTile = this.gameMap[0][row][column - 1]
        // if next tile is crosswalk with rover, stop
        if (
          this.needToStopOnCrosswalk(
            nextTile,
            { x: nextX, y: nextY },
            roverCoords
          )
        ) {
          break
        }
        // if current tile is cross, go straight or change direction randomly
        if (tile === 214 || tile === 222 || tile === 201 || tile === 152) {
          if (Math.round(Math.random()) === 0) {
            this.coords.x -= this.tileSize
          } else {
            this.movingDirection =
              tile === 222 ? MovingDirection.DOWN : MovingDirection.UP
          }
        }
        // if corner, cross => change direction
        else if (tile === 164 || tile === 213) {
          this.movingDirection = MovingDirection.DOWN
        } else if (tile === 192 || tile === 214) {
          this.movingDirection = MovingDirection.UP
        }
        // if straight road, crosswalk or certain part corner => continue to move
        else {
          this.coords.x -= this.tileSize
        }
        break
      }
    }
  }
}
