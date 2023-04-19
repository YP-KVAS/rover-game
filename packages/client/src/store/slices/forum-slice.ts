import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IForumCategory,
  IForumComment,
  IForumTopic,
} from '../../utils/types/forum'
import {
  onAddForumComment,
  onAddForumTopic,
  onDeleteForumTopic,
  onGetForumCategories,
  onGetForumComments,
  onGetForumTopics,
  onUpdateForumTopic,
} from '../thunks/forum-thunk'

interface CategoryState extends FetchState {
  categoryItems: Array<IForumCategory> | null
}

interface TopicState extends FetchState {
  topicItems: Array<IForumTopic> | null
}

interface CommentState extends FetchState {
  commentItems: Array<IForumComment> | null
}

interface AddCommentState extends FetchState {
  lastAddedCommentId: number | null
  lastAddedParentCommentId: number | null
}

interface ChangeTopicState extends FetchState {
  lastAddedTopicId: number | null
}

interface InitialState {
  categories: CategoryState
  topicInfo: {
    topics: Record<number, TopicState>
    topicState: ChangeTopicState
  }
  commentInfo: {
    comments: Record<number, CommentState>
    lastAddedCommentState: AddCommentState
  }
}

const initialState: InitialState = {
  categories: {
    isLoading: false,
    errorMessage: null,
    categoryItems: null,
  },
  topicInfo: {
    topics: {},
    topicState: {
      isLoading: false,
      errorMessage: null,
      lastAddedTopicId: null,
    },
  },
  commentInfo: {
    comments: {},
    lastAddedCommentState: {
      isLoading: false,
      errorMessage: null,
      lastAddedCommentId: null,
      lastAddedParentCommentId: null,
    },
  },
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearForumComments: state => {
      state.commentInfo = initialState.commentInfo
    },
    clearLastAddedCommentError: state => {
      state.commentInfo.lastAddedCommentState.lastAddedParentCommentId = null
      state.commentInfo.lastAddedCommentState.errorMessage = null
    },
    clearLastAddedTopicError: state => {
      state.topicInfo.topicState.errorMessage = null
      state.topicInfo.topicState.lastAddedTopicId = null
    },
  },
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
      .addCase(onGetForumTopics.fulfilled, (state, action) => {
        const id = action.meta.arg
        state.topicInfo.topics[id] = {
          isLoading: false,
          errorMessage: null,
          topicItems: action.payload,
        }
      })
      .addCase(onGetForumTopics.pending, (state, action) => {
        const id = action.meta.arg
        if (!state.topicInfo.topics[id]) {
          state.topicInfo.topics[id] = {
            isLoading: true,
            errorMessage: null,
            topicItems: null,
          }
        } else {
          state.topicInfo.topics[id].isLoading = true
          state.topicInfo.topics[id].errorMessage = null
        }
      })
      .addCase(onGetForumTopics.rejected, (state, action) => {
        const id = action.meta.arg
        state.topicInfo.topics[id].isLoading = false
        state.topicInfo.topics[id].errorMessage = action.payload || null
      })

    // onAddForumTopic
    builder
      .addCase(onAddForumTopic.fulfilled, (state, action) => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = action.payload.id
      })
      .addCase(onAddForumTopic.pending, state => {
        state.topicInfo.topicState.isLoading = true
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = null
      })
      .addCase(onAddForumTopic.rejected, (state, action) => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = action.payload || null
        state.topicInfo.topicState.lastAddedTopicId = null
      })

    // onUpdateForumTopic
    builder
      .addCase(onUpdateForumTopic.fulfilled, (state, action) => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = action.payload.id
      })
      .addCase(onUpdateForumTopic.pending, state => {
        state.topicInfo.topicState.isLoading = true
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = null
      })
      .addCase(onUpdateForumTopic.rejected, (state, action) => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = action.payload || null
        state.topicInfo.topicState.lastAddedTopicId = null
      })

    // onDeleteForumTopic
    builder
      .addCase(onDeleteForumTopic.fulfilled, state => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = null
      })
      .addCase(onDeleteForumTopic.pending, state => {
        state.topicInfo.topicState.isLoading = true
        state.topicInfo.topicState.errorMessage = null
        state.topicInfo.topicState.lastAddedTopicId = null
      })
      .addCase(onDeleteForumTopic.rejected, (state, action) => {
        state.topicInfo.topicState.isLoading = false
        state.topicInfo.topicState.errorMessage = action.payload || null
        state.topicInfo.topicState.lastAddedTopicId = null
      })

    // onGetForumComments
    builder
      .addCase(onGetForumComments.fulfilled, (state, action) => {
        const id = action.meta.arg || 0
        state.commentInfo.comments[id].isLoading = false
        state.commentInfo.comments[id].errorMessage = null
        state.commentInfo.comments[id].commentItems = action.payload
      })
      .addCase(onGetForumComments.pending, (state, action) => {
        const id = action.meta.arg || 0
        if (!state.commentInfo.comments[id]) {
          state.commentInfo.comments[id] = {
            isLoading: true,
            errorMessage: null,
            commentItems: null,
          }
        } else {
          state.commentInfo.comments[id].isLoading = true
          state.commentInfo.comments[id].errorMessage = null
        }
      })
      .addCase(onGetForumComments.rejected, (state, action) => {
        const id = action.meta.arg || 0
        state.commentInfo.comments[id].isLoading = false
        state.commentInfo.comments[id].errorMessage = action.payload || null
      })

    // onAddForumComment
    builder
      .addCase(onAddForumComment.fulfilled, (state, action) => {
        state.commentInfo.lastAddedCommentState.isLoading = false
        state.commentInfo.lastAddedCommentState.errorMessage = null
        state.commentInfo.lastAddedCommentState.lastAddedCommentId =
          action.payload.id
        state.commentInfo.lastAddedCommentState.lastAddedParentCommentId =
          action.meta.arg.parent_comment_id
      })
      .addCase(onAddForumComment.pending, state => {
        state.commentInfo.lastAddedCommentState.isLoading = true
        state.commentInfo.lastAddedCommentState.errorMessage = null
        state.commentInfo.lastAddedCommentState.lastAddedCommentId = null
        state.commentInfo.lastAddedCommentState.lastAddedParentCommentId = null
      })
      .addCase(onAddForumComment.rejected, (state, action) => {
        state.commentInfo.lastAddedCommentState.isLoading = false
        state.commentInfo.lastAddedCommentState.errorMessage =
          action.payload || null
        state.commentInfo.lastAddedCommentState.lastAddedCommentId = null
        state.commentInfo.lastAddedCommentState.lastAddedParentCommentId =
          action.meta.arg.parent_comment_id
      })
  },
})

export const forumReducer = forumSlice.reducer
export const {
  clearForumComments,
  clearLastAddedCommentError,
  clearLastAddedTopicError,
} = forumSlice.actions
