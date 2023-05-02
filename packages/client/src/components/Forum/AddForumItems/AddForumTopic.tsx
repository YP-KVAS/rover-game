import styles from '../../FormInput/FormInput.module.scss'
import { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { addForumTopicTitleValidationSchema } from '../../../utils/validation'
import { FormInput } from '../../FormInput/FormInput'
import { NewTopic } from '../../../utils/types/forum'
import { ADD_FORUM_TOPIC_FORM_INPUT } from '../../../utils/const-variables/forms'
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
import { EditorView } from 'prosemirror-view'
import { FormInputNames } from '../../../utils/types/forms'
import { useCommentEditor } from '../../../hooks/useCommentEditor'
import { InputError } from '../../InputError/InputError'
import { TextEditor } from '../../TextEditor/TextEditor'
import { getSanitizedHtmlString } from '../../../utils/sanitizeHtml'

export const AddForumTopic: FC = () => {
  const dispatch = useAppDispatch()
  const categoryId = useIntegerParams('categoryId')
  const { errorMessage } = useAppSelector(selectForumAddTopicState)
  const searchQuery = useAppSelector(selectForumTopicSearchQuery)
  const userId = useAppSelector(selectCurrentUserId)

  const [displayForm, setDisplayForm] = useState(false)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewTopic>({
    resolver: yupResolver(addForumTopicTitleValidationSchema),
  })

  const editorRef = useRef<EditorView | null>(null)
  const inputRef = useRef(null)

  const {
    commentIsEmpty,
    setCommentIsEmpty,
    checkCommentIsEmpty,
    handleCommentEdit,
  } = useCommentEditor(editorRef)

  const handleFormSubmit = handleSubmit(data => {
    const isEmpty = checkCommentIsEmpty()
    if (isEmpty) {
      setCommentIsEmpty(true)
      return
    }
    const message = editorRef.current?.dom.innerHTML

    if (userId && message) {
      dispatch(
        onAddForumTopic({
          ...data,
          [FormInputNames.FORUM_MESSAGE]: getSanitizedHtmlString(message),
          userId,
          categoryId,
        })
      ).then(res => {
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
    setCommentIsEmpty(false)
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
      handleFormReset={handleFormReset}
      displayForm={displayForm}
      setDisplayForm={setDisplayForm}>
      <>
        {
          <FormInput
            key={ADD_FORUM_TOPIC_FORM_INPUT.name}
            label={ADD_FORUM_TOPIC_FORM_INPUT.label}
            type={ADD_FORUM_TOPIC_FORM_INPUT.type}
            placeholder={ADD_FORUM_TOPIC_FORM_INPUT.placeholder}
            registerObj={{ ...register(ADD_FORUM_TOPIC_FORM_INPUT.name) }}
            errorMsg={errors[ADD_FORUM_TOPIC_FORM_INPUT.name]?.message}
            rows={ADD_FORUM_TOPIC_FORM_INPUT.rows}
          />
        }
        <label className={styles.input_label}>Комментарий</label>
        <div className={styles.input_container} ref={inputRef}>
          <TextEditor
            editorId="addFirstComment"
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
      </>
    </AddForumItemWithState>
  )
}
