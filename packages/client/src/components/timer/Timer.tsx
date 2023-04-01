import styles from './Timer.module.scss'

type TimerProps = {
  callback?: () => void
}

export const Timer = ({ callback }: TimerProps) => {
  const className = `${styles.timer} ${styles.timer_type_started}`

  const handler = () => {
    callback && callback()
  }

  return <div className={className} onAnimationEnd={handler}></div>
}
