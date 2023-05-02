import { FC, FormEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import {
  onAddForumComment,
  onGetForumComments,
} from '../../../store/thunks/forum-thunk'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { AddForumItemWithState } from './AddForumItemWithState'
import { selectForumAddTopLevelCommentState } from '../../../store/selectors/forum-selector'
import { clearAddTopLevelCommentErrorState } from '../../../store/slices/forum-slice'
import { useNavigate } from 'react-router-dom'
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { PAGE_QUERY } from '../../../utils/const-variables/routes'
import { useIntegerParams } from '../../../hooks/useIntegerParams'
import { TextEditor } from '../../TextEditor/TextEditor'
import { EditorView } from 'prosemirror-view'
import { useCommentEditor } from '../../../hooks/useCommentEditor'
import sanitizeHtml from 'sanitize-html'
import styles from '../../FormInput/FormInput.module.scss'
import { InputError } from '../../InputError/InputError'

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

  const [displayForm, setDisplayForm] = useState(false)

  const editorRef = useRef<EditorView | null>(null)
  const inputRef = useRef(null)
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
          message: sanitizeHtml(message),
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
  }

  const handleFormReset = () => {
    setDisplayForm(false)
    if (errorMessage) {
      dispatch(clearAddTopLevelCommentErrorState())
    }
  }

  return (
    <AddForumItemWithState
      buttonLabel="Написать комментарий"
      errorMessage={errorMessage}
      handleFormSubmit={handleFormSubmit}
      handleFormReset={handleFormReset}
      displayForm={displayForm}
      setDisplayForm={setDisplayForm}>
      <div className={styles.input_container} ref={inputRef}>
        <TextEditor
          editorId="addTopLevelComment"
          editorRef={editorRef}
          htmlString=""
          handleCommentEdit={handleCommentEdit}
        />
        {commentIsEmpty && (
          <InputError
            message="Поле должно содержать текст"
            inputRef={inputRef}
          />
        )}
      </div>
    </AddForumItemWithState>
  )
}
