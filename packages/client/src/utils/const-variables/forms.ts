import { FormInputNames, InputType } from '../types/forms'
import { Tab } from '../../components/Tabs/Tabs'
import { UserData } from '../../components/UserData/UserData'
import { UserAvatar } from '../../components/UserAvatar/UserAvatar'
import { UserPassword } from '../../components/UserPassword/UserPassword'

interface FormInput {
  label: string
  placeholder: string
  type: InputType
  name: FormInputNames
  rows?: number
}

const USER_FORM_DATA: Array<FormInput> = [
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
]

export const LOGIN_FORM_INPUTS: Array<FormInput> = [
  {
    label: 'Логин',
    placeholder: 'Логин',
    type: 'text',
    name: FormInputNames.LOGIN,
  },
  {
    label: 'Пароль',
    placeholder: 'Пароль',
    type: 'password',
    name: FormInputNames.PASSWORD,
  },
]

export const REGISTRATION_FORM_INPUTS: Array<FormInput> = [
  ...USER_FORM_DATA,
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

export const USER_SETTINGS_FORM_INPUTS: Array<FormInput> = [
  ...USER_FORM_DATA,
  {
    label: 'Никнейм',
    type: 'text',
    placeholder: 'Ivan',
    name: FormInputNames.DISPLAY_NAME,
  },
]

export const USER_CHANGE_PASSWORD_FORM_INPUTS: Array<FormInput> = [
  {
    label: 'Старый пароль',
    type: 'password',
    placeholder: 'Пароль',
    name: FormInputNames.OLD_PASSWORD,
  },
  {
    label: 'Новый пароль',
    type: 'password',
    placeholder: 'Пароль',
    name: FormInputNames.NEW_PASSWORD,
  },
  {
    label: 'Подтвердите пароль',
    type: 'password',
    placeholder: 'Пароль',
    name: FormInputNames.REPEAT_PASSWORD,
  },
]

export const USER_SETTINGS_TABS: Array<Tab> = [
  {
    label: 'Учётные данные',
    component: UserData,
  },
  {
    label: 'Фото профиля',
    component: UserAvatar,
  },
  {
    label: 'Настройки',
    component: UserPassword,
  },
]

export const ADD_FORUM_TOPIC_FORM_INPUTS: Array<FormInput> = [
  {
    label: 'Название темы',
    type: 'text',
    placeholder: 'Топик',
    name: FormInputNames.FORUM_TITLE,
  },
  {
    label: 'Комментарий',
    type: 'text',
    placeholder: 'Первый комментарий',
    name: FormInputNames.FORUM_MESSAGE,
    rows: 5,
  },
]
