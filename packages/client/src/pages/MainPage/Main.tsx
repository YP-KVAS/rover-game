import styles from './MainPage.module.scss'
import { Link } from 'react-router-dom'
import { RoutesEnum } from '../../utils/const-variables/routes'

export function Main() {
  return (
    <>
      <div className={styles.animate_wrapper}>
        {Array.from({ length: 4 }).map((_, i) => (
          <img
            src="/images/road/road-corner.png"
            className={styles[`cross_${i + 1}`]}
            alt="road"
            key={i}
            width={80}
            height={80}
          />
        ))}

        <div className={styles.straight_ht_wrapper}>
          {Array.from({ length: 7 }).map((_, i) => (
            <img
              src="/images/road/road-straight.png"
              className={styles.straight_ht}
              alt="road"
              key={i}
              width={80}
              height={80}
            />
          ))}
        </div>

        <div className={styles.straight_hb_wrapper}>
          {Array.from({ length: 7 }).map((_, i) => (
            <img
              src="/images/road/road-straight.png"
              className={styles.straight_hb}
              alt="road"
              key={i}
              width={80}
              height={80}
            />
          ))}
        </div>

        <div className={styles.straight_vl_wrapper}>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              src="/images/road/road-straight.png"
              className={styles.straight_vl}
              alt="road"
              key={i}
              width={80}
              height={80}
            />
          ))}
        </div>

        <div className={styles.straight_vr_wrapper}>
          {Array.from({ length: 5 }).map((_, i) => (
            <img
              src="/images/road/road-straight.png"
              className={styles.straight_vr}
              alt="road"
              key={i}
              width={80}
              height={80}
            />
          ))}
        </div>

        <div className={styles.rover}></div>

        <div className={styles.body}>
          <h2>Rover-game</h2>

          <p>
            Играйте за веселого робота-курьера
            <br />и развозите грузы страждущим!
          </p>

          <p>Следите за временем, а не то вас уволят на свалку!</p>

          <div>
            <Link to={RoutesEnum.START} className={styles.link}>
              Играть
            </Link>

            <Link to={RoutesEnum.LOGIN} className={styles.link}>
              Вход
            </Link>
          </div>

          <p className={styles.disclaimer}>
            (Страховка не предусматривает выплат в случае сбивания машиной,
            повреждений от домов и иныx предметов искусственного или
            натурального происхождения)
          </p>
        </div>
      </div>
    </>
  )
}
