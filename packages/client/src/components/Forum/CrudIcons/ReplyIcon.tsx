import { FC } from 'react'
import styles from './CrudIcons.module.scss'

export const ReplyIcon: FC<{ replyHandler: () => void }> = ({
  replyHandler,
}) => {
  return (
    <svg className={styles.svg_icon} onClick={replyHandler}>
      <use xlinkHref="./images/icons-sprite.svg#reply"></use>
    </svg>
  )
}
