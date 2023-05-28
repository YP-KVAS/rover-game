import styles from '../Forum.module.scss'
import { FC, useEffect, useRef, useState, MouseEvent } from 'react'
import { ReplyIcon } from '../CrudIcons/ReplyIcon'
import { UpdateDeleteIcons } from '../CrudIcons/UpdateDeleteIcons'
import { EmojiIcons } from '../CrudIcons/EmojiIcons'
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
  onUpdateForumComment,
} from '../../../store/thunks/forum-thunk'
import { COMMENTS_LOAD_LIMIT } from '../../../utils/const-variables/api'
import { EmojiEnum } from '../../../utils/const-variables/emoji'
import { useCurrentPage } from '../../../hooks/useCurrentPage'
import { useIntegerParams } from '../../../hooks/useIntegerParams'

interface CommentActionsProps {
  message: string | null
  commentId: number
  parentCommentId: number | null
  userId: number
  loadReplies: () => void
  emojiHappyFace: number
  emojiSadFace: number
  emojiAngryFace: number
  emojiLike: number
  emojiDislike: number
}

export const CommentActions: FC<CommentActionsProps> = ({
  message,
  userId,
  commentId,
  parentCommentId,
  loadReplies,
  emojiHappyFace,
  emojiSadFace,
  emojiAngryFace,
  emojiLike,
  emojiDislike,
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

  const handleEmojiIcons = (e: MouseEvent) => {
    if (message) {
      let data = {
        id: commentId,
        message: message,
        emojiHappyFace: emojiHappyFace,
        emojiSadFace: emojiSadFace,
        emojiAngryFace: emojiAngryFace,
        emojiLike: emojiLike,
        emojiDislike: emojiDislike,
      }

      switch((e.currentTarget as HTMLDivElement).id) {
        case EmojiEnum.HAPPY_FACE:
          data.emojiHappyFace = data.emojiHappyFace+1
          break
        case EmojiEnum.SAD_FACE:
          data.emojiSadFace = data.emojiSadFace+1
          break
        case EmojiEnum.ANGRY_FACE:
          data.emojiAngryFace = data.emojiAngryFace+1
          break
        case EmojiEnum.LIKE:
          data.emojiLike = data.emojiLike+1
          break
        case EmojiEnum.DISLIKE:
          data.emojiDislike = data.emojiDislike+1
          break
      }

      console.log(e.currentTarget)
      //console.log(e.target)
      //console.log(e)
    //  console.log(typeof e.target)

    dispatch(
      onUpdateForumComment(data)
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
      }
    })
  }
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
            <EmojiIcons
              emojiIconsHandler={handleEmojiIcons}
              emojiHappyFace={emojiHappyFace}
              emojiSadFace={emojiSadFace}
              emojiAngryFace={emojiAngryFace}
              emojiLike={emojiLike}
              emojiDislike={emojiDislike}
            />
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
