import style from './Leaderboard.module.scss'
import { LeaderboardUserScore } from '../../components/LeaderboardUserScore/LeaderboardUserScore'
import { LeaderboardTable } from '../../components/LeaderboardTable/LeaderboardTable'
import { Title } from '../../components/Title/Title'
import RequireAuth from '../../hocs/requireAuth'
import { EnumPages } from '../../utils/const-variables/pages'

const Leaderboard = () => {
  return (
    <div className={style.leaderboard}>
      <Title text="Лучшие результаты" />
      <div className={style.container}>
        <LeaderboardTable />
        <LeaderboardUserScore />
      </div>
    </div>
  )
}

const LeaderboardWithAuth = RequireAuth(Leaderboard, EnumPages.LEADERBOARD)

export { LeaderboardWithAuth as Leaderboard }
