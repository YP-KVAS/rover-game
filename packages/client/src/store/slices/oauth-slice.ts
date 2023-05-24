// import { FetchState } from './slices-types'
// import { createSlice } from '@reduxjs/toolkit'
// import { onGetServiceId } from '../thunks/oauth-thunk'

// interface InitialState extends FetchState {
//   serviceIdStatus: boolean | string
//   serviceIdError: string | null
// }

// const initialState: InitialState = {
//   serviceIdStatus: false,
//   serviceIdError: null,
// }

// const oauthSlice = createSlice({
//   name: 'oauth',
//   initialState,
//   reducers: {
//     clearAuthError: state => {
//       state.errorMessage = null
//     },
//   },
//   extraReducers: builder => {
//     builder
//       .addCase(onGetServiceId.fulfilled, state => {
//         state.serviceIdStatus = 'success'
//         state.serviceIdError = null
//       })
//       .addCase(onGetServiceId.pending, state => {
//         state.serviceIdStatus = 'pending'
//       })
//       .addCase(onGetServiceId.rejected, (state, action) => {
//         state.serviceIdStatus = 'error'
//         state.serviceIdError = action.payload || null
//       })
//   },
// })

// export const oauthReducer = oauthSlice.reducer
// export const { clearAuthError } = oauthSlice.actions
