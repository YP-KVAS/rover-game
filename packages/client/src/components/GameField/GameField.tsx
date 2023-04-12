import React, { FC, RefObject, useEffect } from 'react'
import styles from './GameField.module.scss'
import { levels } from '../../game-engine/level-information'
import { Canvas } from '../Canvas/Canvas'
import { MovingDirection } from '../../utils/types/game'
import { StaticMap } from '../../game-engine/game-objects/StaticMap'
import { Rover } from '../../game-engine/game-objects/Rover'
import { Car } from '../../game-engine/game-objects/Car'
import { GameStat } from "./GameStat";

interface GameFieldProps {
  level: number
  gameFieldRef: RefObject<HTMLElement>
}

export const GameField: FC<GameFieldProps> = ({ level, gameFieldRef }) => {
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
    car => new Car(gameMap, tileSize, car.coords, car.movingDirection, car.img)
  )
  const staticMap = new StaticMap(gameMap, tileSize)

  const triggers = triggersInfo.map(
    trigger => new trigger.class(gameMap, tileSize, trigger)
  )

  const drawDynamicLayer = (ctx: CanvasRenderingContext2D) => {
    rover.draw(ctx)
    const carsCoords = cars.map(car => car.coords)
    cars.forEach(car => {
      car.move(rover.coords, carsCoords)
      car.draw(ctx)
    })
    triggers.forEach(trigger => {
      trigger.check(rover.coords)
      trigger.draw(ctx)
    })
  }

  useEffect(() => {
    // focus to start listening keyboard events
    gameFieldRef.current?.focus()
  }, [])

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault()
    switch (event.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        rover.move(MovingDirection.DOWN)
        break

      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        rover.move(MovingDirection.UP)
        break

      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        rover.move(MovingDirection.LEFT)
        break

      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        rover.move(MovingDirection.RIGHT)
        break
      default:
        return
    }
  }

  return (
    <div>
      <GameStat />

      <section
        className={styles.section}
        onKeyDown={handleOnKeyDown}
        ref={gameFieldRef}
        tabIndex={0}
        style={{ minWidth: canvasWidth, minHeight: canvasHeight }}>
        <Canvas
          draw={ctx => staticMap.draw(ctx)}
          zIndex={1}
          width={canvasWidth}
          height={canvasHeight}
          isStatic={true}
        />
        <Canvas
          draw={ctx => drawDynamicLayer(ctx)}
          zIndex={2}
          width={canvasWidth}
          height={canvasHeight}
          isStatic={false}
        />
      </section>
    </div>
  )
}
