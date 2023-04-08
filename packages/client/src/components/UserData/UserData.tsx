import { FC, useEffect, useState } from 'react'
import styles from '../../common-styles/UserSettings.module.scss'
import formStyles from '../../common-styles/Form.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { User, UserSettings } from '../../utils/types/user'
import {
  selectChangeSettingsState,
  selectCurrentUser,
} from '../../store/selectors/user-selector'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { changeUserProfileDataValidationSchema } from '../../utils/validation'
import { onProfileSettingsChange } from '../../store/thunks/user-thunk'
import { Loader } from '../Loader/Loader'
import { Form } from '../Form/Form'
import { EditableTitle } from '../EditableTitle/EditableTitle'
import { USER_SETTINGS_FORM_INPUTS } from '../../utils/const-variables/forms'
import { FormInput } from '../FormInput/FormInput'
import { Button } from '../Button/Button'
import { clearChangeSettingsError } from '../../store/slices/user-slice'

export const UserData: FC = () => {
  const dispatch = useAppDispatch()

  const currentUser: User | null = useAppSelector(selectCurrentUser)
  let userData: UserSettings | null = null
  if (currentUser) {
    const { id = null, avatar = null, ...rest } = currentUser
    userData = rest
  }
  const { isLoading, errorMessage } = useAppSelector(selectChangeSettingsState)

  const [editDisabled, setEditDisabled] = useState(true)
  const enableEdit = () => setEditDisabled(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserSettings>({
    resolver: yupResolver(changeUserProfileDataValidationSchema),
    values: userData || undefined,
  })

  const handleFormSubmit = handleSubmit(data => {
    if (JSON.stringify(data) !== JSON.stringify(userData)) {
      dispatch(onProfileSettingsChange(data)).then(data => {
        if (data.type.endsWith('fulfilled')) {
          setEditDisabled(true)
        }
      })
    } else {
      setEditDisabled(true)
    }
  })

  const handleFormReset = () => {
    setEditDisabled(true)
    if (errorMessage) {
      dispatch(clearChangeSettingsError())
    }
  }

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearChangeSettingsError())
      }
    }
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <div className={styles.user_settings}>
      <EditableTitle title={'Данные профиля'} enableEditHandler={enableEdit} />
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        <>
          {USER_SETTINGS_FORM_INPUTS.map(input => (
            <FormInput
              key={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              disabled={editDisabled}
              defaultValue={currentUser?.[input.name] as string}
              registerObj={{ ...register(input.name) }}
              errorMsg={errors[input.name]?.message}
            />
          ))}
        </>
        <>
          {!editDisabled && (
            <div className={formStyles.form_actions}>
              <Button htmlType="submit" type="primary">
                Сохранить изменения
              </Button>
              <Button htmlType="reset" type="secondary">
                Отменить
              </Button>
            </div>
          )}
          {errorMessage && (
            <p className={formStyles.form_error_message}>{errorMessage}</p>
          )}
        </>
      </Form>
    </div>
  )
}
