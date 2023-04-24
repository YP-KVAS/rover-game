import * as Yup from 'yup'

export enum ForumFieldsEnum {
  ID = 'id',
  NAME = 'name',
}

const idValidationSchema = Yup.object().shape({
  params: Yup.object().shape({ id: Yup.number().required('Невалидный Id') }),
})

const bodyWithNameValidationSchema = Yup.object().shape({
  body: Yup.object().shape({
    [ForumFieldsEnum.NAME]: Yup.string()
      .required('Название обязательно для заполнения')
      .min(3, 'Длина названия должна быть от 3-х до 120-ти символов')
      .max(120, 'Длина названия должна быть от 3-х до 120-ти символов'),
  }),
})

// categories
export const createCategoryValidationSchema = bodyWithNameValidationSchema

export const deleteCategoryValidationSchema = idValidationSchema

export const updateCategoryValidationSchema = idValidationSchema.concat(
  bodyWithNameValidationSchema
)

// users
export const getUserValidationSchema = idValidationSchema
