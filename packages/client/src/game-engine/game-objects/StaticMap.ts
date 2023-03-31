import { BaseGameObject } from './base-classes/BaseGameObject'
import { tileMapImages } from '../game-images'
import { spriteSize } from '../../utils/const-variables/game'

export class StaticMap extends BaseGameObject {
  constructor(gameMap: Array<Array<Array<number>>>, tileSize: number) {
    super(gameMap, tileSize)
  }

  // prettier-ignore
  draw(ctx: CanvasRenderingContext2D): void {
    for (let layer = 0; layer < this.gameMap.length; layer++) {
      for (let row = 0; row < this.gameMap[layer].length; row++) {
        for (let column = 0; column < this.gameMap[layer][row].length; column++) {
          const tile = this.gameMap[layer][row][column]
          switch (tile) {
            // sidewalk
            case 0:
              this.drawTile(ctx, tileMapImages.sideWalk, column, row)
              break
            case 1:
              this.drawTile(ctx, tileMapImages.sideWalk2, column, row)
              break
            // road straight
            case 111:
              this.drawRotatedTile(ctx, tileMapImages.roadStraight, column, row,90, 0, 0, spriteSize)
              break
            case 112:
              this.drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, 90, spriteSize , 0, spriteSize)
              break
            case 113:
              this.drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, 90, spriteSize , spriteSize , spriteSize)
              break
            case 114:
              this.drawRotatedTile(ctx, tileMapImages.roadStraight, column, row, 90, 0, spriteSize , spriteSize)
              break
            case 121:
              this.drawTile(ctx, tileMapImages.roadStraight, column, row, 0, 0, spriteSize)
              break
            case 122:
              this.drawTile(ctx, tileMapImages.roadStraight, column, row, spriteSize, 0, spriteSize)
              break
            case 123:
              this.drawTile(ctx, tileMapImages.roadStraight, column, row, spriteSize, spriteSize, spriteSize)
              break
            case 124:
              this.drawTile(ctx, tileMapImages.roadStraight, column, row, 0, spriteSize, spriteSize)
              break
            // crosswalk
            case 131:
              this.drawTile(ctx, tileMapImages.roadCrosswalk, column, row, 0, 0, spriteSize)
              break
            case 132:
              this.drawTile(ctx, tileMapImages.roadCrosswalk, column, row, spriteSize, 0, spriteSize)
              break
            case 133:
              this.drawTile(ctx, tileMapImages.roadCrosswalk, column, row, spriteSize, spriteSize, spriteSize)
              break
            case 134:
              this.drawTile(ctx, tileMapImages.roadCrosswalk, column, row, 0, spriteSize, spriteSize)
              break
            case 141:
              this.drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, 90,0, 0, spriteSize)
              break
            case 142:
              this.drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, 90,spriteSize, 0, spriteSize)
              break
            case 143:
              this.drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, 90,spriteSize, spriteSize, spriteSize)
              break
            case 144:
              this.drawRotatedTile(ctx, tileMapImages.roadCrosswalk, column, row, 90,0, spriteSize, spriteSize)
              break
            // cross
            case 151:
              this.drawTile(ctx, tileMapImages.roadCross, column, row, 0, 0, spriteSize)
              break
            case 152:
              this.drawTile(ctx, tileMapImages.roadCross, column, row, spriteSize, 0, spriteSize)
              break
            case 153:
              this.drawTile(ctx, tileMapImages.roadCross, column, row, spriteSize, spriteSize, spriteSize)
              break
            case 154:
              this.drawTile(ctx, tileMapImages.roadCross, column, row, 0, spriteSize, spriteSize)
              break
            // road corner
            case 161:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 90,0, 0, spriteSize)
              break
            case 162:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 90,spriteSize, 0, spriteSize)
              break
            case 163:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 90,spriteSize, spriteSize, spriteSize)
              break
            case 164:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 90,0, spriteSize, spriteSize)
              break
            case 171:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 180,0, 0, spriteSize)
              break
            case 172:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 180,spriteSize, 0, spriteSize)
              break
            case 173:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 180,spriteSize, spriteSize, spriteSize)
              break
            case 174:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, 180,0, spriteSize, spriteSize)
              break
            case 181:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, -90,0, 0, spriteSize)
              break
            case 182:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, -90,spriteSize, 0, spriteSize)
              break
            case 183:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, -90,spriteSize, spriteSize, spriteSize)
              break
            case 184:
              this.drawRotatedTile(ctx, tileMapImages.roadCorner, column, row, -90,0, spriteSize, spriteSize)
              break
            case 191:
              this.drawTile(ctx, tileMapImages.roadCorner, column, row, 0, 0, spriteSize)
              break
            case 192:
              this.drawTile(ctx, tileMapImages.roadCorner, column, row, spriteSize, 0, spriteSize)
              break
            case 193:
              this.drawTile(ctx, tileMapImages.roadCorner, column, row, spriteSize, spriteSize, spriteSize)
              break
            case 194:
              this.drawTile(ctx, tileMapImages.roadCorner, column, row, 0, spriteSize, spriteSize)
              break
            // T-cross
            case 201:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 90,0, 0, spriteSize)
              break
            case 202:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 90,spriteSize, 0, spriteSize)
              break
            case 203:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 90,spriteSize, spriteSize, spriteSize)
              break
            case 204:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 90,0, spriteSize, spriteSize)
              break
            case 211:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 180,0, 0, spriteSize)
              break
            case 212:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 180,spriteSize , 0, spriteSize)
              break
            case 213:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 180,spriteSize , spriteSize , spriteSize)
              break
            case 214:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, 180,0, spriteSize , spriteSize)
              break
            case 221:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, -90,0, 0, spriteSize)
              break
            case 222:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, -90,spriteSize , 0, spriteSize)
              break
            case 223:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, -90,spriteSize , spriteSize , spriteSize)
              break
            case 224:
              this.drawRotatedTile(ctx, tileMapImages.roadTCross, column, row, -90,0, spriteSize , spriteSize)
              break
            case 231:
              this.drawTile(ctx, tileMapImages.roadTCross, column, row, 0, 0, spriteSize)
              break
            case 232:
              this.drawTile(ctx, tileMapImages.roadTCross, column, row, spriteSize , 0, spriteSize)
              break
            case 233:
              this.drawTile(ctx, tileMapImages.roadTCross, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 234:
              this.drawTile(ctx, tileMapImages.roadTCross, column, row, 0, spriteSize , spriteSize)
              break
            // plants
            case 31:
              this.drawTile(ctx, tileMapImages.tree, column, row)
              break
            case 32:
              this.drawTile(ctx, tileMapImages.flower, column, row)
              break
            // post office
            case 411:
              this.drawTile(ctx, tileMapImages.postOffice, column, row, 0, 0, spriteSize)
              break
            case 412:
              this.drawTile(ctx, tileMapImages.postOffice, column, row, spriteSize , 0, spriteSize)
              break
            case 413:
              this.drawTile(ctx, tileMapImages.postOffice, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 414:
              this.drawTile(ctx, tileMapImages.postOffice, column, row, 0, spriteSize , spriteSize)
              break
            // houses
            case 421:
              this.drawTile(ctx, tileMapImages.house1, column, row, 0, 0, spriteSize)
              break
            case 422:
              this.drawTile(ctx, tileMapImages.house1, column, row, spriteSize , 0, spriteSize)
              break
            case 423:
              this.drawTile(ctx, tileMapImages.house1, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 424:
              this.drawTile(ctx, tileMapImages.house1, column, row, 0, spriteSize , spriteSize)
              break
            case 431:
              this.drawTile(ctx, tileMapImages.house2, column, row, 0, 0, spriteSize)
              break
            case 432:
              this.drawTile(ctx, tileMapImages.house2, column, row, spriteSize , 0, spriteSize)
              break
            case 433:
              this.drawTile(ctx, tileMapImages.house2, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 434:
              this.drawTile(ctx, tileMapImages.house2, column, row, 0, spriteSize , spriteSize)
              break
            case 441:
              this.drawTile(ctx, tileMapImages.policeOffice, column, row, 0, 0, spriteSize)
              break
            case 442:
              this.drawTile(ctx, tileMapImages.policeOffice, column, row, spriteSize , 0, spriteSize)
              break
            case 443:
              this.drawTile(ctx, tileMapImages.policeOffice, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 444:
              this.drawTile(ctx, tileMapImages.policeOffice, column, row, 0, spriteSize , spriteSize)
              break
            case 451:
              this.drawTile(ctx, tileMapImages.hospital, column, row, 0, 0, spriteSize)
              break
            case 452:
              this.drawTile(ctx, tileMapImages.hospital, column, row, spriteSize , 0, spriteSize)
              break
            case 453:
              this.drawTile(ctx, tileMapImages.hospital, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 454:
              this.drawTile(ctx, tileMapImages.hospital, column, row, 0, spriteSize , spriteSize)
              break
            case 461:
              this.drawTile(ctx, tileMapImages.zoo, column, row, 0, 0, spriteSize)
              break
            case 462:
              this.drawTile(ctx, tileMapImages.zoo, column, row, spriteSize , 0, spriteSize)
              break
            case 463:
              this.drawTile(ctx, tileMapImages.zoo, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 464:
              this.drawTile(ctx, tileMapImages.zoo, column, row, 0, spriteSize , spriteSize)
              break
            case 471:
              this.drawTile(ctx, tileMapImages.warehouse, column, row, 0, 0, spriteSize)
              break
            case 472:
              this.drawTile(ctx, tileMapImages.warehouse, column, row, spriteSize , 0, spriteSize)
              break
            case 473:
              this.drawTile(ctx, tileMapImages.warehouse, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 474:
              this.drawTile(ctx, tileMapImages.warehouse, column, row, 0, spriteSize , spriteSize)
              break
            case 481:
              this.drawTile(ctx, tileMapImages.school, column, row, 0, 0, spriteSize)
              break
            case 482:
              this.drawTile(ctx, tileMapImages.school, column, row, spriteSize , 0, spriteSize)
              break
            case 483:
              this.drawTile(ctx, tileMapImages.school, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 484:
              this.drawTile(ctx, tileMapImages.school, column, row, 0, spriteSize , spriteSize)
              break
            case 511:
              this.drawTile(ctx, tileMapImages.market, column, row, 0, 0, spriteSize)
              break
            case 512:
              this.drawTile(ctx, tileMapImages.market, column, row, spriteSize , 0, spriteSize)
              break
            case 513:
              this.drawTile(ctx, tileMapImages.market, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 514:
              this.drawTile(ctx, tileMapImages.market, column, row, 0, spriteSize , spriteSize)
              break
            case 521:
              this.drawTile(ctx, tileMapImages.shop, column, row, 0, 0, spriteSize)
              break
            case 522:
              this.drawTile(ctx, tileMapImages.shop, column, row, spriteSize , 0, spriteSize)
              break
            case 523:
              this.drawTile(ctx, tileMapImages.shop, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 524:
              this.drawTile(ctx, tileMapImages.shop, column, row, 0, spriteSize , spriteSize)
              break
            case 531:
              this.drawTile(ctx, tileMapImages.cafe, column, row, 0, 0, spriteSize)
              break
            case 532:
              this.drawTile(ctx, tileMapImages.cafe, column, row, spriteSize , 0, spriteSize)
              break
            case 533:
              this.drawTile(ctx, tileMapImages.cafe, column, row, spriteSize , spriteSize , spriteSize)
              break
            case 534:
              this.drawTile(ctx, tileMapImages.cafe, column, row, 0, spriteSize , spriteSize)
              break
          }
          // ctx.strokeStyle = 'blue'
          // ctx.strokeRect(column * this.tileSize, row * this.tileSize)
        }
      }
    }
  }
}
