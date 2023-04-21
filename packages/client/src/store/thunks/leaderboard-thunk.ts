import { createAsyncThunk } from '@reduxjs/toolkit'
import { LeaderboardRequest, LeaderboardItem } from '../../utils/types/leaderboard'
import { getAllLeaderboards, getLeaderboardByTeamName } from '../../utils/rest-api/leaderboard-api'

export const onGetAllLeaderboards = createAsyncThunk<
  Array<LeaderboardItem>,
  LeaderboardRequest,
  { rejectValue: string }
>('leaderboard/onGetAllLeaderboards', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await getAllLeaderboards(data)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to get all leaderboards')
  }
})

export const onGetLeaderboardByTeamName = createAsyncThunk<
  Array<LeaderboardItem>,
  LeaderboardRequest,
  { rejectValue: string }
>('leaderboard/onGetLeaderboardByTeamName', async (data, { dispatch, rejectWithValue }) => {
  try {
    return await getLeaderboardByTeamName(data)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to get leaderboard')
  }
})
