import styles from './Forum.module.scss'
import { FC, useEffect, useRef } from 'react'
import { IForumTopic } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectForumLastTouchedTopicId,
  selectForumTopicSearchQuery,
  selectForumTopicsByCategoryId,
} from '../../store/selectors/forum-selector'
import { useIsIntersecting } from '../../hooks/useIsIntersecting'
import { onGetForumTopics } from '../../store/thunks/forum-thunk'
import { TOPICS_LOAD_LIMIT } from '../../utils/const-variables/api'

export const ForumTopic: FC<IForumTopic & { index: number }> = ({
  id,
  name,
  createdAt,
  categoryId,
  index,
}) => {
  const dispatch = useAppDispatch()
  const ref = useRef<HTMLAnchorElement | null>(null)
  const lastTouchedTopicId = useAppSelector(selectForumLastTouchedTopicId)
  const topics = useAppSelector(state =>
    selectForumTopicsByCategoryId(state, categoryId)
  )
  const topicsLength = topics?.topicItems?.length
  const searchQuery = useAppSelector(selectForumTopicSearchQuery)

  const isIntersecting = useIsIntersecting(ref)

  useEffect(() => {
    if (id === lastTouchedTopicId) {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, lastTouchedTopicId])

  useEffect(() => {
    if (
      topicsLength &&
      index === topicsLength - 1 &&
      isIntersecting &&
      topicsLength >= TOPICS_LOAD_LIMIT &&
      !topics.isLoading
    ) {
      dispatch(
        onGetForumTopics({
          categoryId,
          offset: index + 1,
          search: searchQuery || '',
        })
      )
    }
  }, [index, topicsLength, isIntersecting])

  return (
    <Link
      ref={ref}
      className={styles.link}
      to={`${RoutesEnum.FORUM}/${categoryId}/${id}?page=1`}>
      <span className={styles.name}>{name}</span>
      <span>{new Date(createdAt).toLocaleDateString()}</span>
    </Link>
  )
}
