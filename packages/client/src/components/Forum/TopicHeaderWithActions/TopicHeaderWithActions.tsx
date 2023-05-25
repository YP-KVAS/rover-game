import { FC, useState } from 'react'
import styles from '../../../pages/Forum/Forum.module.scss'
import { UpdateDeleteIcons } from '../CrudIcons/UpdateDeleteIcons'
import { EditForumTopic } from '../EditForumItems/EditForumTopic'
import { useAppDispatch, useAppSelector } from '../../../hooks/useStore'
import { selectCurrentUserId } from '../../../store/selectors/user-selector'
import { ConfirmModal } from '../../Modal/ConfirmModal'
import {
  onDeleteForumTopic,
  onGetForumTopics,
} from '../../../store/thunks/forum-thunk'
import { RoutesEnum } from '../../../utils/const-variables/routes'
import { useIntegerParams } from '../../../hooks/useIntegerParams'
import { useNavigate } from 'react-router-dom'
import { selectForumDeleteTopicState } from '../../../store/selectors/forum-selector'

interface TopicHeaderWithActions {
  topicName?: string | null
  topicUserId: number
}

export const TopicHeaderWithActions: FC<TopicHeaderWithActions> = ({
  topicName,
  topicUserId,
}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const categoryId = useIntegerParams('categoryId')
  const topicId = useIntegerParams('topicId')

  const currentUserId = useAppSelector(selectCurrentUserId)
  const { errorMessage: deleteErrorMessage } = useAppSelector(
    selectForumDeleteTopicState
  )

  // open-close edit
  const [topicEditEnabled, setTopicEditEnabled] = useState(false)
  const enableTopicEdit = () => setTopicEditEnabled(true)
  const hideTopicEdit = () => setTopicEditEnabled(false)

  // delete topic confirmation modal
  const [modalIsOpened, setModalIsOpened] = useState(false)
  const openModal = () => setModalIsOpened(true)
  const closeModal = () => setModalIsOpened(false)

  // delete comment handler
  const handleTopicDelete = () => {
    closeModal()
    dispatch(onDeleteForumTopic(topicId)).then(res => {
      if (res.type.endsWith('fulfilled')) {
        dispatch(
          onGetForumTopics({
            categoryId: categoryId,
          })
        )
        navigate(
          RoutesEnum.FORUM_CATEGORY.replace(
            ':categoryId',
            categoryId.toString()
          )
        )
      }
    })
  }

  return (
    <>
      <div className={styles.header}>
        <h3 style={{ wordBreak: 'break-word' }}>
          Комментарии к теме "{topicName || 'Без названия'}"
        </h3>
        {topicUserId === currentUserId && (
          <UpdateDeleteIcons
            editHandler={enableTopicEdit}
            deleteHandler={openModal}
          />
        )}
      </div>
      {topicEditEnabled && (
        <EditForumTopic
          handleFormReset={hideTopicEdit}
          currentTopicName={topicName || ''}
        />
      )}
      {deleteErrorMessage && (
        <span className={styles.error}>{deleteErrorMessage}</span>
      )}
      {modalIsOpened && (
        <ConfirmModal
          confirmHandler={handleTopicDelete}
          cancelHandler={closeModal}
          message="Вы действительно хотите удалить данную тему и все её сообщения?"
        />
      )}
    </>
  )
}
