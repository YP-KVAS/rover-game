import {
  CargoImages,
  CarsImages,
  RoverImages,
  TileMapImages,
} from '../utils/types/game-images'

export class GameImages {
  private static __instance: GameImages

  private readonly _tileMapImages: TileMapImages
  private readonly _roverImages: RoverImages
  private readonly _carsImages: CarsImages
  private readonly _triggerImages: CargoImages

  private constructor() {
    this._tileMapImages = this._initTileMapImages()
    this._roverImages = this._initRoverImages()
    this._carsImages = this._initCarsImages()
    this._triggerImages = this._initTriggerImages()
  }

  private _initTileMapImages() {
    // background
    const sideWalk = new Image()
    sideWalk.src = './images/background/sidewalk.jpg'
    const sideWalk2 = new Image()
    sideWalk2.src = './images/background/sidewalk-2.png'
    const ground = new Image()
    ground.src = './images/background/ground.png'
    const grass = new Image()
    grass.src = './images/background/grass.png'
    const grass2 = new Image()
    grass2.src = './images/background/grass-2.png'

    // road elements
    const roadCorner = new Image()
    roadCorner.src = './images/road/road-corner.png'
    const roadCross = new Image()
    roadCross.src = './images/road/road-cross.png'
    const roadCrosswalk = new Image()
    roadCrosswalk.src = './images/road/road-crosswalk.png'
    const roadStraight = new Image()
    roadStraight.src = './images/road/road-straight.png'
    const roadTCross = new Image()
    roadTCross.src = './images/road/road-t-cross.png'

    // buildings and plants
    const tree = new Image()
    tree.src = './images/plants/tree.png'
    const flower = new Image()
    flower.src = './images/plants/flower.png'
    const postOffice = new Image()
    postOffice.src = './images/buildings/post-office.png'
    const policeOffice = new Image()
    policeOffice.src = './images/buildings/police-office.png'
    const house1 = new Image()
    house1.src = './images/buildings/house-1.png'
    const house2 = new Image()
    house2.src = './images/buildings/house-2.png'
    const market = new Image()
    market.src = './images/buildings/market.png'
    const shop = new Image()
    shop.src = './images/buildings/shop.png'
    const hospital = new Image()
    hospital.src = './images/buildings/hospital.png'
    const cafe = new Image()
    cafe.src = './images/buildings/cafe.png'
    const zoo = new Image()
    zoo.src = './images/buildings/zoo.png'
    const warehouse = new Image()
    warehouse.src = './images/buildings/warehouse.png'
    const school = new Image()
    school.src = './images/buildings/school.png'

    return {
      sideWalk,
      sideWalk2,
      ground,
      roadCorner,
      roadCross,
      roadTCross,
      roadCrosswalk,
      roadStraight,
      tree,
      flower,
      grass,
      grass2,
      postOffice,
      policeOffice,
      house1,
      house2,
      market,
      shop,
      hospital,
      cafe,
      zoo,
      warehouse,
      school,
    }
  }

  private _initRoverImages() {
    const roverUp = new Image()
    roverUp.src = './images/rover/rover-up.png'
    const roverRight = new Image()
    roverRight.src = './images/rover/rover-right.png'
    const roverDown = new Image()
    roverDown.src = './images/rover/rover-down.png'
    const roverLeft = new Image()
    roverLeft.src = './images/rover/rover-left.png'
    const roverOpenRight = new Image()
    roverOpenRight.src = './images/rover/rover-open-right.png'
    const roverOpenLeft = new Image()
    roverOpenLeft.src = './images/rover/rover-open-left.png'

    return {
      roverUp,
      roverDown,
      roverRight,
      roverLeft,
      roverOpenLeft,
      roverOpenRight,
    }
  }

  private _initCarsImages() {
    const greenCar = new Image()
    greenCar.src = './images/cars/car-green.png'
    const yellowCar = new Image()
    yellowCar.src = './images/cars/car-yellow.png'
    const redCar = new Image()
    redCar.src = './images/cars/car-red.png'

    return {
      greenCar,
      yellowCar,
      redCar,
    }
  }

  private _initTriggerImages() {
    const cargoLoad = new Image()
    cargoLoad.src = './images/triggers/cargo-load.png'
    const cargoUnload = new Image()
    cargoUnload.src = './images/triggers/cargo-unload.png'

    return {
      cargoLoad,
      cargoUnload,
    }
  }

  public static getInstance() {
    return this.__instance || (this.__instance = new this())
  }

  public get tileMapImages() {
    return this._tileMapImages
  }

  public get roverImages() {
    return this._roverImages
  }

  public get carsImages() {
    return this._carsImages
  }

  public get triggerImages() {
    return this._triggerImages
  }
}
