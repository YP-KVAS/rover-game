import styles from './CommentHeaderAndMessage.module.scss'
import { FC } from 'react'
import {
  BASE_YA_URL,
  RESOURCES_API_URL,
} from '../../../utils/const-variables/api'
import sanitizeHtml from 'sanitize-html'

interface CommentHeaderAndMessageProps {
  avatarPath?: string | null
  displayName?: string | null
  htmlMessage?: string | null
  messageDate: string
}

export const CommentHeaderAndMessage: FC<CommentHeaderAndMessageProps> = ({
  avatarPath,
  displayName,
  htmlMessage,
  messageDate,
}) => {
  const sanitizedMessage = () => ({ __html: sanitizeHtml(htmlMessage || '') })

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
      {htmlMessage ? (
        <p
          className={styles.comment_message}
          dangerouslySetInnerHTML={sanitizedMessage()}></p>
      ) : (
        <p className={styles.deleted_comment}>Комментарий был удален.</p>
      )}
    </div>
  )
}
