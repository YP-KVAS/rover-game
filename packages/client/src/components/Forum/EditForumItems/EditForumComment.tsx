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
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { useCurrentPage } from '../../../hooks/useCurrentPage'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

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
  const topicId = useIntegerParams('topicId')
  const currentPage = useCurrentPage()

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
        const limit = parentCommentId ? undefined : COMMENTS_LOAD_LIMIT
        const offset = parentCommentId
          ? 0
          : (currentPage - 1) * COMMENTS_LOAD_LIMIT

        dispatch(
          onGetForumComments({
            parentCommentId,
            topicId,
            limit,
            offset,
          })
        )
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
