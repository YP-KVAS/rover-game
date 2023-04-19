import styles from './Forum.module.scss'
import { FC, useEffect, useRef } from 'react'
import { IForumTopic } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { useAppSelector } from '../../hooks/useStore'
import { selectLastAddedTopicState } from '../../store/selectors/forum-selector'

export const ForumTopic: FC<IForumTopic> = ({
  id,
  topic_name,
  date,
  category_id,
}) => {
  const ref = useRef<HTMLAnchorElement | null>(null)
  const { lastAddedTopicId } = useAppSelector(selectLastAddedTopicState)

  useEffect(() => {
    if (id === lastAddedTopicId) {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, lastAddedTopicId])

  return (
    <Link
      ref={ref}
      className={styles.link}
      to={`${RoutesEnum.FORUM}/${category_id}/${id}`}>
      <span className={styles.name}>{topic_name}</span>
      <span>{new Date(date).toLocaleDateString()}</span>
    </Link>
  )
}
