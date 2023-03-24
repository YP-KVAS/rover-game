import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'

export const Page404: FC = () => {
  return (
    <main>
      <h1>404</h1>

      <h2>Oops! Page not found</h2>

      <p>
        Sorry, but the page you are looking for is not found. Please, make sure
        you have typed the correct URL.
      </p>

      <Link to={RoutesEnum.MAIN}>Go to home</Link>
    </main>
  )
}
