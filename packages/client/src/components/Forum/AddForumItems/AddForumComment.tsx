import { FC, FormEvent, useRef } from 'react'
import { onAddForumComment } from '../../../store/thunks/forum-thunk'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { AddForumItemForm } from './AddForumItemForm'
import { useIntegerParams } from '../../../hooks/useIntegerParams'
import { TextEditor } from '../../TextEditor/TextEditor'
import { EditorView } from 'prosemirror-view'
import { useCommentEditor } from '../../../hooks/useCommentEditor'
import { getSanitizedHtmlString } from '../../../utils/sanitizeHtml'

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

    if (userId && message) {
      dispatch(
        onAddForumComment({
          message: getSanitizedHtmlString(message),
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
  }

  return (
    <AddForumItemForm
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      errorMessage={
        commentIsEmpty ? 'Комментарий должен содержать текст' : errorMessage
      }>
      <TextEditor
        editorId={`addReplyComment-${parentCommentId}`}
        editorRef={editorRef}
        htmlString=""
        handleCommentEdit={handleCommentEdit}
      />
    </AddForumItemForm>
  )
}
