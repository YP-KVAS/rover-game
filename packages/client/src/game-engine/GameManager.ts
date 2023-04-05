import React from 'react'
import { levels } from './level-information'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'

class GameManager {
  private _level = 1
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

  get level() {
    return this._level
  }
  endGame() {
    // TODO: Implement end game
    console.warn('End game')
  }

  roverHit() {
    console.warn('Rover Hit')
  }
}

const gameManager = new GameManager()

export default gameManager
