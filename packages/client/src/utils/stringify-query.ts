const isEmpty = (value: unknown): boolean => {
  return value === '' || value === null || value === undefined
}

export const stringifyQuery = (data: Record<string, unknown>): string => {
  return (
    '?' +
    Object.keys(data).reduce((acc, key, idx) => {
      return (acc += isEmpty(data[key])
        ? ''
        : `${idx !== 0 ? '&' : ''}${key}=${data[key]}`)
    }, '')
  )
}
