import eventBus, { RoverEvents } from './EventBus'
import { MovingDirection } from '../../utils/types/game'

class ControlService {
  private _gameField: HTMLElement | null = null
  private _listeners: [string, EventListener][] = []
  private _mouseFoo?: (event: MouseEvent) => void

  private sensitive = 5
  private _direction: MovingDirection | null = null
  private _intervalId: NodeJS.Timer | null = null

  addListeners(el: HTMLElement) {
    this._gameField = el

    const keyDownFoo = this.handleStartMoveByKeyboard.bind(this)
    const keyUpFoo = this.handleEndMoveByKeyboard.bind(this)
    const pointerLockFoo = this.setPointerLock.bind(this)

    this._listeners.push(['keydown', keyDownFoo as EventListener])
    this._listeners.push(['keyup', keyUpFoo as EventListener])
    this._listeners.push(['click', pointerLockFoo])

    this._gameField.addEventListener('keydown', keyDownFoo)
    this._gameField.addEventListener('keyup', keyUpFoo)
    this._gameField.addEventListener('click', pointerLockFoo)

    const moveFoo = this.move.bind(this)
    this._intervalId = setInterval(moveFoo, 30)
  }

  removeListeners() {
    this._listeners.forEach(item => {
      this._gameField?.removeEventListener(item[0], item[1])
    })

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
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        this._direction = MovingDirection.DOWN
        break

      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        this._direction = MovingDirection.UP
        break

      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        this._direction = MovingDirection.LEFT
        break

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
      if (this._mouseFoo) {
        window.removeEventListener('mousemove', this._mouseFoo)
      }
    } else {
      ;(event.target as HTMLElement).requestPointerLock()
      this._mouseFoo = this.handleMoveByMouse.bind(this)
      window.addEventListener('mousemove', this._mouseFoo)
    }
  }
}

const controlService = new ControlService()

export default controlService
