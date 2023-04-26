import * as Yup from 'yup'

export enum ForumFieldsEnum {
  ID = 'id',
  NAME = 'name',
  USER_ID = 'userId',
  CATEGORY_ID = 'categoryId',
  MESSAGE = 'message',
  LIMIT = 'limit',
  OFFSET = 'offset',
  SEARCH = 'search',
}

const idValidation = Yup.number()
  .positive()
  .required()
  .typeError('Невалидный Id')

const nameValidation = Yup.string()
  .required('Название обязательно для заполнения')
  .min(3, 'Длина названия должна быть от 3-х до 120-ти символов')
  .max(120, 'Длина названия должна быть от 3-х до 120-ти символов')

const messageValidation = Yup.string().required(
  'Комментарий обязателен для заполнения'
)

const idParamsValidationSchema = Yup.object().shape({
  params: Yup.object().shape({
    id: idValidation,
  }),
})

const getQueryValidationSchema = Yup.object().shape({
  query: Yup.object().shape({
    [ForumFieldsEnum.LIMIT]: Yup.number()
      .optional()
      .typeError('Некорректное значение limit'),
    [ForumFieldsEnum.OFFSET]: Yup.number()
      .optional()
      .typeError('Некорректное значение offset'),
    [ForumFieldsEnum.SEARCH]: Yup.string()
      .optional()
      .typeError('Некорректное условие поиска'),
  }),
})

// categories
export const createCategoryValidationSchema = Yup.object().shape({
  body: Yup.object().shape({
    [ForumFieldsEnum.NAME]: nameValidation,
  }),
})

export const deleteCategoryValidationSchema = idParamsValidationSchema

export const updateCategoryValidationSchema = idParamsValidationSchema.concat(
  createCategoryValidationSchema
)

// users
export const getUserValidationSchema = idParamsValidationSchema

// topics
export const getTopicsValidationSchema = idParamsValidationSchema.concat(
  getQueryValidationSchema
)

export const addTopicValidationSchema = Yup.object()
  .shape({
    body: Yup.object().shape({
      [ForumFieldsEnum.NAME]: nameValidation,
      [ForumFieldsEnum.USER_ID]: idValidation,
      [ForumFieldsEnum.MESSAGE]: messageValidation,
    }),
  })
  .concat(idParamsValidationSchema)

export const updateTopicValidationSchema = Yup.object()
  .shape({
    body: Yup.object()
      .shape({
        [ForumFieldsEnum.NAME]: nameValidation.optional(),
        [ForumFieldsEnum.CATEGORY_ID]: idValidation.optional(),
      })
      .test(
        'contains data',
        'Name or id required',
        body => Object.keys(body).length > 0
      ),
  })
  .concat(idParamsValidationSchema)

export const deleteTopicValidationSchema = idParamsValidationSchema
