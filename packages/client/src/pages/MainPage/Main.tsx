import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { AnimatedFrame } from '../../components/AnimatedFrame/AnimatedFrame'
import { OAUTH_REDIRECT_URI } from '../../utils/const-variables/api'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/useStore'
import { signInOAuth } from '../../utils/rest-api/oauth-api'
import { onGetUser } from '../../store/thunks/auth-thunk'
import { selectUserIsLoggedIn } from '../../store/selectors/auth-selector'

export function Main() {
  const dispatch = useAppDispatch()
  const isLoggedIn = useAppSelector(selectUserIsLoggedIn)

  useEffect(() => {
    const oauthCode: string | null = new URLSearchParams(
      window.location.search
    ).get('code')

    if (oauthCode) {
      // Меняем url страницы на чистый, без code
      window.history.replaceState({}, '', OAUTH_REDIRECT_URI)

      signInOAuth({ code: oauthCode, redirect_uri: OAUTH_REDIRECT_URI }).then(
        () => dispatch(onGetUser())
      )
    }
  }, [])

  return (
    <AnimatedFrame>
      <p>
        Играйте за веселого робота-курьера
        <br />и развозите грузы страждущим!
      </p>

      <p>Следите за временем, а не то вас уволят на свалку!</p>

      <div>
        <Link to={RoutesEnum.GAME} className={styles.link}>
          Играть
        </Link>

        {!isLoggedIn && (
          <Link to={RoutesEnum.LOGIN} className={styles.link}>
            Вход
          </Link>
        )}
      </div>

      <p className={styles.disclaimer}>
        (Страховка не предусматривает выплат в случае сбивания машиной,
        повреждений от домов и иныx предметов искусственного или натурального
        происхождения)
      </p>
    </AnimatedFrame>
  )
}
