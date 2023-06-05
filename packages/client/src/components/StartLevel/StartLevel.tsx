import styles from './StartLevel.module.scss'
import { FC, useContext, useState } from 'react'
import { Timer } from '../Timer/Timer'
import { GameControlTitle } from '../GameField/GameControlTitle/GameControlTitle'
import gameManager from '../../game-engine/GameManager'
import { SoundContext } from '../../contexts/SoundContext'
import useSound from 'use-sound'
import start from '../../../public/sounds/start.mp3'

export const StartLevel: FC = () => {
  const { soundOn } = useContext(SoundContext)
  const [startSound] = useSound(start)

  const [isStarted, setStartAnimation] = useState(false)
  const [isCalled, setCallbackCalling] = useState(false)
  const startHandler = () => {
    setStartAnimation(true)
    soundOn && startSound()
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
