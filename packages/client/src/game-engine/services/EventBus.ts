import { Observable } from './Observable'
import { Rover } from '../game-objects/Rover'
import gameManager from '../GameManager'

export enum RoverEvents {
  TRIGGER_COLLIDE = 'trigger-collide',
  CAR_COLLIDE = 'car-collide',
  GAME_OVER = 'game-over',
}

class EventBus extends Observable {
  constructor() {
    super({
      [RoverEvents.TRIGGER_COLLIDE]: [],
      [RoverEvents.CAR_COLLIDE]: [],
      [RoverEvents.GAME_OVER]: [],
    })
  }

  addListeners(rover: Rover) {
    this.on(RoverEvents.TRIGGER_COLLIDE, (args?: unknown) =>
      rover.openRover((args as Record<string, number>).freezeMs)
    )
    this.on(RoverEvents.TRIGGER_COLLIDE, (args?: unknown) =>
      gameManager.addPoints((args as Record<string, number>).points)
    )
    this.on(RoverEvents.CAR_COLLIDE, rover.hitting)
    this.on(RoverEvents.CAR_COLLIDE, (args?: unknown) =>
      gameManager.roverHit(args as number)
    )
    this.on(RoverEvents.GAME_OVER, rover.setGameOver)
  }

  removeListeners() {
    Object.entries(this.listeners).forEach(([event, callbacks]) =>
      callbacks.forEach(callback => this.off(event, callback))
    )
  }
}

const eventBus = new EventBus()

export default eventBus
