import { FormInputNames } from './forms'

export interface IForumCategory {
  id: number
  name: string
  topic_count?: number
}

export interface IForumTopic {
  id: number
  topic_name: string
  date: string
  category_id: number
}

export interface NewTopic extends Record<string, unknown> {
  [FormInputNames.FORUM_TITLE]: string
  [FormInputNames.FORUM_MESSAGE]: string
}
