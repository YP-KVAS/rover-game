import { RootState } from '../store'

export const selectUserIsLoggedIn = (state: RootState) => state.auth.isLoggedIn

export const selectAuthState = (state: RootState) => {
  return {
    isLoading: state.auth.isLoading,
    errorMessage: state.auth.errorMessage,
  }
}
