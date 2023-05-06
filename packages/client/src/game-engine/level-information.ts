import { dynamicImages, triggerImages } from './game-images'
import { Car, MovingDirection, Rover, TriggerInfo } from '../utils/types/game'
import { CargoTrigger, DeliveryTrigger } from './game-objects/Triggers'
import GameManager from './GameManager'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'

export interface LevelInformation {
  tileSize: number
  timer: number
  rover: Rover
  gameMap: number[][][]
  cars: Car[]
  triggers: TriggerInfo[]
}

// 1 | 2
// 4 | 3  order of image pieces in a sprite (changes for rotated images)
// 0 - pedestrian zone - background layer
// 1 - pedestrian zone - background layer
// 2 - ground - background layer
// 3, 4 - grass - background layer
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
// 481 - 484 - school - ui layer
// 511 - 514 - market - ui layer
// 521 - 524 - shop - ui layer
// 531 - 534 - cafe - ui layer
// 541 - 544 - fast-food - ui layer
export const levels: Record<number, LevelInformation> = {
  1: {
    tileSize: 48,
    timer: 60,
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
          speed: 3,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 2 * this.tileSize, y: 11 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 3,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 12 * this.tileSize, y: this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 3,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 17 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 3,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 14 * this.tileSize, y: 12 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 3,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 10 * this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 3,
        },
      ]
    },
    get triggers(): TriggerInfo[] {
      return [
        {
          triggerId: 0,
          description: 'Start 1 delivery',
          coords: { x: 12.5 * this.tileSize, y: 8 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: true,
          logic: () => BaseTrigger.enableTrigger(1),
        },
        {
          triggerId: 1,
          description: 'End 1 delivery',
          coords: { x: 5.5 * this.tileSize, y: 3 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(2),
        },
        {
          triggerId: 2,
          description: 'Start 2 delivery',
          coords: { x: 15.5 * this.tileSize, y: 5 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(3),
        },
        {
          triggerId: 3,
          description: 'End 2 delivery',
          coords: { x: 14.5 * this.tileSize, y: 11 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(4),
        },
        {
          triggerId: 4,
          description: 'Start 3 delivery',
          coords: { x: 1.5 * this.tileSize, y: 3 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(5),
        },
        {
          triggerId: 5,
          description: 'End 3 delivery',
          coords: { x: 13.5 * this.tileSize, y: 5 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => GameManager.completeLevel(),
        },
      ]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 4, 4, 4, 4, 4, 4, 0, 0, 164, 161, 114, 111, 114, 111, 114, 111, 173, 174, 2],
        [2, 2, 2, 2, 2, 2, 2, 0, 0, 163, 162, 113, 112, 113, 112, 113, 112, 172, 171, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 131, 132, 0, 3, 3, 3, 3, 3, 121, 122, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 134, 133, 0, 3, 2, 2, 2, 2, 124, 123, 2],
        [2, 164, 161, 144, 141, 114, 111, 114, 111, 182, 183, 0, 0, 0, 0, 0, 0, 213,214, 114],
        [2, 163, 162, 143, 142, 113, 112, 113, 112, 181, 184, 0, 4, 4, 0, 0, 0, 212,211, 113],
        [2, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 121, 122, 2],
        [2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 2],
        [2, 121, 122, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 3, 3, 3, 3, 121, 122, 2],
        [2, 124, 123, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 3, 2, 2, 3, 124, 123, 2],
        [2, 191, 192, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 2],
        [2, 194, 193, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
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
    timer: 60,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: 3 * this.tileSize, y: 8 * this.tileSize },
        speed: 4,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 2 * this.tileSize, y: 2 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 25 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 25 * this.tileSize, y: 7 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 10 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 5 * this.tileSize, y: 10 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 18 * this.tileSize, y: 10 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 23 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 10 * this.tileSize, y: 4 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
      ]
    },
    get triggers(): TriggerInfo[] {
      return [
        {
          triggerId: 0,
          description: 'Start 1 delivery',
          coords: { x: 13.5 * this.tileSize, y: 8 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: true,
          logic: () => BaseTrigger.enableTrigger(1),
        },
        {
          triggerId: 1,
          description: 'End 1 delivery',
          coords: { x: 5.5 * this.tileSize, y: 5 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(2),
        },
        {
          triggerId: 2,
          description: 'Start 2 delivery',
          coords: { x: 5.5 * this.tileSize, y: 8 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(3),
        },
        {
          triggerId: 3,
          description: 'End 2 delivery',
          coords: { x: 21.5 * this.tileSize, y: 9 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(4),
        },
        {
          triggerId: 4,
          description: 'Start 3 delivery',
          coords: { x: 3.5 * this.tileSize, y: 13 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(5),
        },
        {
          triggerId: 5,
          description: 'End 3 delivery',
          coords: { x: 23.5 * this.tileSize, y: 9 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => GameManager.completeLevel(),
        },
      ]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 164, 161, 114, 111, 114, 111, 114, 111, 222, 223, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 173, 174, 2],
        [2, 163, 162, 113, 112, 113, 112, 113, 112, 221, 224, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 172, 171, 2],
        [2, 121, 122, 4, 4, 4, 4, 4, 4, 121, 122, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 2, 2, 121, 122, 2],
        [2, 124, 123, 2, 2, 2, 2, 2, 2, 124, 123, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 124, 123, 2],
        [2, 121, 122, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 164, 161, 114, 111, 114, 111, 114, 111, 231, 232, 2],
        [2, 124, 123, 0, 3, 3, 3, 0, 0, 124, 123, 0, 0, 3, 3, 0, 0, 163, 162, 113, 112, 113, 112, 113, 112, 234, 233, 2],
        [2, 121, 122, 0, 3, 3, 3, 0, 0, 131, 132, 0, 0, 3, 3, 0, 0, 131, 132, 0, 3, 3, 3, 3, 3, 121, 122, 2],
        [2, 124, 123, 0, 0, 0, 0, 0, 0, 134, 133, 0, 0, 0, 0, 0, 0, 134, 133, 0, 3, 2, 2, 2, 2, 124, 123, 2],
        [2, 213, 214, 114, 111, 114, 111, 114, 111, 151, 152, 144, 141, 114, 111, 114, 111, 182, 183, 0, 0, 0, 0, 0, 0, 213,214, 114],
        [2, 212, 211, 113, 112, 113, 112, 113, 112, 154, 153, 143, 142, 113, 112, 113, 112, 181, 184, 4, 4, 0, 0, 4, 4, 212,211, 113],
        [2, 121, 122, 3, 3, 3, 3, 2, 1, 131, 132, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 2, 2, 121, 122, 2],
        [2, 124, 123, 3, 3, 2, 2, 2, 1, 134, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 2],
        [2, 121, 122, 1, 1, 1, 1, 1, 1, 121, 122, 4, 4, 4, 4, 0, 3, 3, 0, 0, 0, 3, 3, 3, 3, 121, 122, 2],
        [2, 124, 123, 2, 2, 2, 2, 2, 1, 124, 123, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 3, 2, 2, 3, 124, 123, 2],
        [2, 191, 192, 114, 111, 114, 111, 114, 111, 204, 201, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 2],
        [2, 194, 193, 113, 112, 113, 112, 113, 112, 203, 202, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
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
  3: {
    tileSize: 32,
    timer: 75,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: 3 * this.tileSize, y: 8 * this.tileSize },
        speed: 4,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 2 * this.tileSize, y: 2 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 25 * this.tileSize, y: 3 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 23 * this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 15 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 17 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 9 * this.tileSize, y: 3 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 10 * this.tileSize, y: 14 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 7 * this.tileSize, y: this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 2 * this.tileSize, y: 7 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
      ]
    },
    get triggers(): TriggerInfo[] {
      return [
        {
          triggerId: 0,
          description: 'Start 1 delivery',
          coords: { x: 25.5 * this.tileSize, y: 14 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: true,
          logic: () => BaseTrigger.enableTrigger(1),
        },
        {
          triggerId: 1,
          description: 'End 1 delivery',
          coords: { x: 13.5 * this.tileSize, y: 8 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(2),
        },
        {
          triggerId: 2,
          description: 'Start 2 delivery',
          coords: { x: 5.5 * this.tileSize, y: 13 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(3),
        },
        {
          triggerId: 3,
          description: 'End 2 delivery',
          coords: { x: 24 * this.tileSize, y: 1.5 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(4),
        },
        {
          triggerId: 4,
          description: 'Start 3 delivery',
          coords: { x: 25.5 * this.tileSize, y: 7 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(5),
        },
        {
          triggerId: 5,
          description: 'End 3 delivery',
          coords: { x: 19.5 * this.tileSize, y: 3 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => GameManager.completeLevel(),
        },
      ]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 164, 161, 114, 111, 114, 111, 114, 111, 173, 174, 3, 3, 3, 3, 0, 2, 4, 4, 4, 4, 0, 0, 0, 0, 3, 3, 2],
        [2, 163, 162, 113, 112, 113, 112, 113, 112, 172, 171, 3, 3, 3, 3, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 2, 2, 2],
        [2, 121, 122, 4, 4, 4, 4, 4, 4, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 164, 161, 114, 111, 114],
        [2, 124, 123, 2, 2, 2, 2, 2, 2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 163, 162, 113, 112, 113],
        [2, 121, 122, 1, 1, 1, 1, 1, 1, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 4, 4, 2],
        [2, 124, 123, 1, 3, 3, 3, 1, 1, 124, 123, 0, 0, 4, 4, 0, 0, 0, 0, 3, 3, 0, 0, 124, 123, 4, 4, 2],
        [2, 121, 122, 1, 3, 3, 3, 1, 1, 131, 132, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2, 0, 0, 131, 132, 0, 0, 2],
        [2, 124, 123, 1, 1, 1, 1, 1, 1, 134, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 134, 133, 0, 0, 2],
        [2, 191, 192, 114, 111, 114, 111, 144, 141, 231, 232, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 2],
        [2, 194, 193, 113, 112, 113, 112, 143, 142, 234, 233, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 124, 123, 0, 0, 2],
        [2, 2, 2, 3, 3, 3, 3, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 0, 0, 121, 122, 0, 0, 2],
        [2, 2, 2, 3, 3, 2, 2, 0, 0, 134, 133, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 4, 4, 4, 4, 0, 3, 3, 0, 0, 0, 0, 0, 121, 122, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 2, 2, 2, 2, 0, 2, 2, 2, 2, 2, 0, 0, 124, 123, 0, 0, 2],
        [2, 0, 3, 3, 3, 3, 0, 0, 0, 191, 192, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 3, 3, 2],
        [2, 0, 2, 2, 2, 2, 0, 0, 0, 194, 193, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 3, 3, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      // ui layer (buildings, plants)
      // prettier-ignore
      [
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 451, 452, 31, -1, 32, 421, 422, 421, 422, -1, -1, -1, -1, 431, 432, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 454, 453, 31, -1, 32, 424, 423, 424, 423, -1, -1, -1, -1, 434, 433, 31],
        [31, -1, -1, 421, 422, 421, 422, 421, 422, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, 424, 423, 424, 423, 424, 423, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 411, 412, 31],
        [31, -1, -1, -1, 31, 541, 542, -1, -1, -1, -1, -1, -1, 481, 482, -1, -1, -1, -1, 531, 532, -1, -1, -1, -1, 414, 413, 31],
        [31, -1, -1, -1, 31, 544, 543, -1, -1, -1, -1, -1, -1, 484, 483, -1, -1, -1, -1, 534, 533, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 441, 442, -1, -1, -1, -1, -1, -1, 31],
        [31, 32, 32, 511, 512, 521, 522, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 444, 443, -1, -1, -1, -1, -1, -1, 31],
        [31, 32, 32, 514, 513, 524, 523, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 431, 432, 431, 432, -1, 461, 462, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 434, 433, 434, 433, -1, 464, 463, 32, 32, 32, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, 421, 422, 421, 422, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 471, 472, 31],
        [31, -1, 424, 423, 424, 423, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 474, 473, 31],
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      ],
    ],
  },
  4: {
    tileSize: 24,
    timer: 90,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: 6 * this.tileSize, y: 15 * this.tileSize },
        speed: 4,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 6 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 14 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 32 * this.tileSize, y: 6 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 4 * this.tileSize, y: 12 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 15 * this.tileSize, y: 4 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 12 * this.tileSize, y: 17 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 32 * this.tileSize, y: 9 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 5 * this.tileSize, y: 15 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 5 * this.tileSize, y: 8 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 32 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 23 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 23 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
      ]
    },
    get triggers(): TriggerInfo[] {
      return [
        {
          triggerId: 0,
          description: 'Start 1 delivery',
          coords: { x: 15.5 * this.tileSize, y: 3 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: true,
          logic: () => BaseTrigger.enableTrigger(1),
        },
        {
          triggerId: 1,
          description: 'End 1 delivery',
          coords: { x: 17.5 * this.tileSize, y: 23 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(2),
        },
        {
          triggerId: 2,
          description: 'Start 2 delivery',
          coords: { x: 36.5 * this.tileSize, y: 15 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(3),
        },
        {
          triggerId: 3,
          description: 'End 2 delivery',
          coords: { x: 8.5 * this.tileSize, y: 23 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(4),
        },
        {
          triggerId: 4,
          description: 'Start 3 delivery',
          coords: { x: 15.5 * this.tileSize, y: 12 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(5),
        },
        {
          triggerId: 5,
          description: 'End 3 delivery',
          coords: { x: 34 * this.tileSize, y: 20.5 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => GameManager.completeLevel(),
        },
      ]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2],
        [2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 4, 4, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 164, 161, 114, 111, 114, 111, 144, 141, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 144, 141, 114, 111, 173, 174, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 163, 162, 113, 112, 113, 112, 143, 142, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 143, 142, 113, 112, 172, 171, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 4, 4, 2],
        [2, 0, 0, 0, 124, 123, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 124, 123, 0, 0, 0, 0, 0, 2, 2, 2],
        [2, 0, 0, 0, 121, 122, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 213, 214, 114, 111, 144, 141, 114, 111, 114, 111, 114, 111],
        [2, 0, 0, 0, 124, 123, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 212, 211, 113, 112, 143, 142, 113, 112, 113, 112, 113, 112],
        [2, 0, 0, 0, 121, 122, 0, 1, 1, 1, 1, 0, 1, 0, 1, 3, 3, 1, 0, 1, 2, 2, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 1, 1, 0, 0, 0, 1, 0, 1, 2, 2, 1, 0, 1, 2, 2, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 131, 132, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 134, 133, 0, 0, 3, 3, 0, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 3, 3, 0, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 191, 192, 114, 111, 144, 141, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 194, 193, 113, 112, 143, 142, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 0, 0, 0, 4, 4, 3, 3, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 2],
        [2, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 3, 3, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 2, 2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, 4, 0, 1, 0, 0, 0, 0, 0, 3, 3, 3, 3, 2],
        [2, 0, 0, 1, 1, 1, 0, 0, 4, 4, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 1, 0, 0, 0, 0, 0, 1, 0, 4, 4, 0, 1, 1, 1, 1, 1, 0, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      // ui layer (buildings, plants)
      // prettier-ignore
      [
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
        [31, 32, 451, 452, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 541, 542, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 421, 422, 421, 422, 421, 422, 421, 422, 421, 422, 31],
        [31, 32, 453, 453, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 544, 543, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 424, 423, 424, 423, 424, 423, 424, 423, 424, 423, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 441, 442, 31],
        [31, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, -1, 32, 32, 32, -1, 32, -1, -1, -1, 32, -1, 32, 32, 32, -1, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 444, 443, 31],
        [31, -1, -1, -1, -1, -1, -1, 32, -1, -1, 32, -1, 32, -1, 32, -1, 32, -1, -1, -1, 32, -1, 32, -1, -1, -1, 32, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, 32, -1, -1, 32, -1, 32, -1, 32, -1, 32, -1, -1, -1, 32, -1, 32, -1, -1, -1, 32, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, -1, 32, -1, 32, 511, 512, 32, -1, 32, 521, 522, 32, 32, 32, -1, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, 32, 32, -1, -1, -1, 32, -1, 32, 514, 513, 32, -1, 32, 524, 523, 32, -1, -1, -1, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, 32, -1, 32, -1, -1, 32, -1, 32, -1, -1, 32, -1, 32, -1, -1, 32, -1, -1, -1, 32, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, 32, -1, -1, 32, -1, 32, 32, 32, -1, -1, -1, 32, -1, -1, -1, 32, 32, 32, -1, 32, -1, -1, 32, -1, -1, -1, -1, -1, -1, 531, 532, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 534, 533, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 481, 482, 31, 31, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 484, 483, 31, 31, 31],
        [31, -1, -1, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, 31],
        [31, -1, 32, -1, -1, -1, 32, -1, -1, -1, -1,  -1, 32, -1, 32, -1, -1, -1, -1, -1, 32, 32, -1, -1, -1, 32, 32, -1, -1, -1, -1, 32, 461, 462, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, 32, 411, 412, -1, -1, -1, -1, -1, -1, -1  -1, 32, -1, 32, -1, -1, -1, -1, -1, 32, -1, 32, -1, 32, -1, 32, -1, -1, -1, -1, 32, 464, 463, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, 32, 414, 413, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, 32, -1, -1, -1, -1, 32, -1, -1, 32, -1, -1, 32, -1, -1, -1, -1, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, 32, -1, 32, 32, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, 32, -1, -1, -1, 32, -1, 431, 432, -1, 32, -1, -1, -1, 32, -1, 431, 432, -1, 32, -1, -1, -1, -1, -1, 32, -1, 431, 432, -1, 32, -1, -1, -1, -1, -1, 421, 422, 421, 422, 31],
        [31, -1, -1, 32, 32, 32, -1, -1, 434, 433, -1, 32, -1, -1, -1, 32, -1, 434, 433, -1, 32, -1, -1, -1, -1, -1, 32, -1, 434, 433, -1, 32, 32, 32, 32, 32, -1, 424, 423, 424, 423, 31],
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      ],
    ],
  },
  5: {
    tileSize: 24,
    timer: 120,
    get rover() {
      return {
        movingDirection: MovingDirection.RIGHT,
        coords: { x: 6 * this.tileSize, y: 15 * this.tileSize },
        speed: 4,
      }
    },
    get cars() {
      return [
        {
          img: dynamicImages.greenCar,
          coords: { x: 12 * this.tileSize, y: 17 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 16 * this.tileSize, y: 4 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 4 * this.tileSize, y: 9 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.greenCar,
          coords: { x: 23 * this.tileSize, y: 12 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 23 * this.tileSize, y: 8 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 18 * this.tileSize, y: 17 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 32 * this.tileSize, y: 23 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.yellowCar,
          coords: { x: 23 * this.tileSize, y: 23 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 5 * this.tileSize, y: 8 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 32 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 25 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.redCar,
          coords: { x: 23 * this.tileSize, y: 5 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 33 * this.tileSize, y: 23 * this.tileSize },
          movingDirection: MovingDirection.UP,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 22 * this.tileSize, y: 13 * this.tileSize },
          movingDirection: MovingDirection.DOWN,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 14 * this.tileSize, y: 16 * this.tileSize },
          movingDirection: MovingDirection.LEFT,
          speed: 2,
        },
        {
          img: dynamicImages.blueCar,
          coords: { x: 26 * this.tileSize, y: 25 * this.tileSize },
          movingDirection: MovingDirection.RIGHT,
          speed: 2,
        },
      ]
    },
    get triggers(): TriggerInfo[] {
      return [
        {
          triggerId: 0,
          description: 'Start 1 delivery',
          coords: { x: 7.5 * this.tileSize, y: 8 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: true,
          logic: () => BaseTrigger.enableTrigger(1),
        },
        {
          triggerId: 1,
          description: 'End 1 delivery',
          coords: { x: 38.5 * this.tileSize, y: 23 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(2),
        },
        {
          triggerId: 2,
          description: 'Start 2 delivery',
          coords: { x: 18.5 * this.tileSize, y: 10 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(3),
        },
        {
          triggerId: 3,
          description: 'End 2 delivery',
          coords: { x: 11.5 * this.tileSize, y: 23 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(4),
        },
        {
          triggerId: 4,
          description: 'Start 3 delivery',
          coords: { x: 26.5 * this.tileSize, y: 14 * this.tileSize },
          class: CargoTrigger,
          img: triggerImages.cargoLoad,
          enabled: false,
          logic: () => BaseTrigger.enableTrigger(5),
        },
        {
          triggerId: 5,
          description: 'End 3 delivery',
          coords: { x: 27.5 * this.tileSize, y: 22 * this.tileSize },
          class: DeliveryTrigger,
          img: triggerImages.cargoUnload,
          enabled: false,
          logic: () => GameManager.completeLevel(),
        },
      ]
    },
    gameMap: [
      // background layer (crosswalk and road)
      // prettier-ignore
      [
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 2],
        [2, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2, 2, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 164, 161, 114, 111, 114, 111, 144, 141, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 144, 141, 114, 111, 173, 174, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 163, 162, 113, 112, 113, 112, 143, 142, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 143, 142, 113, 112, 172, 171, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 0, 0, 0, 124, 123, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 3, 3, 2],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 3, 3, 0, 0, 164, 161, 114, 111, 114, 111, 114, 111, 114, 111, 151, 152, 114, 111, 144, 141, 114, 111, 114, 111],
        [2, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 3, 0, 0, 163, 162, 113, 112, 113, 112, 113, 112, 113, 112, 154, 153, 113, 112, 143, 142, 113, 112, 113, 112],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 2, 2, 2, 2, 2, 2, 2, 2, 121, 122, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 124, 123, 2, 1, 1, 1, 1, 1, 1, 1, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 121, 122, 2, 1, 3, 3, 3, 3, 1, 1, 131, 132, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 0, 0, 3, 3, 0, 0, 0, 0, 0, 1, 0, 3, 3, 0, 0, 124, 123, 2, 1, 3, 3, 2, 2, 1, 1, 134, 133, 0, 0, 3, 3, 3, 0, 0, 2],
        [2, 0, 0, 0, 121, 122, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 121, 122, 2, 1, 1, 1, 1, 1, 1, 1, 121, 122, 0, 0, 3, 3, 3, 0, 0, 2],
        [2, 0, 0, 0, 124, 123, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 2, 2, 2, 2, 2, 2, 2, 2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 191, 192, 114, 111, 144, 141, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 114, 111, 151, 152, 114, 111, 114, 111, 114, 111, 114, 111, 231, 232, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 194, 193, 113, 112, 143, 142, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 113, 112, 154, 153, 113, 112, 113, 112, 113, 112, 113, 112, 234, 233, 0, 0, 0, 4, 4, 3, 3, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 2, 2, 2, 2, 2, 2, 2, 2, 121, 122, 0, 0, 0, 4, 4, 3, 3, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 1, 1, 1, 1, 1, 1, 1, 2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 3, 3, 3, 0, 0, 0, 2, 2, 2, 0, 0, 0, 3, 3, 3, 0, 0, 0, 131, 132, 1, 1, 1, 3, 3, 1, 1, 2, 121, 122, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 3, 3, 3, 0, 0, 0, 2, 2, 2, 0, 0, 0, 3, 3, 3, 0, 0, 0, 134, 133, 1, 1, 1, 2, 2, 1, 1, 2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 121, 122, 1, 1, 1, 1, 1, 1, 1, 2, 121, 122, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 124, 123, 2, 2, 2, 2, 2, 2, 2, 2, 124, 123, 0, 0, 0, 0, 0, 0, 0, 2],
        [2, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0, 0, 191, 192, 114, 111, 114, 111, 114, 111, 114, 111, 182, 183, 0, 0, 0, 3, 3, 3, 3, 2],
        [2, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 3, 3, 194, 193, 113, 112, 113, 112, 113, 112, 113, 112, 181, 184, 0, 0, 0, 2, 2, 2, 2, 2],
        [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      ],
      // ui layer (buildings, plants)
      // prettier-ignore
      [
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
        [31, 32, 451, 452, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 441, 442, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 421, 422, 421, 422, 421, 422, 421, 422, 421, 422, 31],
        [31, 32, 453, 453, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31, 444, 443, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 424, 423, 424, 423, 424, 423, 424, 423, 424, 423, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, 411, 412, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 521, 522, 31],
        [31, -1, -1, -1, -1, -1, -1, 414, 413, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 524, 523, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, -1, 541, 542, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, 544, 543, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, 531, 532, -1, -1, -1, -1, -1, 32, -1, 471, 472, -1, -1, -1, -1, 32, -1, 521, 522, 511, 512, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, 534, 533, -1, -1, -1, -1, -1, 32, -1, 474, 473, -1, -1, -1, -1, 32, -1, 524, 523, 514, 513, -1, -1, -1, -1, -1, -1, 531, 532, 32, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 534, 533, 32, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 481, 482, 31, 31, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, 484, 483, 31, 31, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, 31, 31, 31, -1, -1, -1, 32, 32, 32, -1, -1, -1, 31, 31, 31, -1, -1, -1, -1, -1, -1, -1, -1, 461, 462, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, 31, 31, 31, -1, -1, -1, 32, 32, 32, -1, -1, -1, 31, 31, 31, -1, -1, -1, -1, -1, -1, -1, -1, 464, 463, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 32, 32, 32, 32, 32, 32, 32, 32, -1, -1, -1, -1, -1, -1, -1, -1, -1, 31],
        [31, -1, -1, -1, -1, 431, 432, 32, 431, 432, 32, 431, 432, 32, 431, 432, 32, 431, 432, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 421, 422, 421, 422, 31],
        [31, 31, 31, 31, 31, 434, 433, 32, 434, 433, 32, 434, 433, 32, 434, 433, 32, 434, 433, 31, 31, 31, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 424, 423, 424, 423, 31],
        [31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],
      ],
    ],
  },
}

export const maxLevel = Object.keys(levels).length
