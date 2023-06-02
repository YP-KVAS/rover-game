import styles from './LeaderboardTable.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { LeaderboardUser } from '../../utils/types/user'
import {
  BASE_YA_URL,
  LEADERBOARD_LOAD_LIMIT,
  RESOURCES_API_URL,
} from '../../utils/const-variables/api'
import { FormInputNames } from '../../utils/types/forms'
import { useIsIntersecting } from '../../hooks/useIsIntersecting'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectLeaderboardIsLoading,
  selectLeaderboardItemsLength,
} from '../../store/selectors/leaderboard-selector'
import { LeaderboardRequest } from '../../utils/types/leaderboard'
import { onGetAllLeaderboards } from '../../store/thunks/leaderboard-thunk'

interface LeaderboardItemProps {
  ordinal: number
  user: LeaderboardUser
}

export const LeaderboardItem: FC<LeaderboardItemProps> = ({
  ordinal,
  user,
}) => {
  const dispatch = useAppDispatch()
  const leaderboardLength = useAppSelector(selectLeaderboardItemsLength)
  const isLoading = useAppSelector(selectLeaderboardIsLoading)

  const ref = useRef<HTMLDivElement | null>(null)
  const isIntersecting = useIsIntersecting(ref)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (
      leaderboardLength &&
      ordinal === leaderboardLength - 1 &&
      isIntersecting &&
      leaderboardLength >= LEADERBOARD_LOAD_LIMIT &&
      !isLoading
    ) {
      const request: LeaderboardRequest = {
        ratingFieldName: 'score',
        cursor: ordinal + 1,
        limit: LEADERBOARD_LOAD_LIMIT,
      }
      dispatch(onGetAllLeaderboards(request))
    }
  }, [ordinal, isIntersecting, dispatch])

  return (
    <div className={styles.list_item_wrapper} ref={ref}>
      <li className={styles.list_item}>
        <span className={styles.ordinal}>{ordinal}</span>
        <img
          className={styles.avatar}
          alt="avatar"
          src={
            user[FormInputNames.AVATAR]
              ? `${BASE_YA_URL}${RESOURCES_API_URL}${
                  user[FormInputNames.AVATAR]
                }`
              : './images/user/empty-avatar.webp'
          }
        />
        <span>{user[FormInputNames.DISPLAY_NAME] || 'Неизвестный игрок'}</span>
        {isMounted && (
          <span className={styles.score}>
            {user.score?.toLocaleString() || 0}
          </span>
        )}
      </li>
      <hr />
    </div>
  )
}
