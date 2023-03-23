export const nameValidation = {
  required: true,
  pattern: /^[A-ZА-Я][а-яА-Яa-zA-Z-]*$/,
}

export const nameErrors = {
  required: 'Поле обязательно к заполнению',
  pattern:
    'Имя должно состоять из латиницы или кириллицы, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
}

export const loginValidation = {
  required: true,
  pattern: /(?!^\d+$)^[a-zA-Z0-9_-]*$/,
  minLength: 3,
  maxLength: 20,
}

export const loginErrors = {
  required: 'Поле обязательно к заполнению',
  pattern:
    'Логин может содержать символы латиницы, содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
  minLength: 'Длина логина должна быть от 3 до 20 символов',
  maxLength: 'Длина логина должна быть от 3 до 20 символов',
}

export const emailValidation = {
  required: true,
  pattern: /^[a-zA-Z0-9-]+@[a-zA-Z]+\.[a-zA-Z]+$/,
}

export const emailErrors = {
  required: 'Поле обязательно к заполнению',
  pattern:
    'Адрес почты может содержать символы латиницы, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
}

export const passwordValidation = {
  required: true,
  pattern: /(?=^.*[0-9]+.*$)(?=^.*[A-ZА-Я]+.*$)/,
  minLength: 8,
  maxLength: 40,
}

export const passwordErrors = {
  required: 'Поле обязательно к заполнению',
  pattern:
    'Пароль должен содержать обязательно хотя бы одну заглавную букву и цифру',
  minLength: 'Длина пароля должна быть от 8 до 40 символов',
  maxLength: 'Длина пароля должна быть от 8 до 40 символов',
}

export const phoneValidation = {
  required: true,
  pattern: /^[+]?[0-9]*$/,
  minLength: 10,
  maxLength: 15,
}

export const phoneErrors = {
  required: 'Поле обязательно к заполнению',
  pattern: 'Номер должен состоять из цифр, может начинается с плюса.',
  minLength: 'Длина номера должна быть от 10 до 15 символов',
  maxLength: 'Длина номера должна быть от 10 до 15 символов',
}
