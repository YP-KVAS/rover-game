import styles from './LeaderboardTable.module.scss'
import { FC, useEffect, useState } from 'react'
import { LeaderboardUser } from '../../utils/types/user'
import { BASE_YA_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'
import { FormInputNames } from '../../utils/types/forms'
import { useAppSelector } from '../../hooks/useStore'
import { selectCurrentUserId } from '../../store/selectors/user-selector'

interface LeaderboardItemProps {
  ordinal: number
  user: LeaderboardUser
}

export const LeaderboardItem: FC<LeaderboardItemProps> = ({
  ordinal,
  user,
}) => {
  const currentUserId = useAppSelector(selectCurrentUserId)

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <li className={styles.list_item_wrapper}>
      <div
        className={`${styles.list_item} ${
          user.id === currentUserId ? styles.accent : ''
        }`}>
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
        <span className={styles.user_name}>
          {user[FormInputNames.DISPLAY_NAME] || 'Неизвестный игрок'}
        </span>
        {isMounted && (
          <span className={styles.score}>
            {user.best_score.toLocaleString() || 0}
          </span>
        )}
      </div>
      <hr />
    </li>
  )
}
