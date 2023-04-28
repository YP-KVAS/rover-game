import styles from '../Forum.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { ReplyIcon } from '../CrudIcons/ReplyIcon'
import { UpdateDeleteIcons } from '../CrudIcons/UpdateDeleteIcons'
import { Loader } from '../../Loader/Loader'
import { EditForumComment } from '../EditForumItems/EditForumComment'
import { AddForumComment } from '../AddForumItems/AddForumComment'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import {
  selectForumAddGetCommentsStateByParentId,
  selectForumCommentsByParentId,
  selectForumDeleteCommentsStateById,
  selectForumLastTouchedCommentId,
  selectForumUpdateCommentsStateById,
} from '../../../store/selectors/forum-selector'
import {
  clearAddCommentErrorState,
  clearUpdateCommentErrorState,
} from '../../../store/slices/forum-slice'
import { ConfirmModal } from '../../Modal/ConfirmModal'
import {
  onDeleteForumComment,
  onGetForumComments,
} from '../../../store/thunks/forum-thunk'
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { useCurrentPage } from '../../../hooks/useCurrentPage'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

interface CommentActionsProps {
  message: string | null
  commentId: number
  parentCommentId: number | null
  userId: number
  loadReplies: () => void
}

export const CommentActions: FC<CommentActionsProps> = ({
  message,
  userId,
  commentId,
  parentCommentId,
  loadReplies,
}) => {
  const currentUserId = useAppSelector(selectCurrentUserId)
  const lastAddedCommentId = useAppSelector(selectForumLastTouchedCommentId)
  const actionsRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()
  const currentPage = useCurrentPage()
  const topicId = useIntegerParams('topicId')

  // add, get, update, delete states
  const addCommentState = useAppSelector(state =>
    selectForumAddGetCommentsStateByParentId(state, commentId)
  )
  const deleteCommentState = useAppSelector(state =>
    selectForumDeleteCommentsStateById(state, commentId)
  )
  const updateCommentState = useAppSelector(state =>
    selectForumUpdateCommentsStateById(state, commentId)
  )
  const getCommentsState = useAppSelector(state =>
    selectForumCommentsByParentId(state, commentId)
  )

  // scroll
  useEffect(() => {
    if (commentId === lastAddedCommentId) {
      actionsRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    }
  }, [commentId, lastAddedCommentId])

  // open-close reply and edit
  const [addCommentEnabled, setAddCommentEnabled] = useState(false)
  const [editCommentEnabled, setEditCommentEnabled] = useState(false)

  const openCommentReplyInput = () => {
    if (editCommentEnabled) {
      hideCommentEditInput()
    }
    setAddCommentEnabled(true)
  }

  const openCommentEditInput = () => {
    if (addCommentEnabled) {
      hideCommentReplyInput()
    }
    setEditCommentEnabled(true)
  }

  const hideCommentReplyInput = () => {
    setAddCommentEnabled(false)
    if (addCommentState?.errorMessage) {
      dispatch(clearAddCommentErrorState(commentId))
    }
  }

  const hideCommentEditInput = () => {
    setEditCommentEnabled(false)
    if (updateCommentState?.errorMessage) {
      dispatch(clearUpdateCommentErrorState(commentId))
    }
  }

  // delete comment confirmation modal
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const openModal = () => setModalIsOpened(true)
  const closeModal = () => setModalIsOpened(false)

  // delete comment handler
  const handleCommentDelete = () => {
    if (addCommentEnabled) {
      hideCommentReplyInput()
    }
    if (editCommentEnabled) {
      hideCommentEditInput()
    }
    closeModal()

    dispatch(onDeleteForumComment(commentId)).then(res => {
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
      }
    })
  }

  return (
    <div ref={actionsRef}>
      <div className={styles.actions}>
        {message && (
          <>
            <ReplyIcon replyHandler={openCommentReplyInput} />
            {userId === currentUserId && (
              <UpdateDeleteIcons
                editHandler={openCommentEditInput}
                deleteHandler={openModal}
              />
            )}
          </>
        )}
        {(getCommentsState?.isLoading || deleteCommentState?.isLoading) && (
          <Loader />
        )}
        {deleteCommentState?.errorMessage && (
          <p className={styles.form_error}>{deleteCommentState.errorMessage}</p>
        )}
      </div>
      {editCommentEnabled && (
        <EditForumComment
          commentId={commentId}
          parentCommentId={parentCommentId}
          message={message || ''}
          handleFormReset={hideCommentEditInput}
        />
      )}
      {addCommentEnabled && (
        <div className={styles.new_comment}>
          <AddForumComment
            handleFormReset={hideCommentReplyInput}
            onCommentAdded={loadReplies}
            parentCommentId={commentId}
            errorMessage={addCommentState?.errorMessage || null}
          />
        </div>
      )}
      {modalIsOpened && (
        <ConfirmModal
          confirmHandler={handleCommentDelete}
          cancelHandler={closeModal}
          message="Вы действительно хотите удалить комментарий?"
        />
      )}
    </div>
  )
}
