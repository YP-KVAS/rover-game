import { RootState } from '../store'

export const selectForumCategories = (state: RootState) =>
  state.forum.categories

export const selectForumTopics = (state: RootState) => state.forum.topics

export const selectCategoryNameById = (
  state: RootState,
  id: number
): string | null =>
  state.forum.categories.categoryItems?.find(cat => cat.id === id)?.name || null

export const selectAddTopicState = (state: RootState) =>
  state.forum.topics.addTopicState
