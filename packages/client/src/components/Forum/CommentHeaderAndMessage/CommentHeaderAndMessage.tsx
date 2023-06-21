import styles from './CommentHeaderAndMessage.module.scss'
import { FC, useEffect, useState } from 'react'
import {
  BASE_YA_URL,
  RESOURCES_API_URL,
} from '../../../utils/const-variables/api'
import { getSanitizedHtmlString } from '../../../utils/sanitizeHtml'

interface CommentHeaderAndMessageProps {
  avatarPath?: string | null
  displayName?: string | null
  htmlMessage?: string | null
  messageDate: number
}

export const CommentHeaderAndMessage: FC<CommentHeaderAndMessageProps> = ({
  avatarPath,
  displayName,
  htmlMessage,
  messageDate,
}) => {
  const sanitizedMessage = () => ({
    __html: getSanitizedHtmlString(htmlMessage || ''),
  })

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

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
          {isMounted && <span>{new Date(messageDate).toLocaleString()}</span>}
        </div>
      </div>
      {isMounted && htmlMessage ? (
        <p
          className={styles.comment_message}
          dangerouslySetInnerHTML={sanitizedMessage()}></p>
      ) : (
        <p className={styles.deleted_comment}>Комментарий был удален.</p>
      )}
    </div>
  )
}
