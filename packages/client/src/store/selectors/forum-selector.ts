import { RootState } from '../store'
import { IForumCategory } from '../../utils/types/forum'
import { FetchState } from '../slices/slices-types'

// categories
export const selectForumCategories = (state: RootState) =>
  state.forum.categories.categoryItems

export const selectGetForumCategoriesState = (state: RootState) =>
  state.forum.categories.getCategoriesState

export const selectAddForumCategoryState = (state: RootState) =>
  state.forum.categories.addCategoryState

export const selectUpdateForumCategoryState = (
  state: RootState,
  id: number
) => {
  const categoryState = state.forum.categories.fetchStates[id]?.update
  if (!categoryState) {
    return null
  }
  return {
    isLoading: categoryState.isLoading,
    errorMessage: categoryState.errorMessage,
  }
}

export const selectDeleteForumCategoryState = (
  state: RootState,
  id: number
) => {
  const categoryState = state.forum.categories.fetchStates[id]?.delete
  if (!categoryState) {
    return null
  }
  return {
    isLoading: categoryState.isLoading,
    errorMessage: categoryState.errorMessage,
  }
}

export const selectForumLastTouchedCategoryId = (state: RootState) =>
  state.forum.categories.lastTouchedCategoryId

// topics
export const selectForumTopicsByCategoryId = (
  state: RootState,
  categoryId: number
) => state.forum.topicInfo.topics[categoryId]

export const selectForumAddTopicState = (state: RootState) =>
  state.forum.topicInfo.addTopicState

export const selectForumUpdateTopicState = (state: RootState) =>
  state.forum.topicInfo.updateTopicState

export const selectForumDeleteTopicState = (state: RootState) =>
  state.forum.topicInfo.deleteTopicState

export const selectForumLastTouchedTopicId = (state: RootState) =>
  state.forum.topicInfo.lastTouchedTopicId

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

export const selectForumTopicSearchQuery = (state: RootState) =>
  state.forum.topicInfo.searchQuery

// comments
export const selectForumCommentsByParentId = (
  state: RootState,
  parentId: number
) => state.forum.commentInfo.comments[parentId]

export const selectForumCommentsTotal = (state: RootState) =>
  state.forum.commentInfo.total

export const selectForumAddGetCommentsStateByParentId = (
  state: RootState,
  parentId: number
): FetchState | null => {
  const commentsState = state.forum.commentInfo.comments[parentId]
  if (!commentsState) {
    return null
  }
  return {
    isLoading: commentsState.isLoading,
    errorMessage: commentsState.errorMessage,
  }
}

export const selectForumUpdateCommentsStateById = (
  state: RootState,
  id: number
): FetchState | null => {
  const commentState = state.forum.commentInfo.fetchStates[id]?.update
  if (!commentState) {
    return null
  }
  return {
    isLoading: commentState.isLoading,
    errorMessage: commentState.errorMessage,
  }
}

export const selectForumDeleteCommentsStateById = (
  state: RootState,
  id: number
): FetchState | null => {
  const commentState = state.forum.commentInfo.fetchStates[id]?.delete
  if (!commentState) {
    return null
  }
  return {
    isLoading: commentState.isLoading,
    errorMessage: commentState.errorMessage,
  }
}

export const selectForumAddTopLevelCommentState = (state: RootState) =>
  state.forum.commentInfo.addTopLevelCommentState

export const selectForumLastTouchedCommentId = (state: RootState) =>
  state.forum.commentInfo.lastTouchedCommentId
