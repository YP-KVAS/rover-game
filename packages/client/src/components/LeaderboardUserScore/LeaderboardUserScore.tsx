import styles from './LeaderboardUserScore.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { User } from '../../utils/types/user'
import {  selectCurrentUserScore } from '../../store/selectors/user-selector'

export const LeaderboardUserScore = () => {

  const score : number | null = useAppSelector(selectCurrentUserScore)

  return (
    <div className={styles.leaderboardUserScore}>
    <p>Ваш лучший результат:</p>
    <p>{score ? score : 0 }</p>
    </div>
  )
}
