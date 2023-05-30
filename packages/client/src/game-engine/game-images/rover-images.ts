const roverUp = './images/rover/rover-up.png'
const roverRight = './images/rover/rover-right.png'
const roverDown = './images/rover/rover-down.png'
const roverLeft = './images/rover/rover-left.png'
const roverOpenRight = './images/rover/rover-open-right.png'
const roverOpenLeft = './images/rover/rover-open-left.png'

export const roverImagesPaths = {
  roverUp,
  roverDown,
  roverRight,
  roverLeft,
  roverOpenLeft,
  roverOpenRight,
}

export type RoverKeys = keyof typeof roverImagesPaths
export type RoverImages = Record<RoverKeys, HTMLImageElement>
