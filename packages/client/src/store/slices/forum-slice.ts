import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  IForumCategory,
  IForumComment,
  IForumTopic,
} from '../../utils/types/forum'
import {
  onAddForumCategory,
  onAddForumComment,
  onAddForumTopic,
  onDeleteForumCategory,
  onDeleteForumComment,
  onDeleteForumTopic,
  onGetForumCategories,
  onGetForumComments,
  onGetForumTopics,
  onUpdateForumCategory,
  onUpdateForumComment,
  onUpdateForumTopic,
} from '../thunks/forum-thunk'

interface TopicState extends FetchState {
  topicItems: Array<IForumTopic> | null
}

interface CommentState extends FetchState {
  commentItems: Array<IForumComment> | null
}

interface InitialState {
  categories: {
    categoryItems: Array<IForumCategory> | null
    lastTouchedCategoryId: number | null
    getCategoriesState: FetchState
    addCategoryState: FetchState
    updateCategoryState: FetchState
    deleteCategoryState: FetchState
  }
  topicInfo: {
    topics: Record<number, TopicState>
    lastTouchedTopicId: number | null
    addTopicState: FetchState
    updateTopicState: FetchState
    deleteTopicState: FetchState
  }
  commentInfo: {
    comments: Record<number, CommentState>
    fetchStates: Record<number, { update: FetchState; delete: FetchState }>
    addTopLevelCommentState: FetchState
    lastTouchedCommentId: number | null
  }
}

const defaultFetchState: FetchState = {
  isLoading: false,
  errorMessage: null,
}

