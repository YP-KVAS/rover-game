import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  LeaderboardRequest,
  LeaderboardItem,
} from '../../utils/types/leaderboard'
import { getAllLeaderboards } from '../../utils/rest-api/leaderboard-api'
import { RootState } from '../store'

export const onGetAllLeaderboards = createAsyncThunk<
  LeaderboardItem[],
  LeaderboardRequest,
  { rejectValue: string }
>(
  'leaderboard/onGetAllLeaderboards',
  async (data, { rejectWithValue }) => {
    try {
      return await getAllLeaderboards(data)
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Unable to get all leaderboards'
      )
    }
  },
  {
    condition: (request: LeaderboardRequest, { getState }) => {
      const state = getState() as RootState
      const leaderboardIsLoading = state.leaderboard.isLoading
      if (leaderboardIsLoading) {
        return false
      }
    },
  }
)
