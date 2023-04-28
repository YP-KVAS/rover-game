import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumTopicValidationSchema } from '../../../utils/validation'
import { FormInput } from '../../FormInput/FormInput'
import { NewTopic } from '../../../utils/types/forum'
import { ADD_FORUM_TOPIC_FORM_INPUTS } from '../../../utils/const-variables/forms'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import {
  onAddForumTopic,
  onGetForumTopics,
} from '../../../store/thunks/forum-thunk'
import { AddForumItemWithState } from './AddForumItemWithState'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { clearAddTopicState } from '../../../store/slices/forum-slice'
import {
  selectForumAddTopicState,
  selectForumTopicSearchQuery,
} from '../../../store/selectors/forum-selector'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

export const AddForumTopic: FC = () => {
  const dispatch = useAppDispatch()
  const categoryId = useIntegerParams('categoryId')
  const { errorMessage } = useAppSelector(selectForumAddTopicState)
  const searchQuery = useAppSelector(selectForumTopicSearchQuery)
  const userId = useAppSelector(selectCurrentUserId)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewTopic>({
    resolver: yupResolver(addForumTopicValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    if (userId) {
      dispatch(onAddForumTopic({ ...data, userId, categoryId })).then(res => {
        if (res.type.endsWith('fulfilled')) {
          dispatch(
            onGetForumTopics({
              categoryId,
              search: searchQuery || '',
            })
          )
          handleFormReset()
        }
      })
    }
  })

  const handleFormReset = () => {
    reset()
    if (errorMessage) {
      dispatch(clearAddTopicState())
    }
  }

  return (
    <AddForumItemWithState
      buttonLabel="Добавить новую тему"
      submitButtonLabel="Создать тему"
      resetButtonLabel="Отменить"
      errorMessage={errorMessage}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}>
      <>
        {ADD_FORUM_TOPIC_FORM_INPUTS.map(input => (
          <FormInput
            key={input.name}
            label={input.label}
            type={input.type}
            placeholder={input.placeholder}
            registerObj={{ ...register(input.name) }}
            errorMsg={errors[input.name]?.message}
            rows={input.rows}
          />
        ))}
      </>
    </AddForumItemWithState>
  )
}
