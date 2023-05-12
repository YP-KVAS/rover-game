import { RoverEvents } from './EventBus'
import { MovingDirection } from '../../utils/types/game'
import eventBus from './EventBus'

class ControlService {
  private _gameField: HTMLElement | null = null

  addListeners(el: HTMLElement) {
    this._gameField = el
    this._gameField.addEventListener('keydown', this.move)
  }

  removeListeners() {
    this._gameField?.removeEventListener('keydown', this.move)
  }

  move(event: KeyboardEvent) {
    event.preventDefault()
    switch (event.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        eventBus.emit(RoverEvents.MOVE, { direction: MovingDirection.DOWN })
        break

      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        eventBus.emit(RoverEvents.MOVE, { direction: MovingDirection.UP })
        break

      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        eventBus.emit(RoverEvents.MOVE, { direction: MovingDirection.LEFT })
        break

      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        eventBus.emit(RoverEvents.MOVE, { direction: MovingDirection.RIGHT })
        break
      default:
        return
    }
  }
}

const controlService = new ControlService()

export default controlService
