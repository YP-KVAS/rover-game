import { FetchState } from './slices-types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  onGetLeaderboard,
  onGetAllLeaderboards,
  onGetLeaderboardByTeamName,
} from '../thunks/leaderboard-thunk'
import { LeaderboardItem, UserItem } from '../../utils/types/leaderboard'

interface InitialState extends FetchState {
  leaderboardItems: LeaderboardItem[]
  userItems: UserItem[]
}

const initialState: InitialState = {
  isLoading: false,
  errorMessage: null,
  leaderboardItems: [],
  userItems: [],
}

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // onGetLeaderboard
    builder
      .addCase(onGetLeaderboard.fulfilled,
        (state, action: PayloadAction<UserItem[]>) => {
          state.isLoading = false
          state.errorMessage = null
          state.userItems = action.payload
        }
      )
      .addCase(onGetLeaderboard.pending, state => {
        state.isLoading = true
        state.errorMessage = null
        state.userItems = []
      })
      .addCase(onGetLeaderboard.rejected, (state, action) => {
        state.isLoading = false
        state.errorMessage = action.payload || null
        state.userItems = []
      })


    // onGetAllLeaderboards
    builder
      .addCase(
        onGetAllLeaderboards.fulfilled,
        (state, action: PayloadAction<LeaderboardItem[]>) => {
          state.isLoading = false
          state.errorMessage = null
          state.leaderboardItems = action.payload
        }
      )
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
      .addCase(
        onGetLeaderboardByTeamName.fulfilled,
        (state, action: PayloadAction<LeaderboardItem[]>) => {
          state.isLoading = false
          state.errorMessage = null
          state.leaderboardItems = action.payload
        }
      )
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
