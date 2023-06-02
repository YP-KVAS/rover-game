import styles from './LeaderboardUserScore.module.scss'
import { useAppSelector } from '../../hooks/useStore'
import { selectCurrentUserScore } from '../../store/selectors/user-selector'
import { useEffect, useState } from 'react'

export const LeaderboardUserScore = () => {
  const currentUserScore = useAppSelector(selectCurrentUserScore)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className={styles.leaderboard_user_score}>
      <p>Ваш результат:</p>
      {isMounted && <p>{currentUserScore?.toLocaleString() || '-'}</p>}
    </div>
  )
}
