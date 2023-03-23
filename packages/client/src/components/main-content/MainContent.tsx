import { FC } from 'react'
import styles from './MainContent.module.scss'

export const MainContent: FC = () => {
  return (
    <div>
      <h1 className={styles.title}>Вот тут будет жить ваше приложение :)</h1>
    </div>
  )
}
