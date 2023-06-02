import styles from './LeaderboardUserScore.module.scss'

export const LeaderboardUserScore = () => {
  return (
    <div className={styles.leaderboard_user_score}>
      <p>Ваш результат:</p>
      <p>0</p>
    </div>
  )
}
