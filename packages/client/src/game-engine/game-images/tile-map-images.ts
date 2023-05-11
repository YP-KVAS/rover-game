// background
const sideWalk = './images/background/sidewalk.jpg'
const sideWalk2 = './images/background/sidewalk-2.png'
const ground = './images/background/ground.png'
const grass = './images/background/grass.png'
const grass2 = './images/background/grass-2.png'

// road elements
const roadCorner = './images/road/road-corner.png'
const roadCross = './images/road/road-cross.png'
const roadCrosswalk = './images/road/road-crosswalk.png'
const roadStraight = './images/road/road-straight.png'
const roadTCross = './images/road/road-t-cross.png'

// buildings and plants
const tree = './images/plants/tree.png'
const flower = './images/plants/flower.png'
const postOffice = './images/buildings/post-office.png'
const policeOffice = './images/buildings/police-office.png'
const house1 = './images/buildings/house-1.png'
const house2 = './images/buildings/house-2.png'
const market = './images/buildings/market.png'
const shop = './images/buildings/shop.png'
const hospital = './images/buildings/hospital.png'
const cafe = './images/buildings/cafe.png'
const zoo = './images/buildings/zoo.png'
const warehouse = './images/buildings/warehouse.png'
const school = './images/buildings/school.png'

export const tileMapImagesPaths = {
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

export type TileMapKeys = keyof typeof tileMapImagesPaths
export type TileMapImages = Record<TileMapKeys, HTMLImageElement>
