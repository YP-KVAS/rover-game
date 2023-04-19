import * as Yup from 'yup'
import { FormInputNames } from './types/forms'

const REQUIRED_MESSAGE = 'Поле обязательно к заполнению'

const emailValidation = Yup.string()
  .required(REQUIRED_MESSAGE)
  .matches(
    /^[a-zA-Z0-9-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
    'Адрес почты может содержать символы латиницы, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.'
  )

const loginValidation = Yup.string()
  .required(REQUIRED_MESSAGE)
  .min(3, 'Длина логина должна быть от 3 до 20 символов')
  .max(20, 'Длина логина должна быть от 3 до 20 символов')
  .matches(
    /(?!^\d+$)^[a-zA-Z0-9_-]*$/,
    'Логин может содержать символы латиницы, содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).'
  )

const passwordValidation = Yup.string()
  .required(REQUIRED_MESSAGE)
  .min(8, 'Длина пароля должна быть от 8 до 40 символов')
  .max(40, 'Длина пароля должна быть от 8 до 40 символов')
  .matches(
    /(?=^.*[0-9]+.*$)(?=^.*[A-ZА-Я]+.*$)/,
    'Пароль должен содержать обязательно хотя бы одну заглавную букву и цифру'
  )

const oldPasswordValidation = Yup.string().required(REQUIRED_MESSAGE)

export const confirmPasswordValidationSchema = Yup.object().shape({
  [FormInputNames.PASSWORD]: passwordValidation,
  [FormInputNames.REPEAT_PASSWORD]: passwordValidation.oneOf(
    [Yup.ref(FormInputNames.PASSWORD)],
    'Введенные пароли не совпадают'
  ),
})

export const changePasswordValidationSchema = Yup.object().shape({
  [FormInputNames.OLD_PASSWORD]: oldPasswordValidation,
  [FormInputNames.NEW_PASSWORD]: passwordValidation,
  [FormInputNames.REPEAT_PASSWORD]: passwordValidation.oneOf(
    [Yup.ref(FormInputNames.NEW_PASSWORD)],
    'Введенные пароли не совпадают'
  ),
})

const userValidationSchema = Yup.object().shape({
  [FormInputNames.FIRST_NAME]: Yup.string()
    .required(REQUIRED_MESSAGE)
    .matches(
      /^[A-ZА-Я][а-яА-Яa-zA-Z-]*$/,
      'Имя должно состоять из латиницы или кириллицы, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
    ),
  [FormInputNames.SECOND_NAME]: Yup.string()
    .required(REQUIRED_MESSAGE)
    .matches(
      /^[A-ZА-Я][а-яА-Яa-zA-Z-]*$/,
      'Фамилия должна состоять из латиницы или кириллицы, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)'
    ),
  [FormInputNames.LOGIN]: loginValidation,
  [FormInputNames.EMAIL]: emailValidation,
  [FormInputNames.PHONE]: Yup.string()
    .required(REQUIRED_MESSAGE)
    .min(10, 'Длина номера должна быть от 10 до 15 символов')
    .max(15, 'Длина номера должна быть от 10 до 15 символов')
    .matches(
      /^[+]?[0-9]*$/,
      'Номер должен состоять из цифр, может начинается с плюса.'
    ),
})

export const userRegisterValidationSchema = userValidationSchema.concat(
  confirmPasswordValidationSchema
)

export const changeUserProfileDataValidationSchema = userValidationSchema.shape(
  {
    [FormInputNames.DISPLAY_NAME]: Yup.string()
      .required(REQUIRED_MESSAGE)
      .min(3, 'Длина никнейма должна быть от 3 до 15 символов')
      .max(15, 'Длина никнейма должна быть от 3 до 15 символов'),
  }
)

export const signinValidationSchema = Yup.object().shape({
  [FormInputNames.LOGIN]: loginValidation,
  [FormInputNames.PASSWORD]: passwordValidation,
})

// Forum validation
const topicTitleValidation = Yup.string()
  .required(REQUIRED_MESSAGE)
  .max(120, 'Длина названия темы должна быть не более 120 символов')

const topicCommentValidation = Yup.string().required(REQUIRED_MESSAGE)

export const addForumTitleValidationSchema = Yup.object().shape({
  [FormInputNames.FORUM_TITLE]: topicTitleValidation,
})

export const addForumMessageValidationSchema = Yup.object().shape({
  [FormInputNames.FORUM_MESSAGE]: topicCommentValidation,
})

export const addForumTopicValidationSchema =
  addForumTitleValidationSchema.concat(addForumMessageValidationSchema)
