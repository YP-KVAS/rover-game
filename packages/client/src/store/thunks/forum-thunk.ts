import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  addForumTopic,
  getForumCategories,
  getForumTopics,
} from '../../utils/rest-api/forum-api'
import { IForumCategory, IForumTopic, NewTopic } from '../../utils/types/forum'

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
  NewTopic,
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
