import { LeaderboardUserScore } from '../../components/LeaderboardUserScore/LeaderboardUserScore'
import { LeaderboardTable } from '../../components/LeaderboardTable/LeaderboardTable'
import style from './Leaderboard.module.scss'

export const Leaderboard = () => {
  return (
    <div className={style.leaderboard}>
      <h2>Лучшие результаты</h2>
      <div className={style.container}>
        <LeaderboardTable />
        <LeaderboardUserScore />
      </div>
    </div>
  )
}
