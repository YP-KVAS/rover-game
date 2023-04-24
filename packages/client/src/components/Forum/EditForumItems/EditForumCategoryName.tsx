import { FC, useEffect } from 'react'
import { FormInput } from '../../FormInput/FormInput'
import { FormInputNames } from '../../../utils/types/forms'
import { AddForumItemForm } from '../AddForumItems/AddForumItemForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumCategoryTitleValidationSchema } from '../../../utils/validation'
import {
  onGetForumCategories,
  onUpdateForumCategory,
} from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { clearUpdateCategoryState } from '../../../store/slices/forum-slice'
import { Loader } from '../../Loader/Loader'
import { selectUpdateForumCategoryState } from '../../../store/selectors/forum-selector'

interface EditForumCategoryNameProps {
  handleFormReset: () => void
  id: number
  currentName: string
}

export const EditForumCategoryName: FC<EditForumCategoryNameProps> = ({
  handleFormReset,
  id,
  currentName,
}) => {
  const dispatch = useAppDispatch()
  const { isLoading, errorMessage } = useAppSelector(
    selectUpdateForumCategoryState
  )

  const { handleSubmit, register } = useForm<{
    [FormInputNames.FORUM_CATEGORY_TITLE]: string
  }>({
    resolver: yupResolver(addForumCategoryTitleValidationSchema),
  })

  useEffect(() => {
    return () => {
      dispatch(clearUpdateCategoryState())
    }
  }, [dispatch])

  const handleFormSubmit = handleSubmit(data => {
    dispatch(
      onUpdateForumCategory({
        id,
        name: data[FormInputNames.FORUM_CATEGORY_TITLE],
      })
    ).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumCategories())
        handleFormReset()
      }
    })
  })

  return isLoading ? (
    <Loader />
  ) : (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={errorMessage}>
      <FormInput
        defaultValue={currentName}
        registerObj={{ ...register(FormInputNames.FORUM_CATEGORY_TITLE) }}
        placeholder="Новое название категории"
      />
    </AddForumItemForm>
  )
}
