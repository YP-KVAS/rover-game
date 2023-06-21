import styles from './LeaderboardTable.module.scss'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectLeaderboardState,
  selectLeaderboardUsers,
  selectLeaderboardUsersTotal,
} from '../../store/selectors/leaderboard-selector'
import { onGetLeaderboard } from '../../store/thunks/leaderboard-thunk'
import { LEADERBOARD_LOAD_LIMIT } from '../../utils/const-variables/api'
import { useCurrentPage } from '../../hooks/useCurrentPage'
import { PageLinks } from '../PageLinks/PageLinks'
import { LeaderboardItem } from './LeaderboardItem'
import { Loader } from '../Loader/Loader'
import { clearLeaderboard } from '../../store/slices/leaderboard-slice'
import { useNavigate } from 'react-router-dom'
import { PAGE_QUERY } from '../../utils/const-variables/routes'

export const LeaderboardTable: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const leaderboardUsers = useAppSelector(selectLeaderboardUsers)
  const { isLoading, errorMessage } = useAppSelector(selectLeaderboardState)

  const totalPlayers = useAppSelector(selectLeaderboardUsersTotal)
  const totalPages = Math.ceil(totalPlayers / LEADERBOARD_LOAD_LIMIT)

  const currentPage = useCurrentPage()
  const offset = (currentPage - 1) * LEADERBOARD_LOAD_LIMIT

  useEffect(() => {
    if (currentPage) {
      dispatch(onGetLeaderboard({ offset }))
    }

    return () => {
      dispatch(clearLeaderboard())
    }
  }, [dispatch, offset])

  useEffect(() => {
    if (totalPages && currentPage > totalPages) {
      navigate({ search: `?${PAGE_QUERY}=1` })
    }
  }, [currentPage, totalPages])

  return (
    <div className={styles.leaderboard_table}>
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <strong>{errorMessage}</strong>
      ) : !leaderboardUsers || leaderboardUsers.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Нет данных</p>
      ) : (
        !isNaN(offset) && (
          <div className={styles.list_wrapper}>
            <ul className={styles.list}>
              {leaderboardUsers?.map((user, idx) => (
                <LeaderboardItem
                  key={user.id}
                  ordinal={offset + idx + 1}
                  user={user}
                />
              ))}
            </ul>
            {totalPages > 1 && (
              <PageLinks currentPage={currentPage} maxPage={totalPages} />
            )}
          </div>
        )
      )}
    </div>
  )
}
