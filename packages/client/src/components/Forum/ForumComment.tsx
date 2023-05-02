import styles from './Forum.module.scss'
import { FC, useEffect, useState } from 'react'
import { IForumComment } from '../../utils/types/forum'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectUserStateById } from '../../store/selectors/user-selector'
import { onGetUserById } from '../../store/thunks/user-thunk'
import { onGetForumComments } from '../../store/thunks/forum-thunk'
import { selectForumCommentsByParentId } from '../../store/selectors/forum-selector'
import { Loader } from '../Loader/Loader'
import { CommentHeaderAndMessage } from './CommentHeaderAndMessage/CommentHeaderAndMessage'
import { CommentActions } from './CommentActions/CommentActions'
import { useIntegerParams } from '../../hooks/useIntegerParams'

export const ForumComment: FC<IForumComment> = ({
  id,
  parentCommentId,
  userId,
  createdAt,
  message,
  replyCount,
}) => {
  const dispatch = useAppDispatch()
  const topicId = useIntegerParams('topicId')

  const commentUserWithState = useAppSelector(state =>
    selectUserStateById(state, userId)
  )

  useEffect(() => {
    if (!commentUserWithState) {
      dispatch(onGetUserById(userId))
    }
  }, [dispatch, userId])

  const [repliesDisplayed, setRepliesDisplayed] = useState(false)

  const loadReplies = () => {
    dispatch(onGetForumComments({ parentCommentId: id, topicId })).then(res => {
      if (res.type.endsWith('fulfilled')) {
        setRepliesDisplayed(true)
      }
    })
  }

  const commentInfo = useAppSelector(state =>
    selectForumCommentsByParentId(state, id)
  )

  return (
    <div className={styles.comment}>
      <CommentHeaderAndMessage
        avatarPath={commentUserWithState?.user?.avatar}
        displayName={commentUserWithState?.user?.display_name}
        htmlMessage={message}
        messageDate={createdAt}
      />
      <CommentActions
        message={message}
        commentId={id}
        parentCommentId={parentCommentId}
        userId={userId}
        loadReplies={loadReplies}
      />
      {replyCount > 0 &&
        !repliesDisplayed &&
        (commentInfo?.isLoading ? (
          <Loader />
        ) : (
          <span className={styles.load_comments} onClick={loadReplies}>
            Загрузить комментарии ({replyCount})
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
