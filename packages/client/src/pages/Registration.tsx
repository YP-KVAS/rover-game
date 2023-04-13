import formStyles from '../common-styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormInput } from '../components/FormInput/FormInput'
import { Form } from '../components/Form/Form'
import { Button } from '../components/Button/Button'
import { FormInputNames } from '../utils/types/forms'
import { userRegisterValidationSchema } from '../utils/validation'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import { onSignUp } from '../store/thunks/auth-thunk'
import { UserSignUp } from '../utils/types/user'
import { REGISTRATION_FORM_INPUTS } from '../utils/const-variables/forms'
import { Link, useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'
import { Loader } from '../components/Loader/Loader'
import { selectAuthState } from '../store/selectors/auth-selector'
import { useEffect } from 'react'
import { clearAuthError } from '../store/slices/auth-slice'
import { Title } from '../components/Title/Title'

type RegFormData = UserSignUp & { [FormInputNames.REPEAT_PASSWORD]: string }

export const Registration = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegFormData>({
    resolver: yupResolver(userRegisterValidationSchema),
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isLoading, errorMessage } = useAppSelector(selectAuthState)

  const onSubmit = handleSubmit(data => {
    const { [FormInputNames.REPEAT_PASSWORD]: rePassword, ...userData } = data

    dispatch(onSignUp(userData)).then(data => {
      if (data.type.endsWith('fulfilled')) {
        navigate(RoutesEnum.MAIN)
      }
    })
  })

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearAuthError())
      }
    }
  }, [])

  return isLoading ? (
    <Loader />
  ) : (
    <Form onSubmit={onSubmit}>
      <Title text="Регистрация" />
      <>
        {REGISTRATION_FORM_INPUTS.map(input => (
          <FormInput
            key={input.name}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            registerObj={{ ...register(input.name) }}
            errorMsg={errors[input.name]?.message}
          />
        ))}
      </>
      <div className={formStyles.form_actions}>
        <Button type="primary" htmlType="submit">
          Зарегистрироваться
        </Button>
        <Link to={RoutesEnum.LOGIN} className={formStyles.link}>
          Уже зарегистрированы? Войти
        </Link>
      </div>
      <>
        {errorMessage && (
          <p className={formStyles.form_error_message}>{errorMessage}</p>
        )}
      </>
    </Form>
  )
}
