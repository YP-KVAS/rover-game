import { BASE_URL } from '../const-variables/api'

export enum FetchMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface RequestInput {
  method?: FetchMethods
  headers?: Record<string, string>
  data?: Record<string, unknown> | FormData
}

export function request<T>(
  endpoint: string,
  options: RequestInput
): Promise<T> {
  const { method = FetchMethods.GET, headers = {}, data } = options

  if (!('Content-Type' in headers) && !(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const config: RequestInit = { method, headers, credentials: 'include' }

  if (method !== FetchMethods.GET && data) {
    config.body = data instanceof FormData ? data : JSON.stringify(data)
  }

  console.log('config', config);
  return fetch(`${BASE_URL}${endpoint}`, config).then(checkResponse)
}

function checkResponse(res: Response) {
  const data = res.text()
  if (res.ok) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return data.then(text => JSON.parse(text)).catch(_ => data)
  }

  return data.then(text => {
    throw new Error(JSON.parse(text)?.reason)
  })
}
