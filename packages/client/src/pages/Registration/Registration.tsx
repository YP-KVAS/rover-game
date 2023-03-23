import { useForm } from 'react-hook-form'
import {
  nameValidation,
  loginValidation,
  emailValidation,
  phoneValidation,
  passwordValidation,
  nameErrors,
  loginErrors,
  emailErrors,
  phoneErrors,
  passwordErrors,
} from '../../utils/validation'
import { FormInput } from '../../components/FormInput/FormInput'
import { Form } from '../../components/Form/Form'
import './Registration.css'

export const Registration = () => {
  type RegFormData = {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegFormData>()

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <main className="registration">
      <Form onSubmit={onSubmit}>
        <FormInput
          label="Имя"
          registerObj={{ ...register('first_name', nameValidation) }}
          errors={errors.first_name}
          errorsMsgs={nameErrors}></FormInput>
        <FormInput
          label="Фамилия"
          registerObj={{ ...register('second_name', nameValidation) }}
          errors={errors.second_name}
          errorsMsgs={nameErrors}></FormInput>
        <FormInput
          label="Логин"
          registerObj={{ ...register('login', loginValidation) }}
          errors={errors.login}
          errorsMsgs={loginErrors}></FormInput>
        <FormInput
          label="E-mail"
          registerObj={{ ...register('email', emailValidation) }}
          errors={errors.email}
          errorsMsgs={emailErrors}></FormInput>
        <FormInput
          label="Телефон"
          registerObj={{ ...register('phone', phoneValidation) }}
          errors={errors.phone}
          errorsMsgs={phoneErrors}></FormInput>
        <FormInput
          label="Пароль"
          registerObj={{ ...register('password', passwordValidation) }}
          errors={errors.password}
          errorsMsgs={passwordErrors}></FormInput>
        <button>Отправить</button>
      </Form>
    </main>
  )
}
