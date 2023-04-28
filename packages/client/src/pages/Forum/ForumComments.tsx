import styles from './Forum.module.scss'
import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import {
  onGetForumComments,
  onGetForumTopics,
} from '../../store/thunks/forum-thunk'
import {
  selectForumCommentsByParentId,
  selectForumCommentsTotal,
  selectForumTopicById,
  selectForumTopicsByCategoryId,
  selectForumTopicSearchQuery,
} from '../../store/selectors/forum-selector'
import { Loader } from '../../components/Loader/Loader'
import { Link } from 'react-router-dom'
import { ForumComment } from '../../components/Forum/ForumComment'
import { clearForumComments } from '../../store/slices/forum-slice'
import { AddForumTopLevelComment } from '../../components/Forum/AddForumItems/AddForumTopLevelComment'
import { Page404 } from '../Page404'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { Title } from '../../components/Title/Title'
import { PageLinks } from '../../components/PageLinks/PageLinks'
import { COMMENTS_LOAD_LIMIT } from '../../utils/const-variables/api'
import { useIntegerParams } from '../../hooks/useIntegerParams'
import { useCurrentPage } from '../../hooks/useCurrentPage'
import { TopicHeaderWithActions } from '../../components/Forum/TopicHeaderWithActions/TopicHeaderWithActions'

export const ForumComments: FC = () => {
  const dispatch = useAppDispatch()
  const categoryId = useIntegerParams('categoryId')
  const topicId = useIntegerParams('topicId')

  const forumCommentsState = useAppSelector(state =>
    selectForumCommentsByParentId(state, 0)
  )
  const topic = useAppSelector(state =>
    selectForumTopicById(state, categoryId, topicId)
  )
  const topicsState = useAppSelector(state =>
    selectForumTopicsByCategoryId(state, categoryId)
  )

  const searchQuery = useAppSelector(selectForumTopicSearchQuery)
  const totalComments = useAppSelector(selectForumCommentsTotal)
  const totalPages = Math.ceil(totalComments / COMMENTS_LOAD_LIMIT)

  const currentPage = useCurrentPage()
  const offset = (currentPage - 1) * COMMENTS_LOAD_LIMIT

  useEffect(() => {
    if (!topic) {
      dispatch(onGetForumTopics({ categoryId, search: searchQuery || '' }))
    }

    dispatch(
      onGetForumComments({
        parentCommentId: null,
        topicId,
        limit: COMMENTS_LOAD_LIMIT,
        offset,
      })
    )

    return () => {
      dispatch(clearForumComments())
    }
  }, [dispatch, topicId, currentPage])

  return topicsState?.isLoading ? (
    <Loader />
  ) : forumCommentsState?.errorMessage ? (
    <strong className={styles.message}>
      {forumCommentsState.errorMessage}
    </strong>
  ) : !topic || currentPage > totalPages ? (
    <Page404 />
  ) : (
    <div className={styles.area}>
      <Title text="Просмотр комментариев" />
      <div className={styles.actions}>
        <Link
          className={styles.link}
          to={RoutesEnum.FORUM_CATEGORY.replace(
            ':categoryId',
            categoryId.toString()
          )}>
          Вернуться к выбору темы
        </Link>
      </div>
      <div className={styles.wrapper}>
        <TopicHeaderWithActions
          topicUserId={topic.userId}
          topicName={topic.name}
        />
        <hr />
        {forumCommentsState?.isLoading && <Loader />}
        <ul className={styles.list}>
          {forumCommentsState?.commentItems?.map(comment => (
            <li key={comment.id} className={styles.list_item}>
              <ForumComment {...comment} />
            </li>
          ))}
        </ul>
        {totalPages > 1 && (
          <PageLinks currentPage={currentPage} maxPage={totalPages} />
        )}
      </div>
      <AddForumTopLevelComment
        totalComments={totalComments}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  )
}
