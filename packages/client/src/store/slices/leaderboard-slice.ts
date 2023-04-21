import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { onGetAllLeaderboards, onGetLeaderboardByTeamName } from '../thunks/leaderboard-thunk'
import { LeaderboardItem } from '../../utils/types/leaderboard'

interface InitialState extends FetchState {
  leaderboardItems: Array<LeaderboardItem>
}

const initialState: InitialState = {
  isLoading: false,
  errorMessage: null,
  leaderboardItems: [],
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // onGetAllLeaderboards
    builder
      .addCase(onGetAllLeaderboards.fulfilled, (state, action: PayloadAction<Array<LeaderboardItem>>) => {
        state.isLoading = false
        state.errorMessage = null
        state.leaderboardItems = action.payload
      })
      .addCase(onGetAllLeaderboards.pending, state => {
        state.isLoading = true
        state.errorMessage = null
        state.leaderboardItems = []
      })
      .addCase(onGetAllLeaderboards.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
        state.leaderboardItems = []
      })

    // onGetLeaderboardByTeamName
    builder
      .addCase(onGetLeaderboardByTeamName.fulfilled, (state, action: PayloadAction<Array<LeaderboardItem>>) => {
        state.isLoading = false
        state.errorMessage = null
        state.leaderboardItems = action.payload
      })
      .addCase(onGetLeaderboardByTeamName.pending, state => {
        state.isLoading = true
        state.errorMessage = null
        state.leaderboardItems = []
      })
      .addCase(onGetLeaderboardByTeamName.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
        state.leaderboardItems = []
      })
    },
  })

  export const leaderboardReducer = leaderboardSlice.reducer
