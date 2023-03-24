import { Link } from 'react-router-dom'

export function Main() {
  return (
    <>
      <Link to={'/404'}>Page 404</Link>
      <Link to={'/500'}>Page 500</Link>
    </>
  )
}
