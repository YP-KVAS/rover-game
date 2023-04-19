import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectTopicState,
  selectCategoryNameById,
  selectForumTopicsByCategoryId,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { ForumTopic } from '../../components/Forum/ForumTopic'
import { onGetForumTopics } from '../../store/thunks/forum-thunk'
import { AddForumTopic } from '../../components/Forum/AddForumItems/AddForumTopic'
import { Page404 } from '../Page404'
import { RoutesEnum } from '../../utils/const-variables/routes'

export const ForumTopics: FC = () => {
  const { categoryId = -1 } = useParams()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (categoryId !== -1) {
      dispatch(onGetForumTopics(+categoryId))
    }
  }, [dispatch, categoryId])

  const category = useAppSelector(state =>
    selectCategoryNameById(state, +categoryId)
  )
  const topics = useAppSelector(state =>
    selectForumTopicsByCategoryId(state, +categoryId)
  )
  const { isLoading: addTopicLoading } = useAppSelector(selectTopicState)

  return topics?.isLoading && !topics?.topicItems ? (
    <Loader />
  ) : topics?.errorMessage ? (
    <strong className={styles.message}>{topics.errorMessage}</strong>
  ) : !category ? (
    <Page404 />
  ) : (
    <div className={styles.area}>
      {!topics?.topicItems || topics.topicItems.length === 0 ? (
        <strong className={styles.message}>
          В данной категории еще нет топиков. <br />
          Самое время создать первую тему.
        </strong>
      ) : (
        <>
          <Link className={styles.link} to={RoutesEnum.FORUM}>
            Вернуться к выбору категории
          </Link>
          <div className={styles.wrapper}>
            <div className={styles.header}>
              <h3>Темы категории "{category.name || 'Без названия'}"</h3>
              <h3>Дата</h3>
            </div>
            <hr />
            {(addTopicLoading || topics?.isLoading) && <Loader />}
            <ul className={styles.list}>
              {topics?.topicItems.map(topic => (
                <li key={topic.id}>
                  <ForumTopic {...topic} />
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
      <AddForumTopic />
    </div>
  )
}
