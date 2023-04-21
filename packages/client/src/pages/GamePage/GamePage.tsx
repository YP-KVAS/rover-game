import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './GamePage.module.scss'
import { GameField } from '../../components/GameField/GameField'
import { Button } from '../../components/Button/Button'
import gameManager from '../../game-engine/GameManager'
import RequireAuth from '../../hocs/requireAuth'
import { EnumPages } from '../../utils/const-variables/pages'
import { GameCompleted } from '../../components/GameField/GameCompleted/GameCompleted'

const GamePage: FC = () => {
  const gamePageRef: RefObject<HTMLDivElement> = useRef(null)
  const gameFieldRef: RefObject<HTMLDivElement> = useRef(null)

  const [level, setLevel] = useState(gameManager.level)
  const [gameCompleted, setGameCompleted] = useState(gameManager.gameCompleted)

  useEffect(() => {
    gameManager.useChangeLevel(setLevel)
    gameManager.useChangeGameCompletedState(setGameCompleted)

    return () => {
      if (gameManager.levelProgress === 'failed') {
        gameManager.restartGame()
      } else if (!gameManager.gameCompleted) {
        gameManager.restartLevel()
      }
    }
  }, [])

  const setFullScreen = () => {
    gamePageRef.current
      ?.requestFullscreen()
      // focus needed for keyboard events
      .then(() => gameFieldRef.current?.focus())
      .catch(() => console.warn('Fullscreen is not supported'))
  }

  return gameCompleted ? (
    <GameCompleted />
  ) : (
    <div className={styles.game}>
      <div ref={gamePageRef}>
        <GameField level={level} gameFieldRef={gameFieldRef} />
      </div>
      <Button clickHandler={setFullScreen}>
        Перейти в полноэкранный режим
      </Button>
    </div>
  )
}

const GamePageWithAuth: FC = RequireAuth(GamePage, EnumPages.GAME_PAGE)

export { GamePageWithAuth as GamePage }
