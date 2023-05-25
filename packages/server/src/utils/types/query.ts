interface QueryClause {
  offset?: number
  limit?: number
}

export interface ForumTopicsQuery extends QueryClause {
  categoryId: number
  search?: string
}

export interface ForumCommentsQuery extends QueryClause {
  topicId: number
  parentCommentId: number | null
}
