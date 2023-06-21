import { FetchState } from './slices-types'
import { createSlice } from '@reduxjs/toolkit'
import { onGetLeaderboard } from '../thunks/leaderboard-thunk'
import { LeaderboardUser } from '../../utils/types/user'

interface InitialState extends FetchState {
  leaderboardUsers: LeaderboardUser[] | null
  total: number
}

const initialState: InitialState = {
  isLoading: false,
  errorMessage: null,
  leaderboardUsers: null,
  total: 0,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    clearLeaderboard: _ => initialState,
  },
  extraReducers: builder => {
    // onGetAllLeaderboards
    builder
      .addCase(onGetLeaderboard.fulfilled, (state, action) => {
        state.isLoading = false
        state.errorMessage = null
        state.leaderboardUsers = action.payload.players || null
        state.total = action.payload.total || 0
      })
      .addCase(onGetLeaderboard.pending, state => {
        state.leaderboardUsers = null
        state.total = 0
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onGetLeaderboard.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
      })
  },
})

export const leaderboardReducer = leaderboardSlice.reducer
export const { clearLeaderboard } = leaderboardSlice.actions
