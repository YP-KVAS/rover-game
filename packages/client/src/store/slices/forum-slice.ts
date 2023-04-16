import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IForumCategory, IForumTopic } from '../../utils/types/forum'
import {
  onAddForumTopic,
  onGetForumCategories,
  onGetForumTopics,
} from '../thunks/forum-thunk'

interface CategoryState extends FetchState {
  categoryItems: Array<IForumCategory> | null
}

interface TopicState extends FetchState {
  topicItems: Array<IForumTopic> | null
  addTopicState: FetchState
}

const defaultTopicState: TopicState = {
  isLoading: false,
  errorMessage: null,
  topicItems: null,
  addTopicState: {
    isLoading: false,
    errorMessage: null,
  },
}

interface InitialState {
  categories: CategoryState
  topics: TopicState
}

const initialState: InitialState = {
  categories: {
    isLoading: false,
    errorMessage: null,
    categoryItems: null,
  },
  topics: defaultTopicState,
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

    // onGetForumTopics
    builder
      .addCase(
        onGetForumTopics.fulfilled,
        (state, action: PayloadAction<Array<IForumTopic>>) => {
          state.topics.isLoading = false
          state.topics.errorMessage = null
          state.topics.topicItems = action.payload
        }
      )
      .addCase(onGetForumTopics.pending, state => {
        state.topics.isLoading = true
        state.topics.errorMessage = null
      })
      .addCase(onGetForumTopics.rejected, (state, action) => {
        state.topics.isLoading = false
        state.topics.errorMessage = action.payload || null
      })

    // onAddForumTopic
    builder
      .addCase(onAddForumTopic.fulfilled, state => {
        state.topics.addTopicState.isLoading = false
        state.topics.addTopicState.errorMessage = null
      })
      .addCase(onAddForumTopic.pending, state => {
        state.topics.addTopicState.isLoading = true
        state.topics.addTopicState.errorMessage = null
      })
      .addCase(onAddForumTopic.rejected, (state, action) => {
        state.topics.addTopicState.isLoading = false
        state.topics.addTopicState.errorMessage = action.payload || null
      })
  },
})

export const forumReducer = forumSlice.reducer
