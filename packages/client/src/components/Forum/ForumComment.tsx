import styles from './Forum.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { IForumComment } from '../../utils/types/forum'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectCurrentUser,
  selectUserById,
} from '../../store/selectors/user-selector'
import { onGetUserById } from '../../store/thunks/user-thunk'
import { BASE_YA_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'
import { FormInputNames } from '../../utils/types/forms'
import { AddForumComment } from './AddForumItems/AddForumComment'
import {
  onDeleteForumComment,
  onGetForumComments,
} from '../../store/thunks/forum-thunk'
import {
  selectForumAddGetCommentsStateByParentId,
  selectForumCommentsByParentId,
  selectForumDeleteCommentsStateById,
  selectForumLastTouchedCommentId,
} from '../../store/selectors/forum-selector'
import { Loader } from '../Loader/Loader'
import {
  clearAddCommentErrorState,
  clearUpdateCommentErrorState,
} from '../../store/slices/forum-slice'
import { EditForumComment } from './EditForumItems/EditForumComment'

export const ForumComment: FC<IForumComment> = ({
  id,
  parent_comment_id,
  user_id,
  date,
  message,
  reply_count,
}) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => selectUserById(state, user_id))
  const currentUser = useAppSelector(selectCurrentUser)
  const addCommentState = useAppSelector(state =>
    selectForumAddGetCommentsStateByParentId(state, id || 0)
  )
  const deleteCommentState = useAppSelector(state =>
    selectForumDeleteCommentsStateById(state, id)
  )
  const lastAddedCommentId = useAppSelector(selectForumLastTouchedCommentId)

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

  const [addCommentEnabled, setAddCommentEnabled] = useState(false)
  const [editCommentEnabled, setEditCommentEnabled] = useState(false)
  const [repliesDisplayed, setRepliesDisplayed] = useState(false)

  const hideCommentInput = () => {
    setAddCommentEnabled(false)
    dispatch(clearAddCommentErrorState(id))
  }
  const hideCommentEditInput = () => {
    setEditCommentEnabled(false)
    dispatch(clearUpdateCommentErrorState(id))
  }

  const handleCommentReplyClick = () => {
    if (editCommentEnabled) {
      hideCommentEditInput()
    }
    setAddCommentEnabled(true)
  }

  const handleCommentEditClick = () => {
    if (addCommentEnabled) {
      hideCommentInput()
    }
    setEditCommentEnabled(true)
  }

  const handleCommentDelete = () => {
    if (addCommentEnabled) {
      hideCommentInput()
    }
    if (editCommentEnabled) {
      hideCommentEditInput()
    }

    dispatch(onDeleteForumComment(id)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumComments(parent_comment_id))
      }
    })
  }

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
              ? `${BASE_YA_URL}${RESOURCES_API_URL}${
                  user[FormInputNames.AVATAR]
                }`
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
        <p className={styles.comment_message}>{message}</p>
      ) : (
        <p className={styles.deleted_comment}>Комментарий был удален.</p>
      )}
      <div className={styles.actions}>
        {message && (
          <>
            <svg className={styles.svg_icon} onClick={handleCommentReplyClick}>
              <use xlinkHref="./images/icons-sprite.svg#reply"></use>
            </svg>
            {user?.id === currentUser?.id && (
              <>
                <svg
                  className={styles.svg_icon}
                  onClick={handleCommentEditClick}>
                  <use xlinkHref="./images/icons-sprite.svg#edit"></use>
                </svg>
                <svg className={styles.svg_icon} onClick={handleCommentDelete}>
                  <use xlinkHref="./images/icons-sprite.svg#delete"></use>
                </svg>
              </>
            )}
          </>
        )}
        {deleteCommentState?.isLoading && <Loader />}
        {deleteCommentState?.errorMessage && (
          <p className={styles.form_error}>{deleteCommentState.errorMessage}</p>
        )}
      </div>
      {editCommentEnabled && (
        <EditForumComment
          commentId={id}
          parentCommentId={parent_comment_id}
          message={message || ''}
          handleFormReset={hideCommentEditInput}
        />
      )}
      {addCommentEnabled && (
        <div className={styles.new_comment}>
          <AddForumComment
            handleFormReset={hideCommentInput}
            onCommentAdded={loadReplies}
            parent_comment_id={id}
            errorMessage={addCommentState?.errorMessage || null}
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
