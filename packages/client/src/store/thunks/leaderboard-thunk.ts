import { createAsyncThunk } from '@reduxjs/toolkit'
import { LeaderboardRequest, LeaderboardItem } from '../../utils/types/leaderboard'
import { getAllLeaderboards } from '../../utils/rest-api/leaderboard-api'

export const onGetAllLeaderboards = createAsyncThunk<
  void,
  LeaderboardRequest,
  { rejectValue: string }
>('leaderboard/onGetAllLeaderboards', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await getAllLeaderboards(data)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to get leaderboards')
  }
})
