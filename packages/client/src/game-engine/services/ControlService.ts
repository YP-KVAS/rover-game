import { RoverEvents } from './EventBus'
import { MovingDirection } from '../../utils/types/game'
import eventBus from './EventBus'

class ControlService {
  private _gameField: HTMLElement | null = null
  private _focus = false

  addListeners(el: HTMLElement) {
    this._gameField = el
    this._gameField.addEventListener('keydown', this.move)
    this._gameField.addEventListener('click', this.setPointerLock)
  }

  removeListeners() {
    this._gameField?.removeEventListener('keydown', this.move)
    this._gameField?.removeEventListener('click', this.setPointerLock)
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

  setPointerLock(event: Event) {
    if (document.pointerLockElement === event.target) {
      document.exitPointerLock()
    } else {
      ;(event.target as HTMLElement).requestPointerLock()
    }
  }
}

const controlService = new ControlService()

export default controlService
