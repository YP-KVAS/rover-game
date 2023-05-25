import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { AnimatedFrame } from '../../components/AnimatedFrame/AnimatedFrame'
import { OAUTH_REDIRECT_URI } from '../../utils/const-variables/api';
import { signInOAuth } from '../../utils/rest-api/oauth-api';
import { useEffect } from 'react';

export function Main() {
  useEffect(() => {
    let oauthCode: string | null = null;

  // Получаем код только при работе в браузере
  if (typeof window !== 'undefined') {
    oauthCode = new URLSearchParams(window.location.search).get('code');

    if (oauthCode) {
      // Меняем url страницы на чистый, без code
      window.history.pushState({}, '', OAUTH_REDIRECT_URI);

      // Отправляем POST запрос на oauth авторизацию
      signInOAuth({ code: oauthCode, redirect_uri: OAUTH_REDIRECT_URI })
      return
    }
  }
  }, []);

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

        <Link to={RoutesEnum.LOGIN} className={styles.link}>
          Вход
        </Link>
      </div>

      <p className={styles.disclaimer}>
        (Страховка не предусматривает выплат в случае сбивания машиной,
        повреждений от домов и иныx предметов искусственного или натурального
        происхождения)
      </p>
    </AnimatedFrame>
  )
}
