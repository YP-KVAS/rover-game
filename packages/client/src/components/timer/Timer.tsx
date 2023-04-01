import { useEffect, useRef } from 'react'
import styles from './Timer.module.scss'

type TimerProps = {
  callback?: () => void
}

export const Timer = ({ callback }: TimerProps) => {
  const className = `${styles.timer} ${styles['timer-type-started']}`
  const ref = useRef<HTMLDivElement>(null)

  if (callback) {
    useEffect(() => {
      const handleClick = () => {
        callback()
      }

      const timer = ref.current

      timer &&
        timer.addEventListener('animationend', function handler() {
          timer.removeEventListener('animationend', handler)
          handleClick()
        })
    })
  }

  return <div className={className} ref={ref}></div>
}
