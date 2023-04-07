import { dynamicImages, triggerImages } from './game-images'
import { Car, MovingDirection, Rover, TriggerInfo } from '../utils/types/game'
import { CargoTrigger, DeliveryTrigger } from './game-objects/Triggers'
import GameManager from './GameManager'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'

export interface LevelInformation {
  tileSize: number
  rover: Rover
  gameMap: Array<Array<Array<number>>>
  cars: Array<Car>
  triggers: Array<TriggerInfo>
}

// 1 | 2
// 4 | 3  order of image pieces in a sprite (changes for rotated images)
// 0 - pedestrian zone - background layer
// 1 - pedestrian zone - background layer
// 111-114 - road straight (horizontal 90 deg) - background layer - last number represents sprite
// 121-124 - road straight (vertical) - background layer - last number represents sprite
// 131-134 - road crosswalk (vertical) - background layer - last number represents sprite
// 141-144 - road crosswalk (horizontal 90 deg) - background layer - last number represents sprite
// 151-154 - road cross - background layer - last number represents sprite
// 161-164 - road corner (left top 90 deg) - background layer - last number represents sprite
// 171-174 - road corner (right top 180 deg) - background layer - last number represents sprite
// 181-184 - road corner (right bottom -90 deg) - background layer - last number represents sprite
// 191-194 - road corner (left bottom) - background layer - last number represents sprite
// 201-204 - road t-cross (top 90 deg) - background layer - last number represents sprite
// 211-214 - road t-cross (right 180 deg) - background layer - last number represents sprite
// 221-224 - road t-cross (bottom -90 deg) - background layer - last number represents sprite
// 231-234 - road t-cross (left) - background layer - last number represents sprite
// 31 - tree - ui layer
// 32 - flower - ui layer
// 411 - 414 - post office - ui layer
// 421 - 424 - house 1 - ui layer
// 431 - 434 - house 2 - ui layer
// 441 - 444 - police office - ui layer
// 451 - 454 - hospital - ui layer
// 461 - 464 - zoo - ui layer
// 471 - 474 - warehouse - ui layer
// 511 - 514 - market - ui layer
// 521 - 524 - shop - ui layer
// 531 - 534 - cafe - ui layer
export const levels: Record<number, LevelInformation> = {
  1: {
    tileSize: 48,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: this.tileSize, y: 4 * this.tileSize },
        speed: 6,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 19 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 2 * this.tileSize, y: 11 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 12 * this.tileSize, y: this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 17 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 14 * this.tileSize, y: 12 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 10 * this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.UP,
        },
      ]
    },
    get triggers() {
      const start: TriggerInfo = {
        triggerId: 0,
        coords: { x: 12.5 * this.tileSize, y: 8 * this.tileSize },
        class: CargoTrigger,
        img: triggerImages.cargoLoad,
        enabled: true,
        logic: () => BaseTrigger.enableTrigger(1),
      }
      const end: TriggerInfo = {
        triggerId: 1,
        coords: { x: 5.5 * this.tileSize, y: 3 * this.tileSize },
        class: DeliveryTrigger,
        img: triggerImages.cargoUnload,
        enabled: false,
        logic: () => GameManager.setLevel(2),
      }

      return [start, end]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 161, 114, 111, 114, 111, 114, 111, 173, 174, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 162, 113, 112, 113, 112, 113, 112, 172, 171, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 134, 133, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 164, 161, 144, 141, 114, 111, 114, 111, 182, 183, 0, 0, 0, 0, 0, 0, 213,214, 114],
        [0, 163, 162, 143, 142, 113, 112, 113, 112, 181, 184, 0, 0, 0, 0, 0, 0, 212,211, 113],
        [0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 191, 192, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 0],
        [0, 194, 193, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      // ui layer (buildings, plants)
      // prettier-ignore
      [
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
        [31, 421, 422, 421, 422, 421, 422, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, 424, 423, 424, 423, 424, 423, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 421, 422, 421, 422, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 424, 423, 424, 423, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 411, 412, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 414, 413, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, 431, 432, 431, 432, 431, 432, -1, -1, -1, -1, 31, 441, 442, 31, -1, -1, 31],
        [31, -1, -1, 434, 433, 434, 433, 434, 433, -1, -1, -1, -1, 31, 444, 443, 31, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      ],
    ],
  },
  2: {
    tileSize: 32,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: 3 * this.tileSize, y: 8 * this.tileSize },
        speed: 8,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 2 * this.tileSize, y: 2 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 25 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 25 * this.tileSize, y: 7 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 10 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 5 * this.tileSize, y: 10 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 18 * this.tileSize, y: 10 * this.tileSize },
          movingDirection: MovingDirection.UP,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 23 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 10 * this.tileSize, y: 4 * this.tileSize },
          movingDirection: MovingDirection.UP,
        },
      ]
    },
    get triggers() {
      const start0: TriggerInfo = {
        triggerId: 0,
        coords: { x: 5.5 * this.tileSize, y: 8 * this.tileSize },
        class: CargoTrigger,
        img: triggerImages.cargoLoad,
        enabled: true,
        logic: () => {
          BaseTrigger.enableTrigger(1)
        },
      }
      const end0: TriggerInfo = {
        triggerId: 1,
        coords: { x: 19.5 * this.tileSize, y: 12 * this.tileSize },
        class: DeliveryTrigger,
        img: triggerImages.cargoUnload,
        enabled: false,
        logic: () => GameManager.endGame(),
      }

      return [start0, end0]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 164, 161, 114, 111, 114, 111, 114, 111, 222, 223, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 173, 174, 0],
        [0, 163, 162, 113, 112, 113, 112, 113, 112, 221, 224, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 172, 171, 0],
        [0, 121, 122, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 0, 0, 0, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 121, 122, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 164, 161, 114, 111, 114, 111, 114, 111, 231, 232, 0],
        [0, 124, 123, 0, 0, 0, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 163, 162, 113, 112, 113, 112, 113, 112, 234, 233, 0],
        [0, 121, 122, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 0, 0, 0, 0, 0, 0, 134, 133, 0, 0, 0, 0, 0, 0, 134, 133, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 213, 214, 114, 111, 114, 111, 114, 111, 151, 152, 144, 141, 114, 111, 114, 111, 182, 183, 0, 0, 0, 0, 0, 0, 213,214, 114],
        [0, 212, 211, 113, 112, 113, 112, 113, 112, 154, 153, 143, 142, 113, 112, 113, 112, 181, 184, 0, 0, 0, 0, 0, 0, 212,211, 113],
        [0, 121, 122, 1, 1, 1, 1, 1, 1, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 1, 1, 1, 1, 1, 1, 134, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 121, 122, 1, 1, 1, 1, 1, 1, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0],
        [0, 124, 123, 1, 1, 1, 1, 1, 1, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0],
        [0, 191, 192, 114, 111, 114, 111, 114, 111, 204, 201, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 0],
        [0, 194, 193, 113, 112, 113, 112, 113, 112, 203, 202, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 0],
        [0, 0, 0, 0,0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      // ui layer (buildings, plants)
      // prettier-ignore
      [
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, 421, 422, 421, 422, 421, 422, -1, -1, 31, 451, 452, 31, -1, -1, -1, -1, -1, -1, 521, 522, 32, 32, -1, -1, 31],
        [31, -1, -1, 424, 423, 424, 423, 424, 423, -1, -1, 31, 454, 453, 31, -1, -1, -1, -1, -1, -1, 524, 523, 32, 32, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, 31, 531, 532, -1, -1, -1, -1, -1, -1, 471, 472, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, 31, 534, 533, -1, -1, -1, -1, -1, -1, 474, 473, -1, -1, -1, -1, -1, 31, 421, 422, 421, 422, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 424, 423, 424, 423, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 411, 412, -1, -1, 481, 482, -1, -1, -1],
        [31, -1, -1, 511, 512, 521, 522, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 414, 413, -1, -1, 484, 483, -1, -1, 31],
        [31, -1, -1, 514, 513, 524, 523, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 431, 432, 431, 432, -1, 461, 462, -1, -1, -1, 31, 441, 442, 31, -1, -1, 31],
        [31, -1, -1, 32, 32, 32, 32, 32, -1, -1, -1, 434, 433, 434, 433, -1, 464, 463, 32, 32, 32, 31, 444, 443, 31, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      ],
    ],
  },
}
