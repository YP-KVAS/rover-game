import { useState } from 'react'
import { Button } from '../../components/Button/Button'
import { Timer } from '../../components/Timer/Timer'
import styles from './Start.module.scss'

export const Start = () => {
  const [isStarted, setStartAnimation] = useState(false)
  const [isCalled, setCallbackCalling] = useState(false)

  const startHandler = () => {
    setStartAnimation(true)
  }

  const timerCallback = () => {
    if (!isCalled) {
      //TODO: переходим на экран игры /game
      setCallbackCalling(true)
      console.log('Переходим на экран игры')
    }
  }

  return (
    <div className={styles.start}>
      <div className={styles.start__content}>
        {isStarted ? (
          <div className={styles.start__timer}>
            <Timer callback={timerCallback} />
          </div>
        ) : (
          <Button clickHandler={startHandler}>Начать игру</Button>
        )}
      </div>
    </div>
  )
}
