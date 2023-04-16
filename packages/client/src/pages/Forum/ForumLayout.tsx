import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { Title } from '../../components/Title/Title'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectForumCategories } from '../../store/selectors/forum-selector'
import { onGetForumCategories } from '../../store/thunks/forum-thunk'

export const ForumLayout: FC = () => {
  const dispatch = useAppDispatch()
  const { categoryItems } = useAppSelector(selectForumCategories)

  useEffect(() => {
    if (!categoryItems) {
      dispatch(onGetForumCategories())
    }
  }, [dispatch, categoryItems])

  return (
    <div className={styles.forum}>
      <Title text="Форум" />
      <Outlet />
    </div>
  )
}
