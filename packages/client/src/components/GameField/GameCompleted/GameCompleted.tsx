import styles from './GameCompleted.module.scss'
import { FC } from 'react'
import gameManager from '../../../game-engine/GameManager'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../../utils/const-variables/routes'
import { AnimatedFrame } from '../../AnimatedFrame/AnimatedFrame'

export const GameCompleted: FC = () => {
  const restartGame = () => gameManager.restartGame()

  return (
    <>
      <AnimatedFrame>
        <h3>{`Поздравляем \u{1F389} \u{1F389} \u{1F389}`}</h3>
        <p className={styles.paragraph}>
          Вы развезли все заказы и набрали{' '}
          <strong>{gameManager.totalPoints.toLocaleString()}</strong> очков! Это
          отличный результат. На этом всё :) Следите за обновлениями, новые
          уровни уже на подходе.
        </p>
        <p className={styles.paragraph}>
          А пока можете найти свое место в общем рейтинге на странице{' '}
          <Link to={RoutesEnum.LEADERBOARD} className={styles.link}>
            Лидерборда
          </Link>{' '}
          или поделиться впечатлениями об игре на нашем{' '}
          <Link to={RoutesEnum.FORUM} className={styles.link}>
            Форуме
          </Link>
          .
        </p>
        <p className={styles.paragraph}>
          И, конечно, вы всегда можете{' '}
          <span className={styles.link} onClick={restartGame}>
            пройти игру еще раз
          </span>{' '}
          и поставить новый мировой рекорд.
        </p>
      </AnimatedFrame>
      <div className={styles.confetti}></div>
    </>
  )
}
