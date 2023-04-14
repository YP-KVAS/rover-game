import styles from './ForumCategory.module.scss'
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
    <Link className={styles.category} to={`${RoutesEnum.FORUM}/${id}`}>
      <span>{name}</span>
      <span>{topic_count || 0}</span>
    </Link>
  )
}
