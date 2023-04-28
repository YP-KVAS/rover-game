import styles from './CommentHeaderAndMessage.module.scss'
import { FC } from 'react'
import {
  BASE_YA_URL,
  RESOURCES_API_URL,
} from '../../../utils/const-variables/api'

interface CommentHeaderAndMessageProps {
  avatarPath?: string | null
  displayName?: string | null
  messageText?: string | null
  messageDate: string
}

export const CommentHeaderAndMessage: FC<CommentHeaderAndMessageProps> = ({
  avatarPath,
  displayName,
  messageText,
  messageDate,
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.comment_header}>
        <img
          alt={'avatar'}
          className={styles.avatar}
          src={
            avatarPath
              ? `${BASE_YA_URL}${RESOURCES_API_URL}${avatarPath}`
              : './images/user/empty-avatar.webp'
          }
        />
        <div className={styles.comment_user}>
          <span>{displayName || 'Неизвестный пользователь'}</span>
          <span>{new Date(messageDate).toLocaleString()}</span>
        </div>
      </div>
      <p
        className={
          messageText ? styles.comment_message : styles.deleted_comment
        }>
        {messageText || 'Комментарий был удален.'}
      </p>
    </div>
  )
}