const initialState: InitialState = {
  categories: {
    categoryItems: null,
    lastTouchedCategoryId: null,
    getCategoriesState: defaultFetchState,
    addCategoryState: defaultFetchState,
    updateCategoryState: defaultFetchState,
    deleteCategoryState: defaultFetchState,
  },
  topicInfo: {
    topics: {},
    lastTouchedTopicId: null,
    addTopicState: defaultFetchState,
    updateTopicState: defaultFetchState,
    deleteTopicState: defaultFetchState,
  },
  commentInfo: {
    comments: {},
    fetchStates: {},
    lastTouchedCommentId: null,
    addTopLevelCommentState: defaultFetchState,
  },
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    clearForumCategoriesState: state => {
      state.categories.lastTouchedCategoryId = null
      state.categories.getCategoriesState = defaultFetchState
      state.categories.addCategoryState = defaultFetchState
      state.categories.updateCategoryState = defaultFetchState
      state.categories.deleteCategoryState = defaultFetchState
    },
    clearGetCategoriesState: state => {
      state.categories.getCategoriesState = defaultFetchState
    },
    clearAddCategoryState: state => {
      state.categories.addCategoryState = defaultFetchState
    },
    clearUpdateCategoryState: state => {
      state.categories.updateCategoryState = defaultFetchState
    },
    clearForumComments: state => {
      state.commentInfo = initialState.commentInfo
    },
    clearAddCommentErrorState: (state, action: PayloadAction<number>) => {
      if (state.commentInfo.comments[action.payload]) {
        state.commentInfo.comments[action.payload].errorMessage = null
      }
    },
    clearUpdateCommentErrorState: (state, action: PayloadAction<number>) => {
      if (state.commentInfo.fetchStates[action.payload]) {
        state.commentInfo.fetchStates[action.payload].update = defaultFetchState
      }
    },
    clearDeleteCommentErrorState: (state, action: PayloadAction<number>) => {
      if (state.commentInfo.fetchStates[action.payload]) {
        state.commentInfo.fetchStates[action.payload].delete = defaultFetchState
      }
    },
    clearAddTopLevelCommentErrorState: state => {
      state.commentInfo.addTopLevelCommentState = defaultFetchState
    },
    clearAddTopicState: state => {
      state.topicInfo.addTopicState = defaultFetchState
    },
    clearUpdateTopicState: state => {
      state.topicInfo.updateTopicState = defaultFetchState
    },
    clearTopicInfoState: state => {
      state.topicInfo.lastTouchedTopicId = null
      state.topicInfo.addTopicState = defaultFetchState
      state.topicInfo.updateTopicState = defaultFetchState
      state.topicInfo.deleteTopicState = defaultFetchState
    },
  },
  extraReducers: builder => {
    // onGetForumCategories
    builder
      .addCase(
        onGetForumCategories.fulfilled,
        (state, action: PayloadAction<Array<IForumCategory>>) => {
          state.categories.getCategoriesState.isLoading = false
          state.categories.getCategoriesState.errorMessage = null
          state.categories.categoryItems = action.payload
        }
      )
      .addCase(onGetForumCategories.pending, state => {
        state.categories.getCategoriesState.isLoading = true
        state.categories.getCategoriesState.errorMessage = null
      })
      .addCase(onGetForumCategories.rejected, (state, action) => {
        state.categories.getCategoriesState.isLoading = false
        state.categories.getCategoriesState.errorMessage =
          action.payload || null
      })

    // onAddForumCategory
    builder
      .addCase(onAddForumCategory.fulfilled, (state, action) => {
        state.categories.addCategoryState.isLoading = false
        state.categories.addCategoryState.errorMessage = null
        state.categories.lastTouchedCategoryId = action.payload.id
      })
      .addCase(onAddForumCategory.pending, state => {
        state.categories.addCategoryState.isLoading = true
        state.categories.addCategoryState.errorMessage = null
      })
      .addCase(onAddForumCategory.rejected, (state, action) => {
        state.categories.addCategoryState.isLoading = false
        state.categories.addCategoryState.errorMessage = action.payload || null
      })

    // onUpdateForumCategory
    builder
      .addCase(onUpdateForumCategory.fulfilled, (state, action) => {
        state.categories.updateCategoryState.isLoading = false
        state.categories.updateCategoryState.errorMessage = null
        state.categories.lastTouchedCategoryId = action.payload.id
      })
      .addCase(onUpdateForumCategory.pending, state => {
        state.categories.updateCategoryState.isLoading = true
        state.categories.updateCategoryState.errorMessage = null
      })
      .addCase(onUpdateForumCategory.rejected, (state, action) => {
        state.categories.updateCategoryState.isLoading = false
        state.categories.updateCategoryState.errorMessage =
          action.payload || null
      })

    // onDeleteForumCategory
    builder
      .addCase(onDeleteForumCategory.fulfilled, state => {
        state.categories.deleteCategoryState.isLoading = false
        state.categories.deleteCategoryState.errorMessage = null
        state.categories.lastTouchedCategoryId = null
      })
      .addCase(onDeleteForumCategory.pending, state => {
        state.categories.deleteCategoryState.isLoading = true
        state.categories.deleteCategoryState.errorMessage = null
      })
      .addCase(onDeleteForumCategory.rejected, (state, action) => {
        state.categories.deleteCategoryState.isLoading = false
        state.categories.deleteCategoryState.errorMessage =
          action.payload || null
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
        state.topicInfo.addTopicState.isLoading = false
        state.topicInfo.addTopicState.errorMessage = null
        state.topicInfo.lastTouchedTopicId = action.payload.id
      })
      .addCase(onAddForumTopic.pending, state => {
        state.topicInfo.addTopicState.isLoading = true
        state.topicInfo.addTopicState.errorMessage = null
      })
      .addCase(onAddForumTopic.rejected, (state, action) => {
        state.topicInfo.addTopicState.isLoading = false
        state.topicInfo.addTopicState.errorMessage = action.payload || null
      })

    // onUpdateForumTopic
    builder
      .addCase(onUpdateForumTopic.fulfilled, (state, action) => {
        state.topicInfo.updateTopicState.isLoading = false
        state.topicInfo.updateTopicState.errorMessage = null
        state.topicInfo.lastTouchedTopicId = action.payload.id
      })
      .addCase(onUpdateForumTopic.pending, state => {
        state.topicInfo.updateTopicState.isLoading = true
        state.topicInfo.updateTopicState.errorMessage = null
      })
      .addCase(onUpdateForumTopic.rejected, (state, action) => {
        state.topicInfo.updateTopicState.isLoading = false
        state.topicInfo.updateTopicState.errorMessage = action.payload || null
      })

    // onDeleteForumTopic
    builder
      .addCase(onDeleteForumTopic.fulfilled, state => {
        state.topicInfo.deleteTopicState.isLoading = false
        state.topicInfo.deleteTopicState.errorMessage = null
        state.topicInfo.lastTouchedTopicId = null
      })
      .addCase(onDeleteForumTopic.pending, state => {
        state.topicInfo.deleteTopicState.isLoading = true
        state.topicInfo.deleteTopicState.errorMessage = null
      })
      .addCase(onDeleteForumTopic.rejected, (state, action) => {
        state.topicInfo.deleteTopicState.isLoading = false
        state.topicInfo.deleteTopicState.errorMessage = action.payload || null
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
        if (!state.commentInfo.comments[id]) {
          state.commentInfo.comments[id] = {
            isLoading: false,
            errorMessage: action.payload || null,
            commentItems: null,
          }
        } else {
          state.commentInfo.comments[id].isLoading = false
          state.commentInfo.comments[id].errorMessage = action.payload || null
        }
      })

    // onAddForumComment
    builder
      .addCase(onAddForumComment.fulfilled, (state, action) => {
        const parentCommentId = action.meta.arg.parent_comment_id
        if (!parentCommentId) {
          state.commentInfo.addTopLevelCommentState.isLoading = false
          state.commentInfo.addTopLevelCommentState.errorMessage = null
        } else {
          state.commentInfo.comments[parentCommentId].isLoading = false
          state.commentInfo.comments[parentCommentId].errorMessage = null
        }
        state.commentInfo.lastTouchedCommentId = action.payload.id
      })
      .addCase(onAddForumComment.pending, (state, action) => {
        const parentCommentId = action.meta.arg.parent_comment_id
        if (!parentCommentId) {
          state.commentInfo.addTopLevelCommentState.isLoading = true
          state.commentInfo.addTopLevelCommentState.errorMessage = null
        } else if (!state.commentInfo.comments[parentCommentId]) {
          state.commentInfo.comments[parentCommentId] = {
            isLoading: true,
            errorMessage: null,
            commentItems: null,
          }
        } else {
          state.commentInfo.comments[parentCommentId].isLoading = true
          state.commentInfo.comments[parentCommentId].errorMessage = null
        }
      })
      .addCase(onAddForumComment.rejected, (state, action) => {
        const parentCommentId = action.meta.arg.parent_comment_id
        if (!parentCommentId) {
          state.commentInfo.addTopLevelCommentState.isLoading = false
          state.commentInfo.addTopLevelCommentState.errorMessage =
            action.payload || null
        } else {
          state.commentInfo.comments[parentCommentId].isLoading = false
          state.commentInfo.comments[parentCommentId].errorMessage =
            action.payload || null
        }
      })

    // onUpdateForumComment
    builder
      .addCase(onUpdateForumComment.fulfilled, (state, action) => {
        const id = action.payload.id
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            update: defaultFetchState,
            delete: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].update = defaultFetchState
        }
        state.commentInfo.lastTouchedCommentId = id
      })
      .addCase(onUpdateForumComment.pending, (state, action) => {
        const id = action.meta.arg.id
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            update: { isLoading: true, errorMessage: null },
            delete: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].update = {
            isLoading: true,
            errorMessage: null,
          }
        }
      })
      .addCase(onUpdateForumComment.rejected, (state, action) => {
        const id = action.meta.arg.id
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            update: { isLoading: false, errorMessage: action.payload || null },
            delete: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].update = {
            isLoading: false,
            errorMessage: action.payload || null,
          }
        }
      })

    // onDeleteForumComment
    builder
      .addCase(onDeleteForumComment.fulfilled, (state, action) => {
        const id = action.meta.arg
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            update: defaultFetchState,
            delete: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].delete = defaultFetchState
        }
      })
      .addCase(onDeleteForumComment.pending, (state, action) => {
        const id = action.meta.arg
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            delete: { isLoading: true, errorMessage: null },
            update: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].delete = {
            isLoading: true,
            errorMessage: null,
          }
        }
      })
      .addCase(onDeleteForumComment.rejected, (state, action) => {
        const id = action.meta.arg
        if (!state.commentInfo.fetchStates[id]) {
          state.commentInfo.fetchStates[id] = {
            delete: { isLoading: false, errorMessage: action.payload || null },
            update: defaultFetchState,
          }
        } else {
          state.commentInfo.fetchStates[id].delete = {
            isLoading: false,
            errorMessage: action.payload || null,
          }
        }
      })
  },
})

export const forumReducer = forumSlice.reducer
export const {
  clearForumCategoriesState,
  clearGetCategoriesState,
  clearAddCategoryState,
  clearUpdateCategoryState,
  clearForumComments,
  clearAddCommentErrorState,
  clearUpdateCommentErrorState,
  clearDeleteCommentErrorState,
  clearAddTopLevelCommentErrorState,
  clearAddTopicState,
  clearUpdateTopicState,
  clearTopicInfoState,
} = forumSlice.actions
