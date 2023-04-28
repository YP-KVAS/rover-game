import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
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
import { selectForumAddTopLevelCommentState } from '../../../store/selectors/forum-selector'
import { clearAddTopLevelCommentErrorState } from '../../../store/slices/forum-slice'
import { useNavigate } from 'react-router-dom'
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { PAGE_QUERY } from '../../../utils/const-variables/routes'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

interface AddForumTopLevelCommentProps {
  totalPages: number
  totalComments: number
  currentPage: number
}

export const AddForumTopLevelComment: FC<AddForumTopLevelCommentProps> = ({
  totalPages,
  totalComments,
  currentPage,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const topicId = useIntegerParams('topicId')
  const userId = useAppSelector(selectCurrentUserId)
  const { errorMessage } = useAppSelector(selectForumAddTopLevelCommentState)

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
          parentCommentId: null,
          userId,
          topicId,
        })
      ).then(res => {
        if (res.type.endsWith('fulfilled')) {
          handleFormReset()

          const lastPage =
            totalPages * COMMENTS_LOAD_LIMIT === totalComments
              ? totalPages + 1
              : totalPages

          if (currentPage === lastPage) {
            const offset = (currentPage - 1) * COMMENTS_LOAD_LIMIT

            dispatch(
              onGetForumComments({
                parentCommentId: null,
                topicId,
                limit: COMMENTS_LOAD_LIMIT,
                offset,
              })
            )
          } else {
            navigate({ search: `?${PAGE_QUERY}=${lastPage}` })
          }
        }
      })
    }
  })

  const handleFormReset = () => {
    reset()
    if (errorMessage) {
      dispatch(clearAddTopLevelCommentErrorState())
    }
  }

  return (
    <AddForumItemWithState
      buttonLabel="Написать комментарий"
      errorMessage={errorMessage}
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
