import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'
import style from './PageError.module.scss'

export const Page404: FC = () => {
  return (
    <div className={style.error_page}>
      <h1>404</h1>

      <p>Oops! Page not found</p>

      <p>
        Sorry, but the page you are looking for is not found. Please, make sure
        you have typed the correct URL.
      </p>

      <Link to={RoutesEnum.MAIN} className={style.link}>
        Go to Main
      </Link>
    </div>
  )
}
