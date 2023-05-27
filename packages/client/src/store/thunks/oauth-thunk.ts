import { createAsyncThunk } from '@reduxjs/toolkit'
import { signInOAuth } from '../../utils/rest-api/oauth-api'
import { OAuthPostRequestData } from '../../utils/types/oauth'
import { onGetUser } from './auth-thunk'

export const onOAuthSignIn = createAsyncThunk<
  void,
  OAuthPostRequestData,
  { rejectValue: string }
>('oauth/onOAuthSignIn', async (data, { dispatch, rejectWithValue }) => {
  try {
    await signInOAuth({ code: data.code, redirect_uri: data.redirect_uri })

    await dispatch(onGetUser)
  } catch (err: unknown) {
    return rejectWithValue((err as Error).message || 'Unable to sign in')
  }
})
