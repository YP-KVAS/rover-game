import React from 'react'
import { levels } from './level-information'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'

class GameManager {
  private _level = 1
  private _points = 0
  private _changeLevelFoo:
    | React.Dispatch<React.SetStateAction<number>>
    | undefined

  setChangeLevelFoo(foo: React.Dispatch<React.SetStateAction<number>>) {
    this._changeLevelFoo = foo
  }

  setLevel(val: number) {
    if (!Object.keys(levels).includes(String(val))) {
      console.error(`Level ${val} not exist`)
      return
    }
    if (!this._changeLevelFoo) return

    BaseTrigger.removeTriggers()

    this._level = val
    this._changeLevelFoo(val)
  }

  loadCargo() {
    console.warn('load')
    this._points += 1000
  }

  deliveryCargo() {
    console.warn('delivery')
    this._points += 3000
  }

  get level() {
    return this._level
  }
  endGame() {
    // TODO: Implement end game
    console.warn('End game with', this._points, 'points')
  }

  roverHit() {
    // TODO: Implement health
    console.warn('Rover Hit')
  }
}

const gameManager = new GameManager()

export default gameManager
