import styles from './Forum.module.scss'
import { FC, useState } from 'react'
import { IForumCommentWithAuthor } from '../../utils/types/forum'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { onGetForumComments } from '../../store/thunks/forum-thunk'
import { selectForumCommentsByParentId } from '../../store/selectors/forum-selector'
import { Loader } from '../Loader/Loader'
import { CommentHeaderAndMessage } from './CommentHeaderAndMessage/CommentHeaderAndMessage'
import { CommentActions } from './CommentActions/CommentActions'
import { useIntegerParams } from '../../hooks/useIntegerParams'

export const ForumComment: FC<IForumCommentWithAuthor> = ({
  id,
  parentCommentId,
  userId,
  author,
  createdAt,
  message,
  replyCount,
  emojiHappyFace,
  emojiSadFace,
  emojiAngryFace,
  emojiLike,
  emojiDislike,
}) => {
  const dispatch = useAppDispatch()
  const topicId = useIntegerParams('topicId')

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
        avatarPath={author.avatar}
        displayName={author.name}
        htmlMessage={message}
        messageDate={createdAt}
      />
      <CommentActions
        message={message}
        commentId={id}
        parentCommentId={parentCommentId}
        userId={userId}
        loadReplies={loadReplies}
        emojiHappyFace={emojiHappyFace}
        emojiSadFace={emojiSadFace}
        emojiAngryFace={emojiAngryFace}
        emojiLike={emojiLike}
        emojiDislike={emojiDislike}
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
