import { MovingDirection } from '../utils/types/game'

// sidewalk
const sideWalk = new Image()
sideWalk.src = './images/sidewalk/sidewalk.jpg'
const sideWalk2 = new Image()
sideWalk2.src = './images/sidewalk/sidewalk-2.png'

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

// dynamic vehicles
const greenCar = new Image()
greenCar.src = './images/cars/car-green.png'
const yellowCar = new Image()
yellowCar.src = './images/cars/car-yellow.png'
const redCar = new Image()
redCar.src = './images/cars/car-red.png'

// rover moving up, down, left and right
const roverUp = new Image()
roverUp.src = './images/rover/rover-up.png'
const roverRight = new Image()
roverRight.src = './images/rover/rover-right.png'
const roverDown = new Image()
roverDown.src = './images/rover/rover-down.png'
const roverLeft = new Image()
roverLeft.src = './images/rover/rover-left.png'

export const tileMapImages = {
  sideWalk,
  sideWalk2,
  roadCorner,
  roadCross,
  roadTCross,
  roadCrosswalk,
  roadStraight,
  tree,
  flower,
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

export const roverImages = {
  roverUp,
  roverDown,
  roverRight,
  roverLeft,
}

export const dynamicImages = {
  greenCar,
  yellowCar,
  redCar,
}

export const getRoverImgToDisplay = (movingDirection: MovingDirection) => {
  switch (movingDirection) {
    case MovingDirection.UP:
      return roverImages.roverUp
    case MovingDirection.DOWN:
      return roverImages.roverDown
    case MovingDirection.RIGHT:
      return roverImages.roverRight
    case MovingDirection.LEFT:
      return roverImages.roverLeft
  }
}
