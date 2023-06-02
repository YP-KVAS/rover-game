import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectLeaderboardItems } from '../../store/selectors/leaderboard-selector'
import { onGetAllLeaderboards } from '../../store/thunks/leaderboard-thunk'
import { LeaderboardRequest } from '../../utils/types/leaderboard'
import {
  BASE_YA_URL,
  LEADERBOARD_LOAD_LIMIT,
  RESOURCES_API_URL,
} from '../../utils/const-variables/api'

import styles from './LeaderboardTable.module.scss'
import { LeaderboardItem } from './LeaderboardItem'

export const LeaderboardTable = () => {
  const dispatch = useAppDispatch()
  const leaderboardItems = useAppSelector(selectLeaderboardItems)

  useEffect(() => {
    const request: LeaderboardRequest = {
      ratingFieldName: 'score',
      cursor: 0,
      limit: LEADERBOARD_LOAD_LIMIT,
    }
    dispatch(onGetAllLeaderboards(request))
  }, [dispatch])

  if (!leaderboardItems) {
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
        width="45px"
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
      <LeaderboardItem
        key={index}
        ordinal={index + 1}
        user={{ avatar: value.data.avatar, score, display_name: name }}
      />
    )
  })

  return (
    <div className={styles.leaderboard_table}>
      <ul className={styles.list}>{items}</ul>
    </div>
  )
}
