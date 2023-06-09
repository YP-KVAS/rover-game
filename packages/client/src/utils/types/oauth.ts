export interface OAuthServiceId extends Record<string, string> {
  service_id: string
}

export interface OAuthPostRequestData extends Record<string, unknown> {
  code: string | null
  redirect_uri: string
}
