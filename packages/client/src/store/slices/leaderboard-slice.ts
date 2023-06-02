import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { onGetAllLeaderboards } from '../thunks/leaderboard-thunk'
import { LeaderboardItem } from '../../utils/types/leaderboard'

interface InitialState extends FetchState {
  leaderboardItems: LeaderboardItem[] | null
}

const initialState: InitialState = {
  isLoading: false,
  errorMessage: null,
  leaderboardItems: null,
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // onGetAllLeaderboards
    builder
      .addCase(
        onGetAllLeaderboards.fulfilled,
        (state, action: PayloadAction<LeaderboardItem[]>) => {
          state.isLoading = false
          state.errorMessage = null
          state.leaderboardItems = (state.leaderboardItems || []).concat(
            action.payload
          )
        }
      )
      .addCase(onGetAllLeaderboards.pending, state => {
        state.isLoading = true
        state.errorMessage = null
      })
      .addCase(onGetAllLeaderboards.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
      })
  },
})

export const leaderboardReducer = leaderboardSlice.reducer
