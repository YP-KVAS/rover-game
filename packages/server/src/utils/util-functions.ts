import type { Request } from 'express'

export const getQueryLimitAndOffset = (req: Request) => {
  const limit =
    typeof req.query['limit'] === 'string' && req.query['limit'].length > 0
      ? parseInt(req.query['limit'])
      : undefined

  const offset =
    typeof req.query['offset'] === 'string' && req.query['offset'].length > 0
      ? parseInt(req.query['offset'])
      : undefined

  return { limit, offset }
}
