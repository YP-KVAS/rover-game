import styles from './Forum.module.scss'
import { FC } from 'react'
import { IForumCategory } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'

export const ForumCategory: FC<IForumCategory> = ({
  id,
  name,
  topic_count,
}) => {
  return (
    <Link className={styles.link} to={`${RoutesEnum.FORUM}/${id}`}>
      <span className={styles.name}>{name}</span>
      <span>{topic_count || 0}</span>
    </Link>
  )
}
