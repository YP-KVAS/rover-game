import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectCategoryNameById,
  selectForumTopics,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { ForumTopic } from '../../components/Forum/ForumTopic'
import { onGetForumTopics } from '../../store/thunks/forum-thunk'
import { AddForumTopic } from '../../components/Forum/AddForumTopic'

export const ForumTopics: FC = () => {
  const { categoryId = -1 } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId !== -1) {
      dispatch(onGetForumTopics(+categoryId))
    }
  }, [dispatch, categoryId])

  const categoryName = useAppSelector(state =>
    selectCategoryNameById(state, +categoryId)
  )
  const { isLoading, errorMessage, topicItems } =
    useAppSelector(selectForumTopics)

  return isLoading ? (
    <Loader />
  ) : errorMessage ? (
    <strong className={styles.message}>{errorMessage}</strong>
  ) : (
    <div className={styles.topics}>
      {!topicItems || topicItems.length === 0 ? (
        <strong className={styles.message}>
          В данной категории еще нет топиков. <br />
          Самое время создать первую тему.
        </strong>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Темы категории "{categoryName || 'Без названия'}"</h3>
            <h3>Дата</h3>
          </div>
          <hr />
          <ul className={styles.list}>
            {topicItems.map(topic => (
              <li key={topic.id}>
                <ForumTopic {...topic} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <AddForumTopic />
    </div>
  )
}
