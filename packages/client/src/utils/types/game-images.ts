export interface TileMapImages extends Record<string, HTMLImageElement> {
  sideWalk: HTMLImageElement
  sideWalk2: HTMLImageElement
  ground: HTMLImageElement
  roadCorner: HTMLImageElement
  roadCross: HTMLImageElement
  roadTCross: HTMLImageElement
  roadCrosswalk: HTMLImageElement
  roadStraight: HTMLImageElement
  tree: HTMLImageElement
  flower: HTMLImageElement
  grass: HTMLImageElement
  grass2: HTMLImageElement
  postOffice: HTMLImageElement
  policeOffice: HTMLImageElement
  house1: HTMLImageElement
  house2: HTMLImageElement
  market: HTMLImageElement
  shop: HTMLImageElement
  hospital: HTMLImageElement
  cafe: HTMLImageElement
  zoo: HTMLImageElement
  warehouse: HTMLImageElement
  school: HTMLImageElement
}

export interface RoverImages extends Record<string, HTMLImageElement> {
  roverUp: HTMLImageElement
  roverDown: HTMLImageElement
  roverRight: HTMLImageElement
  roverLeft: HTMLImageElement
  roverOpenLeft: HTMLImageElement
  roverOpenRight: HTMLImageElement
}

export interface CarsImages extends Record<string, HTMLImageElement> {
  greenCar: HTMLImageElement
  yellowCar: HTMLImageElement
  redCar: HTMLImageElement
}

export interface CargoImages extends Record<string, HTMLImageElement> {
  cargoLoad: HTMLImageElement
  cargoUnload: HTMLImageElement
}
