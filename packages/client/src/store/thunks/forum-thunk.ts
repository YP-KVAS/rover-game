import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addForumCategory,
  addForumComment,
  addForumTopic,
  deleteForumCategory,
  deleteForumComment,
  deleteForumTopic,
  getForumCategories,
  getForumComments,
  getForumTopics,
  updateForumCategory,
  updateForumComment,
  updateForumTopic,
} from '../../utils/rest-api/forum-api'
import {
  AddForumComment,
  IAddTopic,
  IForumCategory,
  IForumComment,
  IForumTopic,
  IGetForumTopic,
  IUpdateForumTopic,
  UpdateForumComment,
} from '../../utils/types/forum'
import { UserRolesEnum } from '../../utils/const-variables/user-roles'
import { getUserRole } from '../../utils/rest-api/user-api'

export const onGetForumCategories = createAsyncThunk<
  Array<IForumCategory>,
  void,
  { rejectValue: string }
>('forum/onGetForumCategories', async (_, { rejectWithValue }) => {
  try {
    return await getForumCategories()
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Ошибка при загрузке категорий'
    )
  }
})

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
  IGetForumTopic,
  { rejectValue: string }
>('forum/onGetForumTopics', async (topic, { rejectWithValue }) => {
  try {
    return await getForumTopics(topic)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось загрузить топики'
    )
  }
})

export const onAddForumTopic = createAsyncThunk<
  IForumTopic,
  IAddTopic,
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
  IUpdateForumTopic,
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
  Array<IForumComment>,
  number | null,
  { rejectValue: string }
>('forum/onGetForumComments', async (parentCommentId, { rejectWithValue }) => {
  try {
    return await getForumComments(parentCommentId)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось загрузить комментарии'
    )
  }
})

export const onAddForumComment = createAsyncThunk<
  IForumComment,
  AddForumComment,
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
  UpdateForumComment,
  { rejectValue: string }
>('forum/onUpdateForumComment', async (comment, { rejectWithValue }) => {
  try {
    return await updateForumComment(comment)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Ошибка при изменении комментария'
    )
  }
})

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
