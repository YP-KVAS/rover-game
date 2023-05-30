import { FC, useEffect, useState } from 'react'
import styles from './UserPassword.module.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { selectChangePasswordState } from '../../store/selectors/user-selector'
import { Loader } from '../Loader/Loader'
import { useForm } from 'react-hook-form'
import { IUserPassword } from '../../utils/types/user'
import { FormInputNames } from '../../utils/types/forms'
import { yupResolver } from '@hookform/resolvers/yup'
import { changePasswordValidationSchema } from '../../utils/validation'
import { onPasswordChange } from '../../store/thunks/user-thunk'
import { clearChangePasswordError } from '../../store/slices/user-slice'
import { USER_CHANGE_PASSWORD_FORM_INPUTS } from '../../utils/const-variables/forms'
import { FormInput } from '../FormInput/FormInput'
import { onLogout } from '../../store/thunks/auth-thunk'
import { FormWithEdit } from '../FormWithEdit/FormWithEdit'

export const UserPassword: FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading, errorMessage } = useAppSelector(selectChangePasswordState)

  const [editDisabled, setEditDisabled] = useState(true)
  const enableEdit = () => setEditDisabled(false)

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IUserPassword & { [FormInputNames.REPEAT_PASSWORD]: string }>({
    resolver: yupResolver(changePasswordValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    const { [FormInputNames.REPEAT_PASSWORD]: rePassword, ...passwords } = data
    dispatch(onPasswordChange(passwords)).then(data => {
      if (data.type.endsWith('fulfilled')) {
        setEditDisabled(true)
        reset()
      }
    })
  })

  const handleFormReset = () => {
    setEditDisabled(true)
    reset()
    if (errorMessage) {
      dispatch(clearChangePasswordError())
    }
  }

  const handleLogout = () => {
    dispatch(onLogout())
  }

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearChangePasswordError())
      }
    }
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <div>
      <FormWithEdit
        title="Изменить пароль"
        editDisabled={editDisabled}
        enableEdit={enableEdit}
        handleFormSubmit={handleFormSubmit}
        handleFormReset={handleFormReset}
        errorMessage={errorMessage}>
        <>
          {USER_CHANGE_PASSWORD_FORM_INPUTS.map(input => (
            <FormInput
              key={input.name}
              label={input.label}
              type={input.type}
              placeholder={input.placeholder}
              disabled={editDisabled}
              registerObj={{ ...register(input.name) }}
              errorMsg={errors[input.name]?.message}
            />
          ))}
        </>
      </FormWithEdit>
      <div className={styles.logout} onClick={handleLogout}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#exit"></use>
        </svg>
        <h3 className={styles.logout_header}>Выйти из профиля</h3>
      </div>
    </div>
  )
}
