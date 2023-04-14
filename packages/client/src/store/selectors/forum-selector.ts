import { RootState } from '../store'

export const selectForumCategories = (state: RootState) =>
  state.forum.categories
