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
import { useParams } from 'react-router-dom'
import { selectAddTopicState } from '../../../store/selectors/forum-selector'
import { AddForumItemWithState } from './AddForumItemWithState'

export const AddForumTopic: FC = () => {
  const dispatch = useAppDispatch()
  const { categoryId = -1 } = useParams()
  const { errorMessage } = useAppSelector(selectAddTopicState)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewTopic>({
    resolver: yupResolver(addForumTopicValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    dispatch(onAddForumTopic(data)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumTopics(+categoryId))
        handleFormReset()
      }
    })
  })

  const handleFormReset = () => reset()

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
