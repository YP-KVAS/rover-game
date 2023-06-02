import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  getLeaderboard,
  updateScore,
} from '../../utils/rest-api/leaderboard-api'
import { RootState } from '../store'
import { BaseGetAllItemsQuery } from '../../utils/types/base-query'
import { Leaderboard } from '../../utils/types/leaderboard'
import { UserScore } from '../../utils/types/user'

export const onGetLeaderboard = createAsyncThunk<
  Leaderboard,
  BaseGetAllItemsQuery,
  { rejectValue: string }
>(
  'leaderboard/onGetLeaderboard',
  async (query, { rejectWithValue }) => {
    try {
      return await getLeaderboard(query)
    } catch (err: unknown) {
      return rejectWithValue(
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
