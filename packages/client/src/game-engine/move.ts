import { Car, Coords, MovingDirection, Rover } from '../utils/types/game'

export const roverMove = (
  rover: Rover,
  tileSize: number,
  gameMap: Array<Array<Array<number>>>
) => {
  // change y-coords for up and down
  if (rover.movingDirection === MovingDirection.UP || rover.movingDirection === MovingDirection.DOWN) {
    const futureYCoordinate =
      rover.movingDirection === MovingDirection.UP
        ? rover.coords.y - rover.speed
        : rover.coords.y + rover.speed

    // if rover stays in the same tile(-s)
    if (!Number.isInteger(rover.coords.y / tileSize)) {
      rover.coords.y = futureYCoordinate
      return
    }

    const rowIndexLeft = Math.floor(rover.coords.x / tileSize)
    const rowIndexRight = Math.floor(
      (rover.coords.x + tileSize - 1) / tileSize
    )
    const futureColumnIndex =
      rover.movingDirection === MovingDirection.UP
        ? Math.floor(futureYCoordinate / tileSize)
        : Math.ceil(futureYCoordinate / tileSize)

    const futureTileLeft = gameMap[1][futureColumnIndex][rowIndexLeft]
    const futureTileRight = gameMap[1][futureColumnIndex][rowIndexRight]

    if (futureTileLeft === -1 && futureTileRight === -1) {
      rover.coords.y = futureYCoordinate
    }
  }
  // change x-coords for right and left
  else {
    const futureXCoordinate =
      rover.movingDirection === MovingDirection.RIGHT
        ? rover.coords.x + rover.speed
        : rover.coords.x - rover.speed

    // if rover stays in the same tile(-s)
    if (!Number.isInteger(rover.coords.x / tileSize)) {
      rover.coords.x = futureXCoordinate
      return
    }

    const columnIndexTop = Math.floor(rover.coords.y / tileSize)
    const columnIndexBottom = Math.floor(
      (rover.coords.y + tileSize - 1) / tileSize
    )
    const futureRowIndex =
      rover.movingDirection === MovingDirection.RIGHT
        ? Math.ceil(futureXCoordinate / tileSize)
        : Math.floor(futureXCoordinate / tileSize)

    const futureTileTop = gameMap[1][columnIndexTop][futureRowIndex]
    const futureTileBottom = gameMap[1][columnIndexBottom][futureRowIndex]

    if (futureTileTop === -1 && futureTileBottom === -1) {
      rover.coords.x = futureXCoordinate
    }
  }
}

const needToStopOnCrosswalk = (
  tile: number,
  tileSize: number,
  tileCoords: Coords,
  roverCoords: Coords
) => {
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
      startX = tileCoords.x - tileSize
      startY = tileCoords.y
      break
    case 133:
    case 142:
      startX = tileCoords.x - tileSize
      startY = tileCoords.y - tileSize
      break
    case 134:
    case 143:
      startX = tileCoords.x
      startY = tileCoords.y - tileSize
      break
  }

  // check if rover is on/in front of the crosswalk
  if (startX && startY) {
    const endX = startX + tileSize * 2
    const endY = startY + tileSize * 2
    needToStop =
      (roverCoords.x >= startX &&
        roverCoords.x <= endX &&
        roverCoords.y >= startY &&
        roverCoords.y <= endY) ||

      (roverCoords.x + tileSize >= startX &&
        roverCoords.x + tileSize <= endX &&
        roverCoords.y >= startY &&
        roverCoords.y <= endY) ||

      (roverCoords.x + tileSize >= startX &&
        roverCoords.x + tileSize <= endX &&
        roverCoords.y + tileSize >= startY &&
        roverCoords.y + tileSize <= endY) ||

      (roverCoords.x >= startX &&
        roverCoords.x <= endX &&
        roverCoords.y + tileSize >= startY &&
        roverCoords.y + tileSize <= endY)
  }
  return needToStop
}

