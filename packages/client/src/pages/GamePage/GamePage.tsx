import React, { FC, RefObject, useRef, useState } from 'react'
import styles from './GamePage.module.scss'
import { GameField } from '../../components/GameField/GameField'
import { Button } from '../../components/Button/Button'
import gameManager from '../../game-engine/GameManager'
import RequireAuth from '../../hocs/requireAuth'
import { EnumPages } from '../../utils/const-variables/pages'

const GamePage: FC = () => {
  const gamePageRef: RefObject<HTMLDivElement> = useRef(null)
  const gameFieldRef: RefObject<HTMLDivElement> = useRef(null)

  const [level, setLevel] = useState(1)
  const [isGameOver, setGameOverState] = useState(false)
  gameManager.useChangeLevel(setLevel)
  gameManager.useChangeGameOverState(setGameOverState)

  const setFullScreen = () => {
    gamePageRef.current
      ?.requestFullscreen()
      // focus needed for keyboard events
      .then(() => gameFieldRef.current?.focus())
      .catch(() => console.warn('Fullscreen is not supported'))
  }

  return isGameOver ? (
    <div>GAME OVER (PAGE IN WORK)</div>
  ) : (
    <div className={styles.game}>
      <div ref={gamePageRef}>
        {/*TODO: replace with actual game level, add game level progress, timer, etc.*/}
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
