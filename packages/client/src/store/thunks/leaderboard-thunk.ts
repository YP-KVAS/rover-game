import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateScore } from '../../utils/rest-api/leaderboard-api'
import { RootState } from '../store'
import { BaseGetAllItemsQuery } from '../../utils/types/base-query'
import { Leaderboard } from '../../utils/types/leaderboard'
import { UserScore } from '../../utils/types/user'
import { IThunkService } from '../services/ThunkService'

export const onGetLeaderboard = createAsyncThunk<
  Leaderboard,
  BaseGetAllItemsQuery,
  { rejectValue: string }
>(
  'leaderboard/onGetLeaderboard',
  async (query, thunkAPI) => {
    try {
      const service = thunkAPI.extra as IThunkService
      return await service.leaderboardService.getLeaderboard(query)
    } catch (err: unknown) {
      return thunkAPI.rejectWithValue(
        (err as Error).message || 'Unable to get leaderboard items'
      )
    }
  },
  {
    condition: (request: BaseGetAllItemsQuery, { getState }) => {
      const state = getState() as RootState
      const leaderboardIsLoading = state.leaderboard.isLoading
      if (leaderboardIsLoading) {
        return false
      }
    },
  }
)

export const onScoreUpdate = createAsyncThunk<
  UserScore,
  number,
  { rejectValue: string }
>('leaderboard/onScoreUpdate', async (score, { rejectWithValue }) => {
  try {
    return await updateScore(score)
  } catch (err: unknown) {
    return rejectWithValue(
      (err as Error).message || 'Unable to update user score'
    )
  }
})
