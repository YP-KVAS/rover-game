import { FC } from 'react'
import { AddForumItemForm } from '../AddForumItems/AddForumItemForm'
import { FormInput } from '../../FormInput/FormInput'
import { FormInputNames } from '../../../utils/types/forms'
import { ADD_FORUM_MESSAGE_FORM_INPUT } from '../../../utils/const-variables/forms'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumMessageValidationSchema } from '../../../utils/validation'
import {
  onGetForumComments,
  onUpdateForumComment,
} from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectForumUpdateCommentsStateById } from '../../../store/selectors/forum-selector'

interface EditForumCommentProps {
  commentId: number
  parentCommentId: number | null
  message: string
  handleFormReset: () => void
}

export const EditForumComment: FC<EditForumCommentProps> = ({
  commentId,
  parentCommentId,
  message,
  handleFormReset,
}) => {
  const dispatch = useAppDispatch()
  const updateState = useAppSelector(state =>
    selectForumUpdateCommentsStateById(state, commentId)
  )

  const { handleSubmit, register } = useForm<{
    [FormInputNames.FORUM_MESSAGE]: string
  }>({
    resolver: yupResolver(addForumMessageValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    dispatch(
      onUpdateForumComment({
        id: commentId,
        message: data[FormInputNames.FORUM_MESSAGE],
      })
    ).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(onGetForumComments(parentCommentId))
        handleFormReset()
      }
    })
  })

  return (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={updateState?.errorMessage}>
      <FormInput
        defaultValue={message}
        registerObj={{ ...register(FormInputNames.FORUM_MESSAGE) }}
        placeholder={ADD_FORUM_MESSAGE_FORM_INPUT.placeholder}
        rows={3}
      />
    </AddForumItemForm>
  )
}
