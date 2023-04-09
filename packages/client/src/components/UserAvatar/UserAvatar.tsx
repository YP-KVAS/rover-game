import { FC, useEffect, useState } from 'react'
import styles from './UserAvatar.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectChangeAvatarState,
  selectCurrentUserAvatar,
} from '../../store/selectors/user-selector'
import { Loader } from '../Loader/Loader'
import { useForm } from 'react-hook-form'
import { FormInputNames } from '../../utils/types/forms'
import { onAvatarChange } from '../../store/thunks/user-thunk'
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'
import { FormInput } from '../FormInput/FormInput'
import { clearChangeAvatarError } from '../../store/slices/user-slice'
import { FormWithEdit } from '../FormWithEdit/FormWithEdit'

export const UserAvatar: FC = () => {
  const dispatch = useAppDispatch()

  const avatarPath = useAppSelector(selectCurrentUserAvatar)
  const { isLoading, errorMessage } = useAppSelector(selectChangeAvatarState)

  const [editDisabled, setEditDisabled] = useState(true)
  const enableEdit = () => setEditDisabled(false)

  const { register, handleSubmit, reset } = useForm<{
    [FormInputNames.AVATAR]: FileList
  }>()

  const [avatarError, setAvatarError] = useState('')

  const handleFormSubmit = handleSubmit(data => {
    if (data[FormInputNames.AVATAR].length === 0) {
      setAvatarError('Выберите изображение')
    } else {
      dispatch(onAvatarChange(data[FormInputNames.AVATAR][0])).then(data => {
        if (data.type.endsWith('fulfilled')) {
          handleFormReset()
        }
      })
    }
  })

  const handleFormReset = () => {
    setEditDisabled(true)
    setAvatarError('')
    reset()
    if (errorMessage) {
      dispatch(clearChangeAvatarError())
    }
  }

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearChangeAvatarError())
      }
    }
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <FormWithEdit
      title="Аватар"
      editDisabled={editDisabled}
      enableEdit={enableEdit}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={errorMessage}>
      <>
        <img
          alt={'avatar'}
          className={styles.avatar}
          src={
            avatarPath
              ? `${BASE_URL}${RESOURCES_API_URL}${avatarPath}`
              : './images/user/empty-avatar.webp'
          }
        />
        {!editDisabled && (
          <FormInput
            type="file"
            disabled={editDisabled}
            accept={'image/*'}
            registerObj={{ ...register('avatar') }}
            errorMsg={avatarError}
          />
        )}
      </>
    </FormWithEdit>
  )
}
