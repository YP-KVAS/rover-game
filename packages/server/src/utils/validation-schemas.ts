import * as Yup from 'yup'

export enum ForumFieldsEnum {
  ID = 'id',
  NAME = 'name',
  USER_ID = 'userId',
  PARENT_COMMENT_ID = 'parentCommentId',
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

const limitValidation = Yup.number()
  .optional()
  .typeError('Некорректное значение limit')

const offsetValidation = Yup.number()
  .optional()
  .typeError('Некорректное значение offset')

const idParamsValidationSchema = Yup.object().shape({
  params: Yup.object().shape({
    id: idValidation,
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

// topics
export const getTopicsValidationSchema = Yup.object()
  .shape({
    query: Yup.object().shape({
      [ForumFieldsEnum.LIMIT]: limitValidation,
      [ForumFieldsEnum.OFFSET]: offsetValidation,
      [ForumFieldsEnum.SEARCH]: Yup.string()
        .optional()
        .typeError('Некорректное условие поиска'),
    }),
  })
  .concat(idParamsValidationSchema)

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

// comments
export const getCommentsValidationSchema = Yup.object()
  .shape({
    query: Yup.object().shape({
      [ForumFieldsEnum.LIMIT]: limitValidation,
      [ForumFieldsEnum.OFFSET]: offsetValidation,
      [ForumFieldsEnum.PARENT_COMMENT_ID]: Yup.number()
        .nullable()
        .optional()
        .typeError('Некорректное значение parent id'),
    }),
  })
  .concat(idParamsValidationSchema)

export const addCommentValidationSchema = Yup.object()
  .shape({
    body: Yup.object().shape({
      [ForumFieldsEnum.MESSAGE]: messageValidation,
      [ForumFieldsEnum.USER_ID]: idValidation,
      [ForumFieldsEnum.PARENT_COMMENT_ID]: idValidation.nullable(),
    }),
  })
  .concat(idParamsValidationSchema)

export const updateCommentValidationSchema = Yup.object()
  .shape({
    body: Yup.object().shape({
      [ForumFieldsEnum.MESSAGE]: messageValidation,
    }),
  })
  .concat(idParamsValidationSchema)

export const deleteCommentValidationSchema = idParamsValidationSchema

// leaderboard
export const getLeaderboardUsersValidationSchema = Yup.object().shape({
  query: Yup.object().shape({
    [ForumFieldsEnum.LIMIT]: limitValidation,
    [ForumFieldsEnum.OFFSET]: offsetValidation,
  }),
})

export const updateUserScoreValidationSchema = Yup.object().shape({
  body: Yup.object().shape({
    score: Yup.number()
      .positive()
      .required()
      .typeError('Некорректное значение score'),
  }),
})
