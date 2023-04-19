import styles from './Forum.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { IForumComment } from '../../utils/types/forum'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectCurrentUser,
  selectUserById,
} from '../../store/selectors/user-selector'
import { onGetUserById } from '../../store/thunks/user-thunk'
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'
import { FormInputNames } from '../../utils/types/forms'
import { AddForumComment } from './AddForumItems/AddForumComment'
import { onGetForumComments } from '../../store/thunks/forum-thunk'
import {
  selectForumCommentsByParentId,
  selectLastAddedCommentState,
} from '../../store/selectors/forum-selector'
import { Loader } from '../Loader/Loader'
import { clearLastAddedCommentError } from '../../store/slices/forum-slice'

export const ForumComment: FC<IForumComment> = ({
  id,
  user_id,
  date,
  message,
  reply_count,
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, user_id))
  const currentUser = useAppSelector(selectCurrentUser)
  const { errorMessage, lastAddedCommentId, lastAddedParentCommentId } =
    useAppSelector(selectLastAddedCommentState)
  const commentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!user) {
      dispatch(onGetUserById(user_id))
    }
  }, [dispatch, user])

  useEffect(() => {
    if (id === lastAddedCommentId) {
      commentRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, lastAddedCommentId])

  const [textAreaEnabled, setTextAreaEnabled] = useState(false)
  const [repliesDisplayed, setRepliesDisplayed] = useState(false)
  const hideCommentInput = () => {
    dispatch(clearLastAddedCommentError())
    setTextAreaEnabled(false)
  }

  const handleCommentReply = () => setTextAreaEnabled(true)
  const handleCommentEdit = () => setTextAreaEnabled(true)
  const handleCommentDelete = () => null

  const loadReplies = () => {
    dispatch(onGetForumComments(id)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        setRepliesDisplayed(true)
      }
    })
  }

  const commentInfo = useAppSelector(state =>
    selectForumCommentsByParentId(state, id)
  )

  return (
    <div className={styles.comment} ref={commentRef}>
      <div className={styles.comment_header}>
        <img
          alt={'avatar'}
          className={styles.avatar}
          src={
            user?.[FormInputNames.AVATAR]
              ? `${BASE_URL}${RESOURCES_API_URL}${user[FormInputNames.AVATAR]}`
              : './images/user/empty-avatar.webp'
          }
        />
        <div className={styles.comment_header_text}>
          <span>
            {user?.[FormInputNames.DISPLAY_NAME] || 'Неизвестный пользователь'}
          </span>
          <span>{new Date(date).toLocaleString()}</span>
        </div>
      </div>
      {message ? (
        <div>{message}</div>
      ) : (
        <p className={styles.deleted_comment}>Комментарий был удален.</p>
      )}
      <div className={styles.actions}>
        {message && (
          <svg className={styles.svg_icon} onClick={handleCommentReply}>
            <use xlinkHref="./images/icons-sprite.svg#reply"></use>
          </svg>
        )}
        {user?.id === currentUser?.id && (
          <svg className={styles.svg_icon} onClick={handleCommentEdit}>
            <use xlinkHref="./images/icons-sprite.svg#edit"></use>
          </svg>
        )}
        {user?.id === currentUser?.id && (
          <svg className={styles.svg_icon} onClick={handleCommentDelete}>
            <use xlinkHref="./images/icons-sprite.svg#delete"></use>
          </svg>
        )}
      </div>
      {textAreaEnabled && (
        <div className={styles.new_comment}>
          <AddForumComment
            handleFormReset={hideCommentInput}
            onCommentAdded={loadReplies}
            parent_comment_id={id}
            errorMessage={id === lastAddedParentCommentId ? errorMessage : null}
          />
        </div>
      )}
      {reply_count > 0 &&
        !repliesDisplayed &&
        (commentInfo?.isLoading ? (
          <Loader />
        ) : (
          <span className={styles.load_comments} onClick={loadReplies}>
            Загрузить комментарии ({reply_count})
          </span>
        ))}
      {repliesDisplayed && (
        <ul className={styles.inner_comments}>
          {commentInfo?.commentItems?.map(comment => (
            <li key={comment.id} className={styles.list_item}>
              <ForumComment {...comment} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
