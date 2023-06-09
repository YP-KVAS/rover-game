import {
  BASE_YA_URL,
  OAUTH_API_URL,
  OAUTH_SERVICE_ID,
  YA_OAUTH_URL,
} from '../const-variables/api'
import { OAuthPostRequestData, OAuthServiceId } from '../types/oauth'
import { FetchMethods, request } from './base-request'

export async function getServiceId(
  redirectUri: string
): Promise<OAuthServiceId> {
  return await request(
    BASE_YA_URL,
    `${OAUTH_API_URL}${OAUTH_SERVICE_ID}?redirect_uri=${redirectUri}`,
    {
      method: FetchMethods.GET,
      noCached: true,
    }
  )
}

export async function signInOAuth(data: OAuthPostRequestData) {
  return await request(BASE_YA_URL, `${OAUTH_API_URL}`, {
    method: FetchMethods.POST,
    data,
  })
}

export function getOAuthUrl(serviceId: string, redirectUri: string): string {
  return `${YA_OAUTH_URL}&client_id=${serviceId}&redirect_uri=${redirectUri}`
}
