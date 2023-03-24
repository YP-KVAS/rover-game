import { FC } from 'react'
import { Link } from "react-router-dom";
import { RoutesEnum } from "../utils/const-variables/routes";

export const Page500: FC = () => {
  return (
    <main>
      <h1>500</h1>

      <p>
        We are having technical difficulties and are actively working on a fix.
      </p>

      <p>Please try to refresh this page or come back in a few minutes.</p>

      <Link to={RoutesEnum.MAIN}>Go to home</Link>
    </main>
  )
}
