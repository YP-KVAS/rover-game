import styles from './Forum.module.scss'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/useStore'
import { selectForumCategories } from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { ForumCategory } from '../../components/Forum/ForumCategory'

export const ForumCategories: FC = () => {
  const { isLoading, errorMessage, categoryItems } = useAppSelector(
    selectForumCategories
  )

  return isLoading ? (
    <Loader />
  ) : errorMessage ? (
    <strong className={styles.message}>{errorMessage}</strong>
  ) : !categoryItems || categoryItems.length === 0 ? (
    <strong className={styles.message}>
      В настоящий момент на сайте ведутся технические работы. <br />
      Форум совсем скоро будет доступен.
    </strong>
  ) : (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>Категория</h3>
        <h3>Топики</h3>
      </div>
      <hr />
      <ul className={styles.list}>
        {categoryItems.map(category => (
          <li key={category.id}>
            <ForumCategory {...category} />
          </li>
        ))}
      </ul>
    </div>
  )
}
