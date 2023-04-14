import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IForumCategory } from '../../utils/types/forum'
import { onGetForumCategories } from '../thunks/forum-thunk'

interface CategoryState extends FetchState {
  categoryItems: Array<IForumCategory> | null
}

interface InitialState {
  categories: CategoryState
}

const initialState: InitialState = {
  categories: {
    isLoading: false,
    errorMessage: null,
    categoryItems: null,
  },
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // onGetForumCategories
    builder
      .addCase(
        onGetForumCategories.fulfilled,
        (state, action: PayloadAction<Array<IForumCategory>>) => {
          state.categories.isLoading = false
          state.categories.errorMessage = null
          state.categories.categoryItems = action.payload
        }
      )
      .addCase(onGetForumCategories.pending, state => {
        state.categories.isLoading = true
        state.categories.errorMessage = null
      })
      .addCase(onGetForumCategories.rejected, (state, action) => {
        state.categories.isLoading = false
        state.categories.errorMessage = action.payload || null
      })
  },
})

export const forumReducer = forumSlice.reducer
