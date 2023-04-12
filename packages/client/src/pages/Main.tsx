import { Link } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'
import { useAppDispatch } from '../hooks/useStore'
import { onLogout, onSignIn } from '../store/thunks/auth-thunk'

export function Main() {
  const dispatch = useAppDispatch()
  return (
    <>
      <ul>
        {Object.values(RoutesEnum).map(route => (
          <li key={route}>
            <Link to={route}>{route}</Link>
          </li>
        ))}
      </ul>
      <button
        onClick={() =>
          dispatch(onSignIn({ login: 'kvas', password: 'kvasKvas1' }))
        }>
        Login
      </button>
      <button onClick={() => dispatch(onLogout())}>Logout</button>
    </>
  )
}
