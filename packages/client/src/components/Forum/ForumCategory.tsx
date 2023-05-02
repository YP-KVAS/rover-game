import styles from './Forum.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { IForumCategory } from '../../utils/types/forum'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectDeleteForumCategoryState,
  selectForumLastTouchedCategoryId,
} from '../../store/selectors/forum-selector'
import { EditForumCategoryName } from './EditForumItems/EditForumCategoryName'
import { clearUpdateCategoryState } from '../../store/slices/forum-slice'
import {
  onDeleteForumCategory,
  onGetForumCategories,
} from '../../store/thunks/forum-thunk'
import { selectUserRoleState } from '../../store/selectors/user-selector'
import { ConfirmModal } from '../Modal/ConfirmModal'
import { UpdateDeleteIcons } from './CrudIcons/UpdateDeleteIcons'

export const ForumCategory: FC<IForumCategory> = ({ id, name, topicCount }) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()
  const { userRole } = useAppSelector(selectUserRoleState)
  const lastTouchedCategoryId = useAppSelector(selectForumLastTouchedCategoryId)
  const deleteCategoryState = useAppSelector(state =>
    selectDeleteForumCategoryState(state, id)
  )

  const [modalIsOpened, setModalIsOpened] = useState(false)
  const openModal = () => setModalIsOpened(true)
  const closeModal = () => setModalIsOpened(false)

  const [editCategoryEnabled, setEditCategoryEnabled] = useState(false)
  const enableCategoryEdit = () => setEditCategoryEnabled(true)
  const hideCategoryEditInput = () => {
    setEditCategoryEnabled(false)
    dispatch(clearUpdateCategoryState(id))
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

    closeModal()

    dispatch(onDeleteForumCategory(id)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumCategories())
      }
    })
  }

  return (
    <>
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
          <UpdateDeleteIcons
            editHandler={enableCategoryEdit}
            deleteHandler={openModal}
          />
        )}
        {modalIsOpened && (
          <ConfirmModal
            confirmHandler={handleCategoryDelete}
            cancelHandler={closeModal}
            message={`Вы действительно хотите удалить категорию ${name} и входящие в неё
              темы?`}
          />
        )}
      </div>
      {deleteCategoryState?.errorMessage && (
        <p className={styles.form_error}>{deleteCategoryState.errorMessage}</p>
      )}
    </>
  )
}
