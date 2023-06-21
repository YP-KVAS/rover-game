import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumCategoryTitleValidationSchema } from '../../../utils/validation'
import { FormInput } from '../../FormInput/FormInput'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import {
  onAddForumCategory,
  onGetForumCategories,
} from '../../../store/thunks/forum-thunk'
import { AddForumItemWithState } from './AddForumItemWithState'
import { clearAddCategoryState } from '../../../store/slices/forum-slice'
import { selectAddForumCategoryState } from '../../../store/selectors/forum-selector'
import { FormInputNames } from '../../../utils/types/forms'

export const AddForumCategory: FC = () => {
  const dispatch = useAppDispatch()
  const { errorMessage } = useAppSelector(selectAddForumCategoryState)
  const [displayForm, setDisplayForm] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ [FormInputNames.FORUM_CATEGORY_TITLE]: string }>({
    resolver: yupResolver(addForumCategoryTitleValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    dispatch(
      onAddForumCategory(data[FormInputNames.FORUM_CATEGORY_TITLE])
    ).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumCategories())
        handleFormReset()
      }
    })
  })

  const handleFormReset = () => {
    reset()
    if (errorMessage) {
      dispatch(clearAddCategoryState())
    }
  }

  return (
    <AddForumItemWithState
      buttonLabel="Добавить новую категорию"
      submitButtonLabel="Создать категорию"
      resetButtonLabel="Отменить"
      errorMessage={errorMessage}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      displayForm={displayForm}
      setDisplayForm={setDisplayForm}>
      <>
        <FormInput
          label="Название категории"
          placeholder="Категория"
          registerObj={{ ...register(FormInputNames.FORUM_CATEGORY_TITLE) }}
          errorMsg={errors[FormInputNames.FORUM_CATEGORY_TITLE]?.message}
        />
      </>
    </AddForumItemWithState>
  )
}
