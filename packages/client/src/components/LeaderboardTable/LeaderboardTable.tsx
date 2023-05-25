import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectLeaderboardItems } from '../../store/selectors/leaderboard-selector'
import { onGetAllLeaderboards } from '../../store/thunks/leaderboard-thunk'
import { LeaderboardRequest } from '../../utils/types/leaderboard'
import { BASE_YA_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'

import styles from './LeaderboardTable.module.scss'

export const LeaderboardTable = () => {
  const dispatch = useAppDispatch()
  const leaderboardItems = useAppSelector(selectLeaderboardItems)

  useEffect(() => {
    const request: LeaderboardRequest = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: 100,
    }
    dispatch(onGetAllLeaderboards(request))
  }, [dispatch])

  if (leaderboardItems.length === 0) {
    return (
      <div className={styles.leaderboard_table}>
        <p>Нет данных</p>
      </div>
    )
  }

  const items = leaderboardItems.map((value, index) => {
    const key = index + 1
    const image = (
      <img
        height="45px"
        alt="photo"
        src={
          value.data.avatar
            ? `${BASE_YA_URL}${RESOURCES_API_URL}${value.data.avatar}`
            : './images/user/empty-avatar.webp'
        }
      />
    )

    const name =
      value.data.login ??
      value.data.userLogin ??
      value.data.username ??
      value.data.name ??
      value.data.id ??
      'Неизвестный игрок'
    const score = value.data.score

    return (
      <li key={key}>
        {key} {image} {name} <p>{score.toLocaleString()}</p>
      </li>
    )
  })

  return (
    <div className={styles.leaderboard_table}>
      <ul>{items}</ul>
    </div>
  )
}
