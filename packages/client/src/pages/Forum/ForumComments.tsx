import styles from './Forum.module.scss'
import { FC, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  onDeleteForumTopic,
  onGetForumComments,
  onGetForumTopics,
} from '../../store/thunks/forum-thunk'
import {
  selectForumCommentsByParentId,
  selectForumDeleteTopicState,
  selectForumTopicById,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ForumComment } from '../../components/Forum/ForumComment'
import {
  clearForumComments,
  clearTopicInfoState,
} from '../../store/slices/forum-slice'
import { AddForumTopLevelComment } from '../../components/Forum/AddForumItems/AddForumTopLevelComment'
import { Page404 } from '../Page404'
import { selectCurrentUserId } from '../../store/selectors/user-selector'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { EditForumTopicName } from '../../components/Forum/EditForumItems/EditForumTopicName'
import { Title } from '../../components/Title/Title'

export const ForumComments: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { categoryId = -1, topicId = -1 } = useParams()

  const [topicEditEnabled, setTopicEditEnabled] = useState(false)
  const enableTopicEdit = () => setTopicEditEnabled(true)
  const hideTopicEdit = () => setTopicEditEnabled(false)

  const { isLoading, errorMessage, commentItems } = useAppSelector(
    state => selectForumCommentsByParentId(state, 0) || {}
  )
  const topic = useAppSelector(state =>
    selectForumTopicById(state, +categoryId, +topicId)
  )
  const userId = useAppSelector(selectCurrentUserId)
  const { errorMessage: deleteErrorMessage } = useAppSelector(
    selectForumDeleteTopicState
  )

  useEffect(() => {
    if (!topic) {
      dispatch(onGetForumTopics(+categoryId))
    }
    dispatch(onGetForumComments(null))

    return () => {
      dispatch(clearForumComments())
      dispatch(clearTopicInfoState())
    }
  }, [dispatch, topic?.id])

  const handleTopicDelete = () => {
    dispatch(onDeleteForumTopic()).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumTopics(+categoryId))
        navigate(
          RoutesEnum.FORUM_CATEGORY.replace(
            ':categoryId',
            categoryId.toString()
          )
        )
      }
    })
  }

  return isLoading && !commentItems ? (
    <Loader />
  ) : errorMessage ? (
    <strong className={styles.message}>{errorMessage}</strong>
  ) : !topic ? (
    <Page404 />
  ) : (
    <div className={styles.area}>
      <Title text="Просмотр комментариев" />
      <Link
        className={styles.link}
        to={RoutesEnum.FORUM_CATEGORY.replace(
          ':categoryId',
          categoryId.toString()
        )}>
        Вернуться к выбору темы
      </Link>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3 style={{ wordBreak: 'break-word' }}>
            Комментарии к теме "{topic.topic_name || 'Без названия'}"
          </h3>
          {topic.user_id === userId && (
            <div className={styles.svg_icons}>
              <svg className={styles.svg_icon} onClick={enableTopicEdit}>
                <use xlinkHref="./images/icons-sprite.svg#edit"></use>
              </svg>
              <svg className={styles.svg_icon} onClick={handleTopicDelete}>
                <use xlinkHref="./images/icons-sprite.svg#delete"></use>
              </svg>
            </div>
          )}
        </div>
        {topicEditEnabled && (
          <EditForumTopicName
            handleFormReset={hideTopicEdit}
            currentTopicName={topic.topic_name}
          />
        )}
        {deleteErrorMessage && (
          <span className={styles.error}>{deleteErrorMessage}</span>
        )}
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