export const carMove = (
  car: Car,
  tileSize: number,
  bgLayer: Array<Array<number>>,
  roverCoords: Coords,
  allCarsCoords: Array<Coords>
) => {
  const row = car.coords.y / tileSize
  const column = car.coords.x / tileSize
  const tile = bgLayer[row][column]

  switch (car.movingDirection) {
    case MovingDirection.UP: {
      const x = column * tileSize
      const y = (row - 1) * tileSize
      const nextTileNotEmpty = allCarsCoords.find(
        coords => x === coords.x && y === coords.y
      )
      // if there is a car in the next tile, stop
      if (nextTileNotEmpty) {
        break
      }
      const nextTile = bgLayer[row - 1][column]
      // if next tile is crosswalk with rover, stop
      if (needToStopOnCrosswalk(nextTile, tileSize, { x, y }, roverCoords)) {
        break
      }
      // if current tile is cross, go straight or change direction randomly
      if (tile === 211 || tile === 224 || tile === 232) {
        if (Math.round(Math.random()) === 0) {
          car.coords.y -= tileSize
        } else {
          car.movingDirection =
            tile === 232 ? MovingDirection.LEFT : MovingDirection.RIGHT
        }
      }
      // if corner or cross => change direction
       else if (tile === 162) {
        car.movingDirection = MovingDirection.RIGHT
      } else if (tile === 174 || tile === 223) {
        car.movingDirection = MovingDirection.LEFT
      }
      // if straight road, crosswalk or certain part corner/cross => continue to move
       else {
        car.coords.y -= tileSize
      }
      break
    }

    case MovingDirection.DOWN: {
      const x = column * tileSize
      const y = (row + 1) * tileSize
      const nextTileNotEmpty = allCarsCoords.find(
        coords => x === coords.x && y === coords.y
      )
      // if there is a car in the next tile, stop
      if (nextTileNotEmpty) {
        break
      }
      const nextTile = bgLayer[row + 1][column]
      // if next tile is crosswalk with rover, stop
      if (needToStopOnCrosswalk(nextTile, tileSize, { x, y }, roverCoords)) {
        break
      }
      // if current tile is cross, go straight or change direction randomly
      if (tile === 212 || tile === 151 || tile === 204 || tile === 231) {
        if (Math.round(Math.random()) === 0) {
          car.coords.y += tileSize
        } else {
          car.movingDirection =
            tile === 212 ? MovingDirection.RIGHT : MovingDirection.LEFT
        }
      }
      // if corner => change direction
      else if (tile === 182) {
        car.movingDirection = MovingDirection.LEFT
      } else if (tile === 194 || tile === 203) {
        car.movingDirection = MovingDirection.RIGHT
      }
      // if straight road, crosswalk or certain part corner/cross => continue to move
      else {
        car.coords.y += tileSize
      }
      break
    }

    case MovingDirection.RIGHT: {
      // allow car to go out of the field
      // car should disappear and appear after 5 sec
      if (column === bgLayer[0].length - 1) {
        car.coords.x += tileSize
        window.setTimeout(() => {
          car.coords.y -= tileSize
          car.movingDirection = MovingDirection.LEFT
        }, 5_000)
        break
      }

      const x = (column + 1) * tileSize
      const y = row * tileSize
      const nextTileNotEmpty = allCarsCoords.find(
        coords => x === coords.x && y === coords.y
      )
      // if there is a car in the next tile, stop
      if (nextTileNotEmpty) {
        break
      }

      const nextTile = bgLayer[row][column + 1]
      // if next tile is crosswalk with rover, stop
      if (needToStopOnCrosswalk(nextTile, tileSize, { x, y }, roverCoords)) {
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
          tile === 204 ? (car.coords.y += tileSize) : (car.coords.x += tileSize)
        } else {
          car.movingDirection =
            tile === 204
              ? MovingDirection.LEFT
              : tile === 202 || tile === 153
                ? MovingDirection.UP
                : MovingDirection.DOWN
        }
      }
      // if corner, cross => change direction
      else if (tile === 144 || tile === 184 || tile === 233) {
        car.movingDirection = MovingDirection.UP
      } else if (tile === 172) {
        car.movingDirection = MovingDirection.DOWN
      }
      // if straight road, crosswalk or certain part corner/cross => continue to move
      else {
        car.coords.x += tileSize
      }
      break
    }

    case MovingDirection.LEFT: {
      const x = (column - 1) * tileSize
      const y = row * tileSize
      const nextTileNotEmpty = allCarsCoords.find(
        coords => x === coords.x && y === coords.y
      )
      // if there is a car in the next tile, stop
      if (nextTileNotEmpty) {
        break
      }
      const nextTile = bgLayer[row][column - 1]
      // if next tile is crosswalk with rover, stop
      if (needToStopOnCrosswalk(nextTile, tileSize, { x, y }, roverCoords)) {
        break
      }
      // if current tile is cross, go straight or change direction randomly
      if (tile === 214 || tile === 222 || tile === 201 || tile === 152) {
        if (Math.round(Math.random()) === 0) {
          car.coords.x -= tileSize
        } else {
          car.movingDirection =
            tile === 222 ? MovingDirection.DOWN : MovingDirection.UP
        }
      }
      // if corner, cross => change direction
      else if (tile === 164 || tile === 213) {
        car.movingDirection = MovingDirection.DOWN
      } else if (tile === 192 || tile === 214) {
        car.movingDirection = MovingDirection.UP
      }
      // if straight road, crosswalk or certain part corner => continue to move
      else {
        car.coords.x -= tileSize
      }
      break
    }
  }
}
