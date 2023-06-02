import { createAsyncThunk } from '@reduxjs/toolkit'
import { getLeaderboard } from '../../utils/rest-api/leaderboard-api'
import { RootState } from '../store'
import { BaseGetAllItemsQuery } from '../../utils/types/base-query'
import { Leaderboard } from '../../utils/types/leaderboard'

export const onGetLeaderboard = createAsyncThunk<
  Leaderboard,
  BaseGetAllItemsQuery,
  { rejectValue: string }
>(
  'leaderboard/onGetAllLeaderboards',
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
