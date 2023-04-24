import styles from './Forum.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { IForumCategory } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectForumLastTouchedCategoryId } from '../../store/selectors/forum-selector'
import { EditForumCategoryName } from './EditForumItems/EditForumCategoryName'
import { clearUpdateCategoryState } from '../../store/slices/forum-slice'
import {
  onDeleteForumCategory,
  onGetForumCategories,
} from '../../store/thunks/forum-thunk'
import { selectUserRoleState } from '../../store/selectors/user-selector'

export const ForumCategory: FC<IForumCategory> = ({ id, name, topicCount }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector(selectUserRoleState)
  const lastTouchedCategoryId = useAppSelector(selectForumLastTouchedCategoryId)

  const [editCategoryEnabled, setEditCategoryEnabled] = useState(false)
  const enableCategoryEdit = () => setEditCategoryEnabled(true)
  const hideCategoryEditInput = () => {
    setEditCategoryEnabled(false)
    dispatch(clearUpdateCategoryState())
  }

  useEffect(() => {
    if (id === lastTouchedCategoryId) {
      ref.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [id, lastTouchedCategoryId])

  const handleCategoryDelete = () => {
    if (editCategoryEnabled) {
      hideCategoryEditInput()
    }

    dispatch(onDeleteForumCategory(id)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumCategories())
      }
    })
  }

  return (
    <div className={styles.category} ref={ref}>
      <div className={styles.link_wrapper}>
        <Link className={styles.link} to={`${RoutesEnum.FORUM}/${id}`}>
          <span className={styles.name}>{name}</span>
          <span>{topicCount || 0}</span>
        </Link>
        {editCategoryEnabled && (
          <EditForumCategoryName
            handleFormReset={hideCategoryEditInput}
            id={id}
            currentName={name}
          />
        )}
      </div>
      {userRole === UserRolesEnum.ADMIN && (
        <div className={styles.svg_icons}>
          <svg className={styles.svg_icon} onClick={enableCategoryEdit}>
            <use xlinkHref="./images/icons-sprite.svg#edit"></use>
          </svg>
          <svg className={styles.svg_icon} onClick={handleCategoryDelete}>
            <use xlinkHref="./images/icons-sprite.svg#delete"></use>
          </svg>
        </div>
      )}
    </div>
  )
}
