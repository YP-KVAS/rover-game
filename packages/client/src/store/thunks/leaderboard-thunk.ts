import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  LeaderboardRequest,
  LeaderboardItem,
  UserItem
} from '../../utils/types/leaderboard'
import {
  getLeaderboard,
  getAllLeaderboards,
  getLeaderboardByTeamName,
} from '../../utils/rest-api/leaderboard-api'

export const onGetLeaderboard = createAsyncThunk<
  UserItem[],
  void,
  { rejectValue: string }
>(
  'leaderboard/onGetLeaderboard',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      return await getLeaderboard()
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Unable to get Leaderboard'
      )
    }
  }
)

export const onGetAllLeaderboards = createAsyncThunk<
  LeaderboardItem[],
  LeaderboardRequest,
  { rejectValue: string }
>(
  'leaderboard/onGetAllLeaderboards',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await getAllLeaderboards(data)
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Unable to get all leaderboards'
      )
    }
  }
)

export const onGetLeaderboardByTeamName = createAsyncThunk<
  LeaderboardItem[],
  LeaderboardRequest,
  { rejectValue: string }
>(
  'leaderboard/onGetLeaderboardByTeamName',
  async (data, { dispatch, rejectWithValue }) => {
    try {
      return await getLeaderboardByTeamName(data)
    } catch (err: unknown) {
      return rejectWithValue(
        (err as Error).message || 'Unable to get leaderboard'
      )
    }
  }
)
