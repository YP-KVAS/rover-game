import { RootState } from '../store'

export const selectUserIsLoggedIn = (state: RootState) => state.auth.isLoggedIn
