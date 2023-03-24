import { FC } from 'react'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'

export const Page404: FC = () => {
  return (
    <main className="error-page">
      <h1>404</h1>

      <p>Oops! Page not found</p>

      <p>
        Sorry, but the page you are looking for is not found. Please, make sure
        you have typed the correct URL.
      </p>

        <Link to={RoutesEnum.MAIN} className="link">
          Go to Main
        </Link>
    </main>
  )
}
