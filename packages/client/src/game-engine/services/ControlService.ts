import eventBus, { RoverEvents } from './EventBus'
import { MovingDirection } from '../../utils/types/game'

class ControlService {
  private _gameField: HTMLElement | null = null
  private sensitive = 5
  private _direction: MovingDirection | null = null
  private _intervalId: NodeJS.Timer | null = null

  constructor() {
    this.handleStartMoveByKeyboard = this.handleStartMoveByKeyboard.bind(this)
    this.handleEndMoveByKeyboard = this.handleEndMoveByKeyboard.bind(this)
    this.setPointerLock = this.setPointerLock.bind(this)
    this.handleMoveByMouse = this.handleMoveByMouse.bind(this)
    this.move = this.move.bind(this)
  }

  addListeners(el: HTMLElement) {
    this._gameField = el
    this._gameField.addEventListener('keydown', this.handleStartMoveByKeyboard)
    this._gameField.addEventListener('keyup', this.handleEndMoveByKeyboard)
    this._gameField.addEventListener('click', this.setPointerLock)

    this._intervalId = setInterval(this.move, 30)
  }

  removeListeners() {
    document.exitPointerLock()

    this._gameField?.removeEventListener(
      'keydown',
      this.handleStartMoveByKeyboard
    )
    this._gameField?.removeEventListener('keyup', this.handleEndMoveByKeyboard)
    this._gameField?.removeEventListener('click', this.setPointerLock)

    if (this._intervalId) {
      clearInterval(this._intervalId)
    }
  }

  move() {
    if (!this._direction) return

    eventBus.emit(RoverEvents.MOVE, { direction: this._direction })
  }

  handleStartMoveByKeyboard(event: KeyboardEvent) {
    event.preventDefault()

    this.moveByKeyboard(event.code)
  }

  handleEndMoveByKeyboard(event: KeyboardEvent) {
    event.preventDefault()

    this._direction = null
  }

  handleMoveByMouse(event: MouseEvent) {
    event.preventDefault()

    if (document.pointerLockElement !== event.target) return

    this._direction = null

    if (event.movementX > this.sensitive) {
      this._direction = MovingDirection.RIGHT
      return
    } else if (event.movementX < -this.sensitive) {
      this._direction = MovingDirection.LEFT
      return
    }

    if (event.movementY > this.sensitive) {
      this._direction = MovingDirection.DOWN
      return
    } else if (event.movementY < -this.sensitive) {
      this._direction = MovingDirection.UP
      return
    }
  }

  moveByKeyboard(code: string) {
    switch (code) {
      case 'KeyS':
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        this._direction = MovingDirection.DOWN
        break

      case 'KeyW':
      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        this._direction = MovingDirection.UP
        break

      case 'KeyA':
      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        this._direction = MovingDirection.LEFT
        break

      case 'KeyD':
      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        this._direction = MovingDirection.RIGHT
        break
      default:
        return
    }
  }

  setPointerLock(event: Event) {
    if (document.pointerLockElement === event.target) {
      document.exitPointerLock()
      window.removeEventListener('mousemove', this.handleMoveByMouse)
    } else {
      ;(event.target as HTMLElement).requestPointerLock()
      window.addEventListener('mousemove', this.handleMoveByMouse)
    }
  }
}

const controlService = new ControlService()

export default controlService
