import React, { FC, useEffect, useRef } from 'react'
import styles from './GameField.module.scss'
import { levels } from '../../game-engine/level-information'
import { Canvas } from '../canvas/Canvas'
import { carMove, roverMove } from '../../game-engine/move'
import { drawCar, drawRover, drawStaticLayer } from '../../game-engine/draw'
import { MovingDirection } from '../../utils/types/game'

interface GameFieldProps {
  level: number
}

export const GameField: FC<GameFieldProps> = ({ level }) => {
  const { rover, gameMap, cars, tileSize } = levels[level]

  const canvasWidth = gameMap[0][0].length * tileSize
  const canvasHeight = gameMap[0].length * tileSize
  const gameSectionRef = useRef(null)

  const drawDynamicLayer = (ctx: CanvasRenderingContext2D) => {
    drawRover(ctx, rover, tileSize)
    const carCoords = cars.map(car => car.coords)
    cars.forEach(car => {
      carMove(car, tileSize, gameMap[0], rover.coords, carCoords)
      drawCar(ctx, car, tileSize)
    })
  }

  useEffect(() => {
    // focus to start listening keyboard events
    const section = gameSectionRef.current as unknown as HTMLElement
    section.focus()
  }, [])

  const handleOnKeyDown = (event: React.KeyboardEvent) => {
    event.preventDefault()
    switch (event.key) {
      case 'Down': // IE/Edge specific value
      case 'ArrowDown':
        rover.movingDirection !== MovingDirection.DOWN
          ? (rover.movingDirection = MovingDirection.DOWN)
          : roverMove(rover, tileSize, gameMap)
        break

      case 'Up': // IE/Edge specific value
      case 'ArrowUp':
        rover.movingDirection !== MovingDirection.UP
          ? (rover.movingDirection = MovingDirection.UP)
          : roverMove(rover, tileSize, gameMap)
        break

      case 'Left': // IE/Edge specific value
      case 'ArrowLeft':
        rover.movingDirection !== MovingDirection.LEFT
          ? (rover.movingDirection = MovingDirection.LEFT)
          : roverMove(rover, tileSize, gameMap)
        break

      case 'Right': // IE/Edge specific value
      case 'ArrowRight':
        rover.movingDirection !== MovingDirection.RIGHT
          ? (rover.movingDirection = MovingDirection.RIGHT)
          : roverMove(rover, tileSize, gameMap)
        break
      default:
        return
    }
  }

  return (
    <section
      className={styles.section}
      onKeyDown={handleOnKeyDown}
      ref={gameSectionRef}
      tabIndex={0} style={{minWidth: canvasWidth}}>
      <Canvas
        draw={ctx => drawStaticLayer(ctx, gameMap[0], tileSize)}
        zIndex={1}
        width={canvasWidth}
        height={canvasHeight}
        isStatic={true}
      />
      <Canvas
        draw={ctx => drawStaticLayer(ctx, gameMap[1], tileSize)}
        zIndex={2}
        width={canvasWidth}
        height={canvasHeight}
        isStatic={true}
      />
      <Canvas
        draw={ctx => drawDynamicLayer(ctx)}
        zIndex={3}
        width={canvasWidth}
        height={canvasHeight}
        isStatic={false}
      />
    </section>
  )
}
