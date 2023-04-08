import { FC, useEffect, useState } from 'react'
import styles from './UserAvatar.module.scss'
import userStyles from '../../common-styles/UserSettings.module.scss'
import formStyles from '../../common-styles/Form.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  selectChangeAvatarState,
  selectCurrentUserAvatar,
} from '../../store/selectors/user-selector'
import { Loader } from '../Loader/Loader'
import { EditableTitle } from '../EditableTitle/EditableTitle'
import { Form } from '../Form/Form'
import { useForm } from 'react-hook-form'
import { FormInputNames } from '../../utils/types/forms'
import { onAvatarChange } from '../../store/thunks/user-thunk'
import { BASE_URL, RESOURCES_API_URL } from '../../utils/const-variables/api'
import { FormInput } from '../FormInput/FormInput'
import { Button } from '../Button/Button'
import { clearChangeAvatarError } from '../../store/slices/user-slice'

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
    <div className={userStyles.user_settings}>
      <EditableTitle title={'Аватар'} enableEditHandler={enableEdit} />
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <img
          alt={'avatar'}
          className={styles.avatar}
          src={
            avatarPath
              ? `${BASE_URL}${RESOURCES_API_URL}${avatarPath}`
              : './images/user/empty-avatar.webp'
          }
        />
        <>
          {!editDisabled && (
            <>
              <FormInput
                type="file"
                disabled={editDisabled}
                accept={'image/*'}
                registerObj={{ ...register('avatar') }}
                errorMsg={avatarError}
              />
              <div className={formStyles.form_actions}>
                <Button htmlType="submit" type="primary">
                  Сохранить изменения
                </Button>
                <Button htmlType="reset" type="secondary">
                  Отменить
                </Button>
              </div>
              {errorMessage && (
                <p className={formStyles.form_error_message}>{errorMessage}</p>
              )}
            </>
          )}
        </>
      </Form>
    </div>
  )
}
