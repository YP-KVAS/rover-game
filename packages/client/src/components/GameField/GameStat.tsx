import styles from './GameStat.module.scss'
import gameManager from '../../game-engine/GameManager'
import { useEffect, useState } from 'react'
import { GameStatType } from '../../utils/types/game'
import { initialHitPoints } from '../../utils/const-variables/game'

export function GameStat() {
  const [stat, setStat] = useState<GameStatType>({
    level: 1,
    points: 0,
    hitPoints: initialHitPoints,
  })

  useEffect(() => {
    gameManager.useStat(setStat)
  }, [])

  return (
    <div className={styles.body}>
      <span className={styles.statBlock}>
        Уровень: <b>{stat.level}</b>
      </span>

      <div className={styles.hitPoints}>
        {Array.from({ length: stat.hitPoints }, (_, i) => (
          <img
            src="/images/hp.png"
            key={i}
            className={styles.hitPoints__image}
            alt="HP"
          />
        ))}
      </div>

      <span className={styles.statBlock}>
        <b>{stat.points}</b> очков
      </span>
    </div>
  )
}
