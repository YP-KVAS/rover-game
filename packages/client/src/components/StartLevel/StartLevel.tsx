import styles from './StartLevel.module.scss'
import { FC, useState } from 'react'
import { Timer } from '../Timer/Timer'
import { GameControlTitle } from '../GameField/GameControlTitle/GameControlTitle'
import gameManager from '../../game-engine/GameManager'

export const StartLevel: FC = () => {
  const [isStarted, setStartAnimation] = useState(false)
  const [isCalled, setCallbackCalling] = useState(false)
  const startHandler = () => {
    setStartAnimation(true)
  }

  const timerCallback = () => {
    if (!isCalled) {
      setCallbackCalling(true)
      gameManager.startPlaying()
    }
  }

  const title =
    gameManager.level === 1
      ? 'Начать игру'
      : `Уровень ${gameManager.level}: Продолжить развозить заказы`

  return (
    <div className={styles.start}>
      <div className={styles.start__content}>
        {isStarted ? (
          <Timer callback={timerCallback} />
        ) : (
          <GameControlTitle title={title} clickHandler={startHandler} />
        )}
      </div>
    </div>
  )
}
