import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectForumCategories } from '../../store/selectors/forum-selector'
import { onGetForumCategories } from '../../store/thunks/forum-thunk'
import { Loader } from '../../components/Loader/Loader'
import { Title } from '../../components/Title/Title'
import { ForumCategory } from '../../components/ForumCategory/ForumCategory'

export const Forum: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, errorMessage, categoryItems } = useAppSelector(
    selectForumCategories
  )

  useEffect(() => {
    if (!categoryItems) {
      dispatch(onGetForumCategories())
    }
  }, [dispatch, categoryItems])

  return (
    <div>
      <Title text="Форум" />
      {isLoading ? (
        <Loader />
      ) : errorMessage ? (
        <strong className={styles.message}>{errorMessage}</strong>
      ) : !categoryItems || categoryItems.length === 0 ? (
        <strong className={styles.message}>
          В настоящий момент на сайте ведутся технические работы. <br />
          Форум совсем скоро будет доступен.
        </strong>
      ) : (
        <div className={styles.categories_wrapper}>
          <div className={styles.categories_header}>
            <h3>Категория</h3>
            <h3>Топики</h3>
          </div>
          <hr />
          <ul className={styles.categories_list}>
            {categoryItems.map(category => (
              <li key={category.id}>
                <ForumCategory {...category} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
