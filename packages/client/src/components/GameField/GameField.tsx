import React, { FC, RefObject, useEffect, useState } from 'react'
import styles from './GameField.module.scss'
import { levels } from '../../game-engine/level-information'
import { Canvas } from '../Canvas/Canvas'
import { MovingDirection } from '../../utils/types/game'
import { StaticMap } from '../../game-engine/game-objects/StaticMap'
import { Rover } from '../../game-engine/game-objects/Rover'
import { Car } from '../../game-engine/game-objects/Car'
import { GameStat } from './GameStat/GameStat'
import { GameControls } from './GameControls/GameControls'
import eventBus from '../../game-engine/services/EventBus'
import controlService from '../../game-engine/services/ControlService'

interface GameFieldProps {
  level: number
  gameFieldRef: RefObject<HTMLDivElement>
}

export const GameField: FC<GameFieldProps> = ({ level, gameFieldRef }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const changeIsPlayingState = (isPlaying: boolean) => {
    setIsPlaying(isPlaying)
    // focus to start listening keyboard events
    gameFieldRef.current?.focus()
  }

  const {
    rover: roverInfo,
    gameMap,
    cars: carsInfo,
    triggers: triggersInfo,
    tileSize,
  } = levels[level]

  const canvasWidth = gameMap[0][0].length * tileSize
  const canvasHeight = gameMap[0].length * tileSize

  const rover = new Rover(
    gameMap,
    tileSize,
    roverInfo.coords,
    roverInfo.movingDirection,

    roverInfo.speed
  )
  const cars = carsInfo.map(
    car =>
      new Car(
        gameMap,
        tileSize,
        car.coords,
        car.movingDirection,
        car.speed,
        car.img
      )
  )
  const staticMap = new StaticMap(gameMap, tileSize)

  const triggers = triggersInfo.map(
    trigger => new trigger.class(gameMap, tileSize, trigger)
  )

  useEffect(() => {
    eventBus.addListeners(rover)
    if (gameFieldRef.current) controlService.addListeners(gameFieldRef.current)

    return () => {
      eventBus.removeListeners()
      controlService.removeListeners()
    }
  }, [isPlaying])

  const drawDynamicLayer = (ctx: CanvasRenderingContext2D) => {
    rover.draw(ctx)
    const carsCoords = cars.map(car => car.coords)
    cars.forEach(car => {
      car.move(rover.coords, carsCoords)
      car.draw(ctx)
    })
    triggers.forEach(trigger => {
      trigger.check(rover)
      trigger.draw(ctx)
    })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.field}>
        <GameStat />

        <section
          ref={gameFieldRef}
          className={styles.section}
          tabIndex={0}
          style={{ minWidth: canvasWidth, minHeight: canvasHeight }}>
          <Canvas
            draw={ctx => staticMap.draw(ctx)}
            zIndex={1}
            width={canvasWidth}
            height={canvasHeight}
            isStatic={true}
          />
          {isPlaying && (
            <Canvas
              draw={ctx => drawDynamicLayer(ctx)}
              zIndex={2}
              width={canvasWidth}
              height={canvasHeight}
              isStatic={false}
            />
          )}
        </section>

        <GameControls changeIsPlayingState={changeIsPlayingState} />
      </div>
    </div>
  )
}
