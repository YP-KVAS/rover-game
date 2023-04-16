import styles from './Forum.module.scss'
import { FC } from 'react'
import { IForumTopic } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'

export const ForumTopic: FC<IForumTopic> = ({
  id,
  topic_name,
  date,
  category_id,
}) => {
  return (
    <Link
      className={styles.link}
      to={`${RoutesEnum.FORUM}/${category_id}/${id}`}>
      <span className={styles.name}>{topic_name}</span>
      <span>{new Date(date).toLocaleDateString()}</span>
    </Link>
  )
}
