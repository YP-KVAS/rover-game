import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addForumCategory,
  addForumComment,
  addForumTopic,
  deleteForumCategory,
  deleteForumComment,
  deleteForumTopic,
  updateForumCategory,
  updateForumComment,
  updateForumTopic,
} from '../../utils/rest-api/forum-api'
import {
  IAddForumCommentQuery,
  IAddForumTopicQuery,
  IForumCategory,
  IForumComment,
  IForumTopic,
  IGetForumCommentsQuery,
  IForumComments,
  IGetForumTopicsQuery,
  IUpdateForumTopicQuery,
} from '../../utils/types/forum'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { getUserRole } from '../../utils/rest-api/user-api'
import { RootState } from '../store'
import { IThunkService } from '../services/ThunkService'

export const onGetForumCategories = createAsyncThunk<
  Array<IForumCategory>,
  void,
  { rejectValue: string }
>(
  'forum/onGetForumCategories',
  async (_, thunkAPI) => {
    try {
      const service = thunkAPI.extra as IThunkService
      return await service.forumService.getCategories()
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(
        (err as Error).message || 'Ошибка при загрузке категорий'
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const state = getState() as RootState
      const categoriesAreLoading =
        state.forum.categories.getCategoriesState.isLoading
      if (categoriesAreLoading) {
        return false
      }
    },
  }
)

export const onAddForumCategory = createAsyncThunk<
  IForumCategory,
  string,
  { rejectValue: string }
>('forum/onAddForumCategory', async (name, { rejectWithValue }) => {
  try {
    return await addForumCategory(name)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'При добавлении новой категории возникла ошибка'
    )
  }
})

export const onUpdateForumCategory = createAsyncThunk<
  IForumCategory,
  { id: number; name: string },
  { rejectValue: string }
>('forum/onUpdateForumCategory', async ({ id, name }, { rejectWithValue }) => {
  try {
    return await updateForumCategory(id, name)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось изменить название категории'
    )
  }
})

export const onDeleteForumCategory = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('forum/onDeleteForumCategory', async (id, { rejectWithValue }) => {
  try {
    return await deleteForumCategory(id)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось удалить категорию'
    )
  }
})

export const onGetForumTopics = createAsyncThunk<
  Array<IForumTopic>,
  IGetForumTopicsQuery,
  { rejectValue: string }
>(
  'forum/onGetForumTopics',
  async (topicsQuery, thunkAPI) => {
    try {
      const service = thunkAPI.extra as IThunkService
      return await service.forumService.getTopics(topicsQuery)
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(
        (err as Error).message || 'Не удалось загрузить топики'
      )
    }
  },
  {
    condition: (topicsQuery: IGetForumTopicsQuery, { getState }) => {
      const state = getState() as RootState
      const categoryId = topicsQuery.categoryId
      const topicsAreLoading =
        state.forum.topicInfo.topics[categoryId]?.isLoading
      if (
        topicsAreLoading &&
        (!topicsQuery.offset || topicsQuery.offset === 0) &&
        !topicsQuery.search
      ) {
        return false
      }
    },
  }
)

export const onAddForumTopic = createAsyncThunk<
  IForumTopic,
  IAddForumTopicQuery,
  { rejectValue: string }
>('forum/onAddForumTopic', async (newTopic, { rejectWithValue }) => {
  try {
    return await addForumTopic(newTopic)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'При добавлении новой темы возникла ошибка'
    )
  }
})

export const onUpdateForumTopic = createAsyncThunk<
  IForumTopic,
  IUpdateForumTopicQuery,
  { rejectValue: string }
>('forum/onUpdateForumTopic', async (topic, { rejectWithValue }) => {
  try {
    return await updateForumTopic(topic)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось изменить название темы'
    )
  }
})

export const onDeleteForumTopic = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('forum/onDeleteForumTopic', async (id, { rejectWithValue }) => {
  try {
    return await deleteForumTopic(id)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Не удалось удалить тему')
  }
})

export const onGetForumComments = createAsyncThunk<
  IForumComments,
  IGetForumCommentsQuery,
  { rejectValue: string }
>(
  'forum/onGetForumComments',
  async (commentsQuery, thunkAPI) => {
    try {
      const service = thunkAPI.extra as IThunkService
      return await service.forumService.getComments(commentsQuery)
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(
        (err as Error).message || 'Не удалось загрузить комментарии'
      )
    }
  },
  {
    condition: (commentsQuery: IGetForumCommentsQuery, { getState }) => {
      const state = getState() as RootState
      const parentId = commentsQuery.parentCommentId || 0
      const commentsAreLoading =
        state.forum.commentInfo.comments[parentId]?.isLoading
      if (
        commentsAreLoading &&
        (!commentsQuery.offset || commentsQuery.offset === 0)
      ) {
        return false
      }
    },
  }
)

export const onAddForumComment = createAsyncThunk<
  IForumComment,
  IAddForumCommentQuery,
  { rejectValue: string }
>('forum/onAddForumComment', async (comment, { rejectWithValue }) => {
  try {
    return await addForumComment(comment)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Ошибка при добавлении нового комментария'
    )
  }
})

export const onUpdateForumComment = createAsyncThunk<
  IForumComment,
  { id: number; message: string },
  { rejectValue: string }
>(
  'forum/onUpdateForumComment',
  async ({ id, message }, { rejectWithValue }) => {
    try {
      return await updateForumComment(id, message)
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Ошибка при изменении комментария'
      )
    }
  }
)

export const onDeleteForumComment = createAsyncThunk<
  void,
  number,
  { rejectValue: string }
>('forum/onDeleteForumComment', async (id, { rejectWithValue }) => {
  try {
    return await deleteForumComment(id)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'При удалении комментария возникла ошибка'
    )
  }
})

export const onGetUserRole = createAsyncThunk<
  { role: UserRolesEnum },
  number,
  { rejectValue: string }
>('forum/onGetUserRole', async (userId, { rejectWithValue }) => {
  try {
    return await getUserRole(userId)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось получить роль пользователя'
    )
  }
})
