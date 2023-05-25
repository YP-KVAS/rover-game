import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'
import { AnimatedFrame } from '../../components/AnimatedFrame/AnimatedFrame'

export function Main() {
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
