import { IForumCategory, IForumTopic } from './types/forum'

// TODO: Remove file after implementing Forum API (Sprint 8)

export const FORUM_CATEGORIES: Array<IForumCategory> = [
  { id: 1, name: 'Предложения и идеи', topic_count: 5 },
  { id: 2, name: 'Секреты прохождения', topic_count: 8 },
  { id: 3, name: 'Ваши вопросы', topic_count: 2 },
  { id: 4, name: 'Off Topic', topic_count: 2 },
]

export const FORUM_TOPICS: Record<number, Array<IForumTopic>> = {
  1: [
    {
      id: 1,
      topic_name: 'Новые уровни',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
    },
    {
      id: 2,
      topic_name: 'Управление',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
    },
    {
      id: 3,
      topic_name: 'Бонусы',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 1,
    },
  ],
  2: [
    {
      id: 1,
      topic_name: 'Волшебная кнопка',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 2,
    },
    {
      id: 2,
      topic_name: 'Как набрать 100 000 очков',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 2,
    },
  ],
  3: [
    {
      id: 1,
      topic_name: 'Как играть?',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 3,
    },
    {
      id: 2,
      topic_name: 'Не получается пройти даже 1-ый уровень...',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 3,
    },
  ],
  4: [
    {
      id: 1,
      topic_name: 'Фильмы на вечер',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
    },
    {
      id: 2,
      topic_name: 'Котики',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
    },
    {
      id: 3,
      topic_name: 'Как  сварить гречку?',
      date: '2023-02-15T14:29:35+00:00',
      category_id: 4,
    },
  ],
}
