import { RootState } from '../store'
import { IForumCategory } from '../../utils/types/forum'

export const selectForumCategories = (state: RootState) =>
  state.forum.categories

export const selectForumTopicsByCategoryId = (
  state: RootState,
  categoryId: number
) => state.forum.topicInfo.topics[categoryId]

export const selectForumTopicById = (
  state: RootState,
  categoryId: number,
  topicId: number
) =>
  state.forum.topicInfo.topics[categoryId]?.topicItems?.find(
    topic => topic.id === topicId
  )

export const selectCategoryNameById = (
  state: RootState,
  id: number
): IForumCategory | null =>
  state.forum.categories.categoryItems?.find(cat => cat.id === id) || null

export const selectAddTopicState = (state: RootState) =>
  state.forum.topicInfo.addTopicState

export const selectForumCommentsByParentId = (
  state: RootState,
  parentId: number
) => state.forum.commentInfo.comments[parentId]

export const selectLastAddedCommentState = (state: RootState) =>
  state.forum.commentInfo.lastAddedCommentState
