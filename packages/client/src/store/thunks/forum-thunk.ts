import { createAsyncThunk } from '@reduxjs/toolkit'
import { getForumCategories } from '../../utils/rest-api/forum-api'
import { IForumCategory } from '../../utils/types/forum'

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
