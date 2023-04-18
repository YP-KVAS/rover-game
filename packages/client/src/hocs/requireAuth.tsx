import { FC, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RoutesEnum } from '../utils/const-variables/routes'
import { EnumPages, protectedPages } from '../utils/const-variables/pages'
import { useAppDispatch, useAppSelector } from '../hooks/useStore'
import { selectUserIsLoggedIn } from '../store/selectors/auth-selector'
import { onGetUser } from '../store/thunks/auth-thunk'

export default function RequireAuth<P>(
  WrappedComponent: FC<P>,
  pageName: EnumPages
) {
  return function (props: P) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const isAuth = useAppSelector(selectUserIsLoggedIn)
    const isProtected = protectedPages.includes(pageName)

    useEffect(() => {
      dispatch(onGetUser())
    }, [dispatch])

    useEffect(() => {
      if (isProtected && !isAuth) {
        navigate(location.state?.from ?? RoutesEnum.LOGIN, {
          replace: true,
          state: { from: location },
        })
      }

      if (!isProtected && isAuth) {
        navigate(location.state?.from ?? RoutesEnum.MAIN, {
          replace: true,
          state: { from: location },
        })
      }
    }, [isProtected, isAuth, navigate, location])

    return WrappedComponent(props)
  }
}
