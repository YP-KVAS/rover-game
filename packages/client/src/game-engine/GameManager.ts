import React from 'react'
import { levels } from './level-information'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'
import { GameStatType } from '../utils/types/game'
import { immunityTimeMs, initialHitPoints } from '../utils/const-variables/game'

class GameManager {
  private _level = 1
  private _timer = 0
  private _timerId: number | undefined = undefined
  private _points = 0
  private _hitPoints = initialHitPoints
  private _immunity = false

  private _changeLevelFoo?: React.Dispatch<React.SetStateAction<number>>
  private _changeGameOverStateFoo?: React.Dispatch<
    React.SetStateAction<boolean>
  >
  private _changeStatFoo?: React.Dispatch<React.SetStateAction<GameStatType>>

  useChangeLevel(foo: React.Dispatch<React.SetStateAction<number>>) {
    this._changeLevelFoo = foo

    this._timer = levels[this._level].timer
    this.startTimer()
  }

  useChangeGameOverState(foo: React.Dispatch<React.SetStateAction<boolean>>) {
    this._changeGameOverStateFoo = foo
  }

  useStat(foo: React.Dispatch<React.SetStateAction<GameStatType>>) {
    this._changeStatFoo = foo
  }

  setLevel(val: number) {
    if (!Object.keys(levels).includes(String(val))) {
      console.error(`Level ${val} not exist`)
      return
    }
    if (!this._changeLevelFoo) {
      console.error('Function of changing level is not registered')
      return
    }

    BaseTrigger.removeTriggers()

    this.stopTimer()
    this.startTimer()

    this._level = val
    this._timer = levels[this._level].timer

    this.updateStat()

    this._changeLevelFoo(val)
  }

  updateStat() {
    if (!this._changeStatFoo) {
      console.error('Function of changing statistics is not registered')
      return
    }

    this._changeStatFoo({
      level: this._level,
      points: this._points,
      hitPoints: this._hitPoints,
      timer: this._timer,
    })
  }

  startTimer() {
    if (this._timerId) return

    this._timerId = setInterval(() => {
      this.updateStat()
      this._timer -= 1
      if (this._timer <= 0) {
        clearInterval(this._timerId)
        this.endGame()
      }
    }, 1000) as unknown as number
  }

  stopTimer() {
    this._points += this._timer * 100
    clearInterval(this._timerId)
    this._timerId = undefined
  }

  private _addPoints(val: number) {
    this._points += val
    this.updateStat()
  }

  addPoints(points: number) {
    this._addPoints(points)
  }

  get level() {
    return this._level
  }

  get points() {
    return this._points
  }
  endGame() {
    this.stopTimer()

    console.warn('End game with', this._points, 'points')

    if (this._changeGameOverStateFoo) {
      this._level = 1
      this._hitPoints = initialHitPoints
      this._points = 0
      this._changeGameOverStateFoo(true)
    }
  }

  roverHit(hit = 1) {
    if (!this._immunity) {
      this._hitPoints -= hit
      this.updateStat()

      this._immunity = true
      setTimeout(() => {
        this._immunity = false
      }, immunityTimeMs)
    }

    if (this._hitPoints <= 0) {
      this.endGame()
    }
  }
}

const gameManager = new GameManager()

export default gameManager
