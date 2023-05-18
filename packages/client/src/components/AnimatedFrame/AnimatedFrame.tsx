import styles from './AnimatedFrame.module.scss'
import { FC } from 'react'

export const AnimatedFrame: FC<{ children: JSX.Element[] }> = ({
  children,
}) => {
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
          {children}
        </div>
      </div>
    </>
  )
}
