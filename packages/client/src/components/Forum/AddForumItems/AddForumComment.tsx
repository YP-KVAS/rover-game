import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumMessageValidationSchema } from '../../../utils/validation'
import { FormInput } from '../../FormInput/FormInput'
import { FormInputNames } from '../../../utils/types/forms'
import { onAddForumComment } from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { AddForumItemForm } from './AddForumItemForm'
import { ADD_FORUM_MESSAGE_FORM_INPUT } from '../../../utils/const-variables/forms'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

interface AddForumCommentProps {
  handleFormReset: () => void
  onCommentAdded: () => void
  parentCommentId: number | null
  errorMessage: string | null
}

export const AddForumComment: FC<AddForumCommentProps> = ({
  handleFormReset,
  onCommentAdded,
  parentCommentId,
  errorMessage = null,
}) => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUserId)
  const topicId = useIntegerParams('topicId')

  const { handleSubmit, register } = useForm<{
    [FormInputNames.FORUM_MESSAGE]: string
  }>({
    resolver: yupResolver(addForumMessageValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    if (userId) {
      dispatch(
        onAddForumComment({
          message: data[FormInputNames.FORUM_MESSAGE],
          parentCommentId,
          userId,
          topicId,
        })
      ).then(res => {
        if (res.type.endsWith('fulfilled')) {
          onCommentAdded()
          handleFormReset()
        }
      })
    }
  })

  return (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={errorMessage}>
      <FormInput
        registerObj={{ ...register(FormInputNames.FORUM_MESSAGE) }}
        placeholder={ADD_FORUM_MESSAGE_FORM_INPUT.placeholder}
        rows={3}
      />
    </AddForumItemForm>
  )
}
