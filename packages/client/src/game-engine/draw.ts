import { getRoverImgToDisplay, tileMapImages } from './game-images'
import { Car, MovingDirection, Rover } from '../utils/types/game'

const IMG_WIDTH = 128
const spriteSize = IMG_WIDTH / 2

export const drawTile = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  column: number,
  row: number,
  tileSize: number,
  spriteX = 0,
  spriteY = 0,
  spriteSize = img.width
) =>
  ctx.drawImage(
    img,
    spriteX,
    spriteY,
    spriteSize,
    spriteSize,
    column * tileSize,
    row * tileSize,
    tileSize,
    tileSize
  )

export const drawRotatedTile = (
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  column: number,
  row: number,
  tileSize: number,
  degrees: number,
  spriteX = 0,
  spriteY = 0,
  spriteSize = img.width
) => {
  ctx.save()
  ctx.translate(column * tileSize + tileSize / 2, row * tileSize + tileSize / 2)
  ctx.rotate((degrees * Math.PI) / 180)
  ctx.translate(
    -1 * (column * tileSize + tileSize / 2),
    -1 * (row * tileSize + tileSize / 2)
  )
  drawTile(ctx, img, column, row, tileSize, spriteX, spriteY, spriteSize)
  ctx.restore()
}

export const drawCar = (
  ctx: CanvasRenderingContext2D,
  car: Car,
  tileSize: number
) => {
  const row = car.coords.y / tileSize
  const column = car.coords.x / tileSize
  const img = car.img

  switch (car.movingDirection) {
    case MovingDirection.UP:
      drawTile(ctx, img, column, row, tileSize)
      break
    case MovingDirection.RIGHT:
      drawRotatedTile(ctx, img, column, row, tileSize, 90)
      break
    case MovingDirection.DOWN:
      drawRotatedTile(ctx, img, column, row, tileSize, 180)
      break
    case MovingDirection.LEFT:
      drawRotatedTile(ctx, img, column, row, tileSize, -90)
      break
  }
}

export const drawRover = (
  ctx: CanvasRenderingContext2D,
  rover: Rover,
  tileSize: number
) => {
  const img = getRoverImgToDisplay(rover.movingDirection)
  // vertical offset to correctly display rover in a tile
  const offset = Math.round((img.height / IMG_WIDTH) * tileSize - tileSize)
  const additionalOffset =
    rover.movingDirection === MovingDirection.RIGHT ||
    rover.movingDirection === MovingDirection.LEFT
      ? tileSize / 8
      : 0
  ctx.drawImage(
    img,
    rover.coords.x,
    rover.coords.y - offset - additionalOffset,
    tileSize,
    tileSize + offset
  )
}

