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
      name: 'Новые уровни',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 1,
      userId: 172320,
    },
    {
      id: 2,
      name: 'Управление',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 1,
      userId: 803086,
    },
    {
      id: 3,
      name: 'Бонусы',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 1,
      userId: 172320,
    },
  ],
  2: [
    {
      id: 5,
      name: 'Волшебная кнопка',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 2,
      userId: 803086,
    },
    {
      id: 6,
      name: 'Как набрать 100 000 очков',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 2,
      userId: 172320,
    },
  ],
  3: [
    {
      id: 7,
      name: 'Как играть?',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 3,
      userId: 803086,
    },
    {
      id: 8,
      name: 'Не получается пройти даже 1-ый уровень...',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 3,
      userId: 172320,
    },
  ],
  4: [
    {
      id: 9,
      name: 'Фильмы на вечер',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 4,
      userId: 172320,
    },
    {
      id: 10,
      name: 'Котики',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 4,
      userId: 803086,
    },
    {
      id: 11,
      name: 'Как  сварить гречку?',
      createdAt: '2023-02-15T14:29:35+00:00',
      categoryId: 4,
      userId: 172320,
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
