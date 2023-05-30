import styles from './GameControlTitle.module.scss'
import { FC } from 'react'

interface ControlTitleProps {
  title: string
  clickHandler: () => void
}

export const GameControlTitle: FC<ControlTitleProps> = ({
  title,
  clickHandler,
}) => {
  return (
    <h2 className={styles.title} onClick={clickHandler}>
      {title}
    </h2>
  )
}
