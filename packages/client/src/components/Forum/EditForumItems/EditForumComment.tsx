import { FC, FormEvent, useRef } from 'react'
import { AddForumItemForm } from '../AddForumItems/AddForumItemForm'
import {
  onGetForumComments,
  onUpdateForumComment,
} from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectForumUpdateCommentsStateById } from '../../../store/selectors/forum-selector'
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { useCurrentPage } from '../../../hooks/useCurrentPage'
import { useIntegerParams } from '../../../hooks/useIntegerParams'
import { TextEditor } from '../../TextEditor/TextEditor'
import { EditorView } from 'prosemirror-view'
import { useCommentEditor } from '../../../hooks/useCommentEditor'
import { getSanitizedHtmlString } from '../../../utils/sanitizeHtml'

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

  const editorRef = useRef<EditorView | null>(null)

  const {
    commentIsEmpty,
    setCommentIsEmpty,
    checkCommentIsEmpty,
    handleCommentEdit,
  } = useCommentEditor(editorRef)

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()

    const isEmpty = checkCommentIsEmpty()
    if (isEmpty) {
      setCommentIsEmpty(true)
      return
    }
    const message = editorRef.current?.dom.innerHTML

    if (message) {
      dispatch(
        onUpdateForumComment({
          id: commentId,
          message: getSanitizedHtmlString(message),
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
    }
  }

  return (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={
        commentIsEmpty
          ? 'Комментарий должен содержать текст'
          : updateState?.errorMessage
      }>
      <TextEditor
        editorId={`addReplyComment-${commentId}`}
        editorRef={editorRef}
        htmlString={message}
        handleCommentEdit={handleCommentEdit}
      />
    </AddForumItemForm>
  )
}
