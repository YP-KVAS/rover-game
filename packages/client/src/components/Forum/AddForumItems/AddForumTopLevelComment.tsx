import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectLastAddedCommentState } from '../../../store/selectors/forum-selector'
import { useForm } from 'react-hook-form'
import { FormInputNames } from '../../../utils/types/forms'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumMessageValidationSchema } from '../../../utils/validation'
import {
  onAddForumComment,
  onGetForumComments,
} from '../../../store/thunks/forum-thunk'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { FormInput } from '../../FormInput/FormInput'
import { AddForumItemWithState } from './AddForumItemWithState'
import { ADD_FORUM_MESSAGE_FORM_INPUT } from '../../../utils/const-variables/forms'
import { clearLastAddedCommentError } from '../../../store/slices/forum-slice'

export const AddForumTopLevelComment: FC = () => {
  const dispatch = useAppDispatch()
  const userId = useAppSelector(selectCurrentUserId)
  const { errorMessage, lastAddedParentCommentId } = useAppSelector(
    selectLastAddedCommentState
  )

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<{ [FormInputNames.FORUM_MESSAGE]: string }>({
    resolver: yupResolver(addForumMessageValidationSchema),
  })

  const handleFormSubmit = handleSubmit(data => {
    if (userId) {
      dispatch(
        onAddForumComment({
          message: data[FormInputNames.FORUM_MESSAGE],
          parent_comment_id: null,
          user_id: userId,
        })
      ).then(res => {
        if (res.type.endsWith('fulfilled')) {
          if (res.payload && typeof res.payload !== 'string') {
            dispatch(onGetForumComments(null))
          }
          handleFormReset()
        }
      })
    }
  })

  const handleFormReset = () => {
    reset()
    dispatch(clearLastAddedCommentError())
  }

  return (
    <AddForumItemWithState
      buttonLabel="Написать комментарий"
      errorMessage={lastAddedParentCommentId === null ? errorMessage : null}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}>
      <FormInput
        registerObj={{ ...register(FormInputNames.FORUM_MESSAGE) }}
        errorMsg={errors[FormInputNames.FORUM_MESSAGE]?.message}
        {...ADD_FORUM_MESSAGE_FORM_INPUT}
      />
    </AddForumItemWithState>
  )
}
