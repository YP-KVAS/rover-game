import { FormInputNames, InputType } from '../types/forms'

interface FormInput {
  label: string
  placeholder: string
  type: InputType
  name: FormInputNames
}

export const REGISTRATION_FORM_INPUTS: Array<FormInput> = [
  {
    label: 'Имя',
    placeholder: 'Иван',
    type: 'text',
    name: FormInputNames.FIRST_NAME,
  },
  {
    label: 'Фамилия',
    placeholder: 'Иванов',
    type: 'text',
    name: FormInputNames.SECOND_NAME,
  },
  {
    label: 'Логин',
    placeholder: 'ivan',
    type: 'text',
    name: FormInputNames.LOGIN,
  },
  {
    label: 'E-mail',
    placeholder: 'ivan-ivanov@example.com',
    type: 'email',
    name: FormInputNames.EMAIL,
  },
  {
    label: 'Телефон',
    placeholder: '+79991234567',
    type: 'tel',
    name: FormInputNames.PHONE,
  },
  {
    label: 'Пароль',
    type: 'password',
    placeholder: 'Пароль',
    name: FormInputNames.PASSWORD,
  },
  {
    label: 'Подтвердите пароль',
    type: 'password',
    placeholder: 'Пароль',
    name: FormInputNames.REPEAT_PASSWORD,
  },
]
