import { FC, useEffect, useState } from 'react'
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
import { USER_SETTINGS_FORM_INPUTS } from '../../utils/const-variables/forms'
import { FormInput } from '../FormInput/FormInput'
import { clearChangeSettingsError } from '../../store/slices/user-slice'
import { FormWithEdit } from '../FormWithEdit/FormWithEdit'

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
    <FormWithEdit
      title="Данные профиля"
      editDisabled={editDisabled}
      enableEdit={enableEdit}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={errorMessage}>
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
    </FormWithEdit>
  )
}
