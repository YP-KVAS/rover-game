import { createAsyncThunk } from "@reduxjs/toolkit"
import { getOAuthUrl, getServiceId } from "../../utils/rest-api/oauth-api"
import { OAUTH_REDIRECT_URI } from "../../utils/const-variables/api"

// todo добавить типизацию
export const onGetServiceId = createAsyncThunk('oauth/onGetServiceId',
  async (_, { rejectWithValue }) => {
    try {
      const { service_id: serviceId } = await getServiceId(OAUTH_REDIRECT_URI)

      console.log('serviceId', serviceId);
      const oauthUrl = getOAuthUrl(serviceId)
      console.log('oauthUrl', oauthUrl);

      window.location.href = oauthUrl;
    } catch (err: unknown) {
      return rejectWithValue((err as Error).message || 'Unable to signin by ya')
    }
  }
)
