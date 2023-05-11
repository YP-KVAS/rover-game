import React, { FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './GamePage.module.scss'
import { Button } from '../../components/Button/Button'
import RequireAuth from '../../hocs/requireAuth'
import { GameField } from '../../components/GameField/GameField'
import { EnumPages } from '../../utils/const-variables/pages'
import gameManager from '../../game-engine/GameManager'
import { GameImages } from '../../game-engine/GameImages'
import { Loader } from '../../components/Loader/Loader'

const GamePage: FC = () => {
  const gamePageRef: RefObject<HTMLDivElement> = useRef(null)
  const gameFieldRef: RefObject<HTMLDivElement> = useRef(null)

  const [level, setLevel] = useState(1)
  const [isGameOver, setGameOverState] = useState(false)
  const [gameEnabled, setGameEnabled] = useState(false)

  useEffect(() => {
    gameManager.useChangeLevel(setLevel)
    gameManager.useChangeGameOverState(setGameOverState)
    GameImages.getInstance().useChangeAllImagesLoadedState(setGameEnabled)
  }, [])

  const setFullScreen = () => {
    gamePageRef.current
      ?.requestFullscreen()
      // focus needed for keyboard events
      .then(() => gameFieldRef.current?.focus())
      .catch(() => console.warn('Fullscreen is not supported'))
  }

  return isGameOver ? (
    <div>GAME OVER (PAGE IN WORK)</div>
  ) : !gameEnabled ? (
    <Loader />
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
