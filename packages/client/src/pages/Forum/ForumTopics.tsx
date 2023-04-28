import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectCategoryNameById,
  selectForumAddTopicState,
  selectForumTopicsByCategoryId,
  selectForumTopicSearchQuery,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { ForumTopic } from '../../components/Forum/ForumTopic'
import { onGetForumTopics } from '../../store/thunks/forum-thunk'
import { AddForumTopic } from '../../components/Forum/AddForumItems/AddForumTopic'
import { Page404 } from '../Page404'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { Title } from '../../components/Title/Title'
import { SearchTopicItems } from '../../components/Forum/SearchForumItems/SearchTopicItems'
import { clearTopicInfoState } from '../../store/slices/forum-slice'
import { useIntegerParams } from '../../hooks/useIntegerParams'

export const ForumTopics: FC = () => {
  const categoryId = useIntegerParams('categoryId')
  const dispatch = useAppDispatch()

  const category = useAppSelector(state =>
    selectCategoryNameById(state, categoryId)
  )
  const topics = useAppSelector(state =>
    selectForumTopicsByCategoryId(state, categoryId)
  )
  const { isLoading: addTopicLoading } = useAppSelector(
    selectForumAddTopicState
  )
  const searchQuery = useAppSelector(selectForumTopicSearchQuery)

  useEffect(() => {
    if (categoryId !== -1 && !topics?.isLoading) {
      dispatch(onGetForumTopics({ categoryId, search: searchQuery || '' }))
    }
  }, [dispatch, categoryId])

  useEffect(() => {
    return () => {
      dispatch(clearTopicInfoState())
    }
  }, [dispatch])

  return topics?.isLoading && !topics?.topicItems ? (
    <Loader />
  ) : topics?.errorMessage ? (
    <strong className={styles.message}>{topics.errorMessage}</strong>
  ) : !category ? (
    <Page404 />
  ) : (
    <div className={styles.area}>
      <Title text="Выбор темы" />
      <div className={styles.actions}>
        <Link className={styles.link} to={RoutesEnum.FORUM}>
          Вернуться к выбору категории
        </Link>
        {((topics?.topicItems && topics?.topicItems?.length > 0) ||
          searchQuery) && <SearchTopicItems categoryId={category.id} />}
      </div>
      {!topics?.topicItems ||
      (topics.topicItems.length === 0 && !searchQuery) ? (
        <strong className={styles.message}>
          В данной категории еще нет топиков. <br />
          Самое время создать первую тему.
        </strong>
      ) : (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <h3>Темы категории "{category.name || 'Без названия'}"</h3>
            <h3>Дата</h3>
          </div>
          <hr />
          {(addTopicLoading || topics?.isLoading) && <Loader />}
          {searchQuery &&
            (!topics?.topicItems || topics.topicItems.length === 0) && (
              <p>По заданному критерию темы не найдены</p>
            )}
          <ul className={styles.list}>
            {topics?.topicItems.map((topic, idx) => (
              <li key={topic.id}>
                <ForumTopic {...topic} index={idx} />
              </li>
            ))}
          </ul>
        </div>
      )}
      <AddForumTopic />
    </div>
  )
}
