import React from 'react'
import { levels, maxLevel } from './level-information'
import { BaseTrigger } from './game-objects/base-classes/BaseTrigger'
import { GameStatType, LevelProgress } from '../utils/types/game'
import { immunityTimeMs, initialHitPoints } from '../utils/const-variables/game'
import eventBus, { RoverEvents } from './services/EventBus'

class GameManager {
  private _level = 1
  private _levelProgress: LevelProgress = 'notStarted'
  private _timer = 0
  private _timerId: number | undefined = undefined
  private _levelPoints = 0
  private _totalPoints = 0
  private _hitPoints = initialHitPoints
  private _immunity = false
  private _gameCompleted = false

  private _changeLevelFoo?: React.Dispatch<React.SetStateAction<number>>
  private _changeLevelProgressFoo?: React.Dispatch<
    React.SetStateAction<LevelProgress>
  >
  private _changeStatFoo?: React.Dispatch<React.SetStateAction<GameStatType>>
  private _changeGameCompletedFoo?: React.Dispatch<
    React.SetStateAction<boolean>
  >

  useChangeLevel(foo: React.Dispatch<React.SetStateAction<number>>) {
    this._changeLevelFoo = foo
    this._timer = levels[this._level].timer
  }

  useChangeLevelProgress(
    foo: React.Dispatch<React.SetStateAction<LevelProgress>>
  ) {
    this._changeLevelProgressFoo = foo
  }

  useChangeGameCompletedState(
    foo: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    this._changeGameCompletedFoo = foo
  }

  useStat(foo: React.Dispatch<React.SetStateAction<GameStatType>>) {
    this._changeStatFoo = foo
  }

  startPlaying() {
    this.updateLevelProgress('playing')
    this.startTimer()
  }

  private _setNextLevel(level?: number) {
    this._levelPoints = 0
    const nextLevel = level || this._level + 1

    if (!Object.keys(levels).includes(String(nextLevel))) {
      console.error(`Level ${nextLevel} doesn't exist`)
      return
    }

    BaseTrigger.removeTriggers()

    this.updateLevel(nextLevel)
    this.updateLevelProgress('notStarted')
    this.updateStat()
  }

  updateStat() {
    if (!this._changeStatFoo) {
      console.error('Function of changing statistics is not registered')
      return
    }

    this._changeStatFoo({
      level: this._level,
      points: this._totalPoints,
      hitPoints: this._hitPoints,
      timer: this._timer,
    })
  }

  resetStat() {
    this._timerId = undefined
    this._totalPoints = 0
    this._levelPoints = 0
    this._hitPoints = initialHitPoints
    this._immunity = false
  }

  updateLevel(level: number) {
    this._level = level
    this._timer = levels[this._level].timer

    if (!this._changeLevelFoo) {
      console.error('Function of changing level is not registered')
      return
    }

    this._changeLevelFoo(level)
  }

  updateLevelProgress(progress: LevelProgress) {
    this._levelProgress = progress

    if (!this._changeLevelProgressFoo) {
      console.error('Function of changing level progress is not registered')
      return
    }

    this._changeLevelProgressFoo(progress)
  }

  updateGameCompletedState(isCompleted: boolean) {
    this._gameCompleted = isCompleted

    if (!this._changeGameCompletedFoo) {
      console.error(
        'Function of changing game completed state is not registered'
      )
      return
    }

    this._changeGameCompletedFoo(isCompleted)
  }

  getStat(): GameStatType {
    return {
      level: this._level,
      points: this._totalPoints,
      hitPoints: this._hitPoints,
      timer: this._timer,
    }
  }

  startTimer() {
    if (this._timerId) return

    this._timerId = setInterval(() => {
      this._timer -= 1
      this.updateStat()
      if (this._timer <= 0) {
        clearInterval(this._timerId)
        eventBus.emit(RoverEvents.GAME_OVER)
        setTimeout(() => this.failLevel())
      }
    }, 1000) as unknown as number
  }

  stopTimer() {
    if (this._levelProgress === 'completed') {
      this.addPoints(this._timer * 100)
    }

    clearInterval(this._timerId)
    this._timerId = undefined
  }

  private _addPoints(val: number) {
    this._totalPoints += val
    this._levelPoints += val
    this.updateStat()
  }

  addPoints(points: number) {
    this._addPoints(points)
  }

  get level() {
    return this._level
  }

  get totalPoints() {
    return this._totalPoints
  }

  get levelProgress() {
    return this._levelProgress
  }

  get gameCompleted() {
    return this._gameCompleted
  }

  completeLevel() {
    this.updateLevelProgress('completed')
    this.stopTimer()

    if (this._level === maxLevel) {
      this._addPoints(this._hitPoints * 1000)
      this.updateGameCompletedState(true)
    } else {
      this._setNextLevel()
    }

    console.warn(`End level with ${this._totalPoints} points`)
  }

  failLevel() {
    this.updateLevelProgress('failed')
    this.stopTimer()

    console.warn(`Game over with ${this._totalPoints} points`)
  }

  restartGame() {
    if (this._gameCompleted) {
      this.updateGameCompletedState(false)
    }
    this.resetStat()
    this._setNextLevel(1)
  }

  restartLevel() {
    this.stopTimer()
    this._totalPoints -= this._levelPoints
    this._setNextLevel(this._level)
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

    if (this._hitPoints <= 0 && this._levelProgress === 'playing') {
      this._levelProgress = 'willFail'
      eventBus.emit(RoverEvents.GAME_OVER)
      setTimeout(() => this.failLevel())
    }
  }
}

const gameManager = new GameManager()

export default gameManager
