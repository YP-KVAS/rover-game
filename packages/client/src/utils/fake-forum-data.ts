import { IForumCategory, IForumComment, IForumTopic } from './types/forum'

// TODO: Remove file after implementing Forum API (Sprint 8)

export const FORUM_CATEGORIES: Array<IForumCategory> = [
  { id: 1, name: 'Предложения и идеи', topicCount: 5 },
  { id: 2, name: 'Секреты прохождения', topicCount: 8 },
  { id: 3, name: 'Ваши вопросы', topicCount: 2 },
  { id: 4, name: 'Off Topic', topicCount: 2 },
]

export const FORUM_TOPICS: Record<number, Array<IForumTopic>> = {
  1: [
    {
      id: 1,
      topic_name: 'Новые уровни',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
      user_id: 172320,
    },
    {
      id: 2,
      topic_name: 'Управление',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
      user_id: 803086,
    },
    {
      id: 3,
      topic_name: 'Бонусы',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
      user_id: 172320,
    },
  ],
  2: [
    {
      id: 5,
      topic_name: 'Волшебная кнопка',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 2,
      user_id: 803086,
    },
    {
      id: 6,
      topic_name: 'Как набрать 100 000 очков',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 2,
      user_id: 172320,
    },
  ],
  3: [
    {
      id: 7,
      topic_name: 'Как играть?',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 3,
      user_id: 803086,
    },
    {
      id: 8,
      topic_name: 'Не получается пройти даже 1-ый уровень...',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 3,
      user_id: 172320,
    },
  ],
  4: [
    {
      id: 9,
      topic_name: 'Фильмы на вечер',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
      user_id: 172320,
    },
    {
      id: 10,
      topic_name: 'Котики',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
      user_id: 803086,
    },
    {
      id: 11,
      topic_name: 'Как  сварить гречку?',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
      user_id: 172320,
    },
  ],
}

export const FORUM_COMMENTS: Record<number, Array<IForumComment>> = {
  0: [
    {
      id: 1,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: null,
      user_id: 803086,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 5,
    },
    {
      id: 2,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: null,
      user_id: 803085,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 3,
    },
    {
      id: 3,
      message: null,
      parent_comment_id: null,
      user_id: 803082,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 5,
    },
    {
      id: 4,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: null,
      user_id: 803081,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 0,
    },
    {
      id: 5,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: null,
      user_id: 172320,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 3,
    },
  ],
  1: [
    {
      id: 6,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: 1,
      user_id: 803086,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 1,
    },
    {
      id: 7,
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Eget egestas purus viverra accumsan in nisl nisi.',
      parent_comment_id: 1,
      user_id: 803085,
      date: '2023-04-15T14:29:35+00:00',
      reply_count: 3,
    },
  ],
}
