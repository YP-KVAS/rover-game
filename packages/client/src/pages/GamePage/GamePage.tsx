import React, { FC, RefObject, useRef } from 'react'
import styles from './GamePage.module.scss'
import { GameField } from '../../components/GameField/GameField'
import { Button } from '../../components/Button/Button'
import gameManager from '../../game-engine/GameManager'

export const GamePage: FC = () => {
  const gamePageRef: RefObject<HTMLDivElement> = useRef(null)
  const gameFieldRef: RefObject<HTMLDivElement> = useRef(null)

  const [level, setLevel] = React.useState(1)

  gameManager.useChangeLevel(setLevel)
  const setFullScreen = () => {
    gamePageRef.current
      ?.requestFullscreen()
      // focus needed for keyboard events
      .then(() => gameFieldRef.current?.focus())
      .catch(() => console.warn('Fullscreen is not supported'))
  }

  return (
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
