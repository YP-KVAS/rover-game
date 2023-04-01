import { useState } from 'react'
import { Button } from '../../components/button/Button'
import { Timer } from '../../components/timer/Timer'
import styles from './Start.module.scss'

export const Start = () => {
  const [isDisabled, setDisable] = useState(false)
  const [isStarted, setStartAnimation] = useState(false)

  const startHandler = () => {
    setDisable(true)
    setStartAnimation(true)
  }

  const timerCallback = () => {
    //TODO: переходим на экран игры /game
    console.log('Переходим на экран игры')
  }

  return (
    <div className={styles.start}>
      <div className={styles['start--content']}>
        {isStarted && (
          <div className={styles['start--content-timer']}>
            <Timer callback={timerCallback} />
          </div>
        )}
        <Button clickHandler={startHandler} isDisabled={isDisabled}>
          Начать игру
        </Button>
      </div>
    </div>
  )
}
