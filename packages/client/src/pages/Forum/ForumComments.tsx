import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  onGetForumComments,
  onGetForumTopics,
} from '../../store/thunks/forum-thunk'
import {
  selectForumCommentsByParentId,
  selectForumTopicById,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { useParams } from 'react-router-dom'
import { ForumComment } from '../../components/Forum/ForumComment'
import { clearForumComments } from '../../store/slices/forum-slice'
import { AddForumTopLevelComment } from '../../components/Forum/AddForumItems/AddForumTopLevelComment'
import { Page404 } from '../Page404'

export const ForumComments: FC = () => {
  const dispatch = useAppDispatch()
  const { categoryId = -1, topicId = -1 } = useParams()

  const { isLoading, errorMessage, commentItems } = useAppSelector(
    state => selectForumCommentsByParentId(state, 0) || {}
  )
  const topic = useAppSelector(state =>
    selectForumTopicById(state, +categoryId, +topicId)
  )

  useEffect(() => {
    if (!topic) {
      dispatch(onGetForumTopics(+categoryId))
    }
    dispatch(onGetForumComments(null))

    return () => {
      dispatch(clearForumComments())
    }
  }, [dispatch])

  return isLoading && !commentItems ? (
    <Loader />
  ) : errorMessage ? (
    <strong className={styles.message}>{errorMessage}</strong>
  ) : !topic ? (
    <Page404 />
  ) : (
    <div className={styles.area}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Комментарии к теме "{topic.topic_name || 'Без названия'}"</h3>
        </div>
        <hr />
        {isLoading && <Loader />}
        <ul className={styles.list}>
          {commentItems?.map(comment => (
            <li key={comment.id} className={styles.list_item}>
              <ForumComment {...comment} />
            </li>
          ))}
        </ul>
      </div>
      <AddForumTopLevelComment />
    </div>
  )
}
