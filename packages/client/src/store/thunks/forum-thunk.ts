import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addForumComment,
  addForumTopic,
  deleteForumTopic,
  getForumCategories,
  getForumComments,
  getForumTopics,
  updateForumTopic,
} from '../../utils/rest-api/forum-api'
import {
  AddForumComment,
  IForumCategory,
  IForumComment,
  IForumTopic,
  NewTopic,
} from '../../utils/types/forum'

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

export const onGetForumTopics = createAsyncThunk<
  Array<IForumTopic>,
  number,
  { rejectValue: string }
>('forum/onGetForumTopics', async (categoryId, { rejectWithValue }) => {
  try {
    return await getForumTopics(categoryId)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось загрузить топики'
    )
  }
})

export const onAddForumTopic = createAsyncThunk<
  IForumTopic,
  NewTopic & { userId: number },
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
  { topic_name: string },
  { rejectValue: string }
>('forum/onUpdateForumTopic', async ({ topic_name }, { rejectWithValue }) => {
  try {
    return await updateForumTopic(topic_name)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Не удалось изменить название темы'
    )
  }
})

export const onDeleteForumTopic = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('forum/onDeleteForumTopic', async (_, { rejectWithValue }) => {
  try {
    return await deleteForumTopic()
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
