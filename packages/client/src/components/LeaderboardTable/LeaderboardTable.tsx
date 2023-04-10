import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectLeaderboardItems } from '../../store/selectors/leaderboard-selector'
import { onGetAllLeaderboards, onGetLeaderboardByTeamName } from '../../store/thunks/leaderboard-thunk'
import { LeaderboardRequest, LeaderboardItem } from '../../utils/types/leaderboard'
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'

import styles from './LeaderboardTable.module.scss'

export const LeaderboardTable = () => {
  const dispatch = useAppDispatch()
  const leaderboardItems = useAppSelector(selectLeaderboardItems)

  useEffect(() => {
    const request: LeaderboardRequest = {
      ratingFieldName: "score",
      cursor: 20,
      limit: 100
    }
    dispatch(onGetAllLeaderboards(request))
  }, [dispatch])

  if(leaderboardItems.length === 0) {
    return (
      <div className={styles.leaderboardTable}>
        <p>No data</p>
      </div>
    )
  }

  const items = leaderboardItems.map((value, index) => {
    const key = index+1
    const image = (value.data.avatar != null)
      ? <img height='45px' alt='photo' src={BASE_URL+RESOURCES_API_URL+value.data.avatar}/>
      : <img height='45px' alt='photo' src='./images/user/empty-avatar.webp'/>

    const name = value.data.login ?? value.data.userLogin ?? value.data.username ?? value.data.name ?? value.data.id ?? 'No Name'
    const score = value.data.score

    return <li key={key}>{key} {image} {name} <p>{score}</p></li>
  })

  return (
    <div className={styles.leaderboardTable}>
      <ul>
        {items}
      </ul>
    </div>
  )
}
