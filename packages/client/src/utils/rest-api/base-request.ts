export enum FetchMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface RequestInput {
  method?: FetchMethods
  headers?: Record<string, string>
  data?: Record<string, unknown> | FormData
  noCached?: boolean
}

export function request<T>(
  baseUrl: string,
  endpoint: string,
  options: RequestInput
): Promise<T> {
  const { method = FetchMethods.GET, headers = {}, data, noCached } = options

  if (!('Content-Type' in headers) && !(data instanceof FormData)) {
    headers['Content-Type'] = 'application/json'
  }

  const config: RequestInit = {
    method,
    headers,
    credentials: 'include',
    cache: noCached ? 'no-cache' : 'default',
  }

  if (method !== FetchMethods.GET && data) {
    config.body = data instanceof FormData ? data : JSON.stringify(data)
  }

  return fetch(`${baseUrl}${endpoint}`, config).then(checkResponse)
}

function checkResponse(res: Response) {
  const data = res.text()
  if (res.ok) {
    return data.then(text => JSON.parse(text)).catch(() => data)
  }

  return data.then(text => {
    throw new Error(JSON.parse(text)?.reason)
  })
}
