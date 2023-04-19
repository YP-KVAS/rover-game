import { FC, useEffect } from 'react'
import { FormInput } from '../../FormInput/FormInput'
import { FormInputNames } from '../../../utils/types/forms'
import { AddForumItemForm } from '../AddForumItems/AddForumItemForm'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumTitleValidationSchema } from '../../../utils/validation'
import {
  onGetForumTopics,
  onUpdateForumTopic,
} from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { useParams } from 'react-router-dom'
import { selectTopicState } from '../../../store/selectors/forum-selector'
import { clearLastAddedTopicError } from '../../../store/slices/forum-slice'
import { Loader } from '../../Loader/Loader'

interface EditForumTopicNameProps {
  handleFormReset: () => void
  currentTopicName: string
}

export const EditForumTopicName: FC<EditForumTopicNameProps> = ({
  handleFormReset,
  currentTopicName,
}) => {
  const dispatch = useAppDispatch()
  const { categoryId = -1 } = useParams()
  const { isLoading, errorMessage } = useAppSelector(selectTopicState)

  const { handleSubmit, register } = useForm<{
    [FormInputNames.FORUM_TITLE]: string
  }>({
    resolver: yupResolver(addForumTitleValidationSchema),
  })

  useEffect(() => {
    return () => {
      dispatch(clearLastAddedTopicError())
    }
  }, [])

  const handleFormSubmit = handleSubmit(data => {
    dispatch(onUpdateForumTopic({ ...data })).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumTopics(+categoryId))
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
        defaultValue={currentTopicName}
        registerObj={{ ...register(FormInputNames.FORUM_TITLE) }}
        placeholder="Новое название темы"
      />
    </AddForumItemForm>
  )
}
