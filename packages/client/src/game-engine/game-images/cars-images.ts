const greenCar = './images/cars/car-green.png'
const yellowCar = './images/cars/car-yellow.png'
const redCar = './images/cars/car-red.png'

export const carImagesPaths = {
  greenCar,
  yellowCar,
  redCar,
}

export type CarKeys = keyof typeof carImagesPaths
export type CarImages = Record<CarKeys, HTMLImageElement>
