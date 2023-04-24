import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectForumCategories,
  selectGetForumCategoriesState,
} from '../../store/selectors/forum-selector'
import { onGetForumCategories } from '../../store/thunks/forum-thunk'
import RequireAuth from '../../hocs/requireAuth'
import { EnumPages } from '../../utils/const-variables/pages'
import { clearGetCategoriesState } from '../../store/slices/forum-slice'

const ForumLayout: FC = () => {
  const dispatch = useAppDispatch()
  const categoryItems = useAppSelector(selectForumCategories)
  const { isLoading, errorMessage } = useAppSelector(
    selectGetForumCategoriesState
  )

  useEffect(() => {
    if (!categoryItems && !isLoading && !errorMessage) {
      dispatch(onGetForumCategories())
    }
  }, [dispatch, isLoading, categoryItems, errorMessage])

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearGetCategoriesState())
      }
    }
  }, [dispatch])

  return (
    <div className={styles.forum}>
      <Outlet />
    </div>
  )
}

const ForumWithAuth: FC = RequireAuth(ForumLayout, EnumPages.FORUM)

export { ForumWithAuth as ForumLayout }
