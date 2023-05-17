import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectAddForumCategoryState,
  selectForumCategories,
  selectGetForumCategoriesState,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { ForumCategory } from '../../components/Forum/ForumCategory'
import { Title } from '../../components/Title/Title'
import { AddForumCategory } from '../../components/Forum/AddForumItems/AddForumCategory'
import { onGetForumCategories } from '../../store/thunks/forum-thunk'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { selectCurrentUser } from '../../store/selectors/user-selector'
import { clearForumCategoriesState } from '../../store/slices/forum-slice'

export const ForumCategories: FC = () => {
  const dispatch = useAppDispatch()
  const categoryItems = useAppSelector(selectForumCategories)
  const { isLoading, errorMessage } = useAppSelector(
    selectGetForumCategoriesState
  )
  const { isLoading: addCategoryLoading } = useAppSelector(
    selectAddForumCategoryState
  )
  const user = useAppSelector(selectCurrentUser)

  useEffect(() => {
    dispatch(onGetForumCategories())

    return () => {
      dispatch(clearForumCategoriesState())
    }
  }, [dispatch])

  return isLoading && !categoryItems ? (
    <Loader />
  ) : errorMessage ? (
    <strong className={styles.message}>{errorMessage}</strong>
  ) : !categoryItems || categoryItems.length === 0 ? (
    <>
      <strong className={styles.message}>
        В настоящий момент на сайте ведутся технические работы. <br />
        Форум совсем скоро будет доступен.
      </strong>
      {user?.role === UserRolesEnum.ADMIN && <AddForumCategory />}
    </>
  ) : (
    <div className={styles.area}>
      <Title text="Выбор категории" />
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h3>Категория</h3>
          <h3>{user?.role === UserRolesEnum.ADMIN ? 'Действия' : 'Топики'}</h3>
        </div>
        <hr />
        {(addCategoryLoading || isLoading) && <Loader />}
        <ul className={styles.list}>
          {categoryItems.map(category => (
            <li key={category.id}>
              <ForumCategory {...category} />
            </li>
          ))}
        </ul>
      </div>
      {user?.role === UserRolesEnum.ADMIN && <AddForumCategory />}
    </div>
  )
}