// prettier-ignore
export const drawStaticLayer = (
  ctx: CanvasRenderingContext2D,
  layer: Array<Array<number>>, tileSize: number
) => {
  for (let row = 0; row < layer.length; row++) {
    for (let column = 0; column < layer[row].length; column++) {
      const tile = layer[row][column]
      switch (tile) {
        // sidewalk
        case 0:
          drawTile(ctx, tileMapImages.sideWalk, column, row, tileSize)
          break
        case 1:
          drawTile(ctx, tileMapImages.sideWalk2, column, row, tileSize)
          break
        // road straight
        case 111:
          drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 90, 0, 0, spriteSize)
          break
        case 112:
          drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 90, spriteSize , 0, spriteSize)
          break
        case 113:
          drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 90, spriteSize , spriteSize , spriteSize)
          break
        case 114:
          drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 90, 0, spriteSize , spriteSize)
          break
        case 121:
          drawTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 0, 0, spriteSize)
          break
        case 122:
          drawTile(ctx, tileMapImages.roadStraight, column, row, tileSize, spriteSize, 0, spriteSize)
          break
        case 123:
          drawTile(ctx, tileMapImages.roadStraight, column, row, tileSize, spriteSize, spriteSize, spriteSize)
          break
        case 124:
          drawTile(ctx, tileMapImages.roadStraight, column, row, tileSize, 0, spriteSize, spriteSize)
          break
        // crosswalk
        case 131:
          drawTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 0, 0, spriteSize)
          break
        case 132:
          drawTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, spriteSize, 0, spriteSize)
          break
        case 133:
          drawTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, spriteSize, spriteSize, spriteSize)
          break
        case 134:
          drawTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 0, spriteSize, spriteSize)
          break
        case 141:
          drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 90,0, 0, spriteSize)
          break
        case 142:
          drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 90,spriteSize, 0, spriteSize)
          break
        case 143:
          drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 90,spriteSize, spriteSize, spriteSize)
          break
        case 144:
          drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, tileSize, 90,0, spriteSize, spriteSize)
          break
        // cross
        case 151:
          drawTile(ctx, tileMapImages.roadCross, column, row, tileSize, 0, 0, spriteSize)
          break
        case 152:
          drawTile(ctx, tileMapImages.roadCross, column, row, tileSize, spriteSize, 0, spriteSize)
          break
        case 153:
          drawTile(ctx, tileMapImages.roadCross, column, row, tileSize, spriteSize, spriteSize, spriteSize)
          break
        case 154:
          drawTile(ctx, tileMapImages.roadCross, column, row, tileSize, 0, spriteSize, spriteSize)
          break
        // road corner
        case 161:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 90,0, 0, spriteSize)
          break
        case 162:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 90,spriteSize, 0, spriteSize)
          break
        case 163:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 90,spriteSize, spriteSize, spriteSize)
          break
        case 164:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 90,0, spriteSize, spriteSize)
          break
        case 171:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 180,0, 0, spriteSize)
          break
        case 172:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 180,spriteSize, 0, spriteSize)
          break
        case 173:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 180,spriteSize, spriteSize, spriteSize)
          break
        case 174:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 180,0, spriteSize, spriteSize)
          break
        case 181:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, -90,0, 0, spriteSize)
          break
        case 182:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, -90,spriteSize, 0, spriteSize)
          break
        case 183:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, -90,spriteSize, spriteSize, spriteSize)
          break
        case 184:
          drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, tileSize, -90,0, spriteSize, spriteSize)
          break
        case 191:
          drawTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 0, 0, spriteSize)
          break
        case 192:
          drawTile(ctx, tileMapImages.roadCorner, column, row, tileSize, spriteSize, 0, spriteSize)
          break
        case 193:
          drawTile(ctx, tileMapImages.roadCorner, column, row, tileSize, spriteSize, spriteSize, spriteSize)
          break
        case 194:
          drawTile(ctx, tileMapImages.roadCorner, column, row, tileSize, 0, spriteSize, spriteSize)
          break
        // T-cross
        case 201:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 90,0, 0, spriteSize)
          break
        case 202:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 90,spriteSize, 0, spriteSize)
          break
        case 203:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 90,spriteSize, spriteSize, spriteSize)
          break
        case 204:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 90,0, spriteSize, spriteSize)
          break
        case 211:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 180,0, 0, spriteSize)
          break
        case 212:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 180,spriteSize , 0, spriteSize)
          break
        case 213:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 180,spriteSize , spriteSize , spriteSize)
          break
        case 214:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 180,0, spriteSize , spriteSize)
          break
        case 221:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, -90,0, 0, spriteSize)
          break
        case 222:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, -90,spriteSize , 0, spriteSize)
          break
        case 223:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, -90,spriteSize , spriteSize , spriteSize)
          break
        case 224:
          drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, tileSize, -90,0, spriteSize , spriteSize)
          break
        case 231:
          drawTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 0, 0, spriteSize)
          break
        case 232:
          drawTile(ctx, tileMapImages.roadTCross, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 233:
          drawTile(ctx, tileMapImages.roadTCross, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 234:
          drawTile(ctx, tileMapImages.roadTCross, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        // plants
        case 31:
          drawTile(ctx, tileMapImages.tree, column, row, tileSize)
          break
        case 32:
          drawTile(ctx, tileMapImages.flower, column, row, tileSize)
          break
        // post office
        case 411:
          drawTile(ctx, tileMapImages.postOffice, column, row, tileSize, 0, 0, spriteSize)
          break
        case 412:
          drawTile(ctx, tileMapImages.postOffice, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 413:
          drawTile(ctx, tileMapImages.postOffice, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 414:
          drawTile(ctx, tileMapImages.postOffice, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        // houses
        case 421:
          drawTile(ctx, tileMapImages.house1, column, row, tileSize, 0, 0, spriteSize)
          break
        case 422:
          drawTile(ctx, tileMapImages.house1, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 423:
          drawTile(ctx, tileMapImages.house1, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 424:
          drawTile(ctx, tileMapImages.house1, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 431:
          drawTile(ctx, tileMapImages.house2, column, row, tileSize, 0, 0, spriteSize)
          break
        case 432:
          drawTile(ctx, tileMapImages.house2, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 433:
          drawTile(ctx, tileMapImages.house2, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 434:
          drawTile(ctx, tileMapImages.house2, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 441:
          drawTile(ctx, tileMapImages.policeOffice, column, row, tileSize, 0, 0, spriteSize)
          break
        case 442:
          drawTile(ctx, tileMapImages.policeOffice, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 443:
          drawTile(ctx, tileMapImages.policeOffice, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 444:
          drawTile(ctx, tileMapImages.policeOffice, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 451:
          drawTile(ctx, tileMapImages.hospital, column, row, tileSize, 0, 0, spriteSize)
          break
        case 452:
          drawTile(ctx, tileMapImages.hospital, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 453:
          drawTile(ctx, tileMapImages.hospital, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 454:
          drawTile(ctx, tileMapImages.hospital, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 461:
          drawTile(ctx, tileMapImages.zoo, column, row, tileSize, 0, 0, spriteSize)
          break
        case 462:
          drawTile(ctx, tileMapImages.zoo, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 463:
          drawTile(ctx, tileMapImages.zoo, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 464:
          drawTile(ctx, tileMapImages.zoo, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 471:
          drawTile(ctx, tileMapImages.warehouse, column, row, tileSize, 0, 0, spriteSize)
          break
        case 472:
          drawTile(ctx, tileMapImages.warehouse, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 473:
          drawTile(ctx, tileMapImages.warehouse, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 474:
          drawTile(ctx, tileMapImages.warehouse, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 481:
          drawTile(ctx, tileMapImages.school, column, row, tileSize, 0, 0, spriteSize)
          break
        case 482:
          drawTile(ctx, tileMapImages.school, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 483:
          drawTile(ctx, tileMapImages.school, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 484:
          drawTile(ctx, tileMapImages.school, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 511:
          drawTile(ctx, tileMapImages.market, column, row, tileSize, 0, 0, spriteSize)
          break
        case 512:
          drawTile(ctx, tileMapImages.market, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 513:
          drawTile(ctx, tileMapImages.market, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 514:
          drawTile(ctx, tileMapImages.market, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 521:
          drawTile(ctx, tileMapImages.shop, column, row, tileSize, 0, 0, spriteSize)
          break
        case 522:
          drawTile(ctx, tileMapImages.shop, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 523:
          drawTile(ctx, tileMapImages.shop, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 524:
          drawTile(ctx, tileMapImages.shop, column, row, tileSize, 0, spriteSize , spriteSize)
          break
        case 531:
          drawTile(ctx, tileMapImages.cafe, column, row, tileSize, 0, 0, spriteSize)
          break
        case 532:
          drawTile(ctx, tileMapImages.cafe, column, row, tileSize, spriteSize , 0, spriteSize)
          break
        case 533:
          drawTile(ctx, tileMapImages.cafe, column, row, tileSize, spriteSize , spriteSize , spriteSize)
          break
        case 534:
          drawTile(ctx, tileMapImages.cafe, column, row, tileSize, 0, spriteSize , spriteSize)
          break
      }
      // ctx.strokeStyle = 'blue'
      // ctx.strokeRect(column * tileSize, row * tileSize, tileSize, tileSize)
    }
  }
}
