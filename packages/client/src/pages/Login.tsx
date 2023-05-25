import formStyles from '../common-styles/Form.module.scss'
import { useForm } from 'react-hook-form'
import { Button } from '../components/Button/Button'
import { FormInput } from '../components/FormInput/FormInput'
import { Form } from '../components/Form/Form'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import { onSignIn } from '../store/thunks/auth-thunk'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'
import { LOGIN_FORM_INPUTS } from '../utils/const-variables/forms'
import { UserSignIn } from '../utils/types/user'
import { yupResolver } from '@hookform/resolvers/yup'
import { signinValidationSchema } from '../utils/validation'
import { selectAuthState } from '../store/selectors/auth-selector'
import { Loader } from '../components/Loader/Loader'
import { Title } from '../components/Title/Title'
import { FC, useEffect } from 'react'
import { clearAuthError } from '../store/slices/auth-slice'
import RequireAuth from '../hocs/requireAuth'
import { EnumPages } from '../utils/const-variables/pages'
import { OAuth } from '../components/OAuth/OAuth'

const Login: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<UserSignIn>({
    resolver: yupResolver(signinValidationSchema),
  })
  const dispatch = useAppDispatch()
  const { isLoading, errorMessage } = useAppSelector(selectAuthState)

  const onSubmit = handleSubmit(data => {
    dispatch(onSignIn(data))
  })

  useEffect(() => {
    return () => {
      if (errorMessage) {
        dispatch(clearAuthError())
      }
    }
  }, [dispatch])

  return isLoading ? (
    <Loader />
  ) : (
    <Form onSubmit={onSubmit}>
      <Title text="Авторизация" />
      <OAuth />
      <>
        {LOGIN_FORM_INPUTS.map(input => (
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
          Войти
        </Button>
        <Link to={RoutesEnum.REGISTRATION} className={formStyles.link}>
          Еще нет аккаунта? Зарегистрироваться
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

const LoginWithAuth: FC = RequireAuth(Login, EnumPages.LOGIN)

export { LoginWithAuth as Login }
