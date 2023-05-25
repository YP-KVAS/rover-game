import { RoutesEnum } from './routes'

interface MenuItem {
  label: string
  route: RoutesEnum
}

export const MENU: MenuItem[] = [
  {
    label: 'Главная страница',
    route: RoutesEnum.MAIN,
  },
  {
    label: 'Rover Game',
    route: RoutesEnum.GAME,
  },
  {
    label: 'Форум',
    route: RoutesEnum.FORUM,
  },
  {
    label: 'Личный кабинет',
    route: RoutesEnum.USER_SETTINGS,
  },
]
