import styles from './GameStat.module.scss'
import gameManager from '../../../game-engine/GameManager'
import { useEffect, useState } from 'react'
import { GameStatType } from '../../../utils/types/game'
import { timerToString } from '../utils/foo'

export function GameStat() {
  const [stat, setStat] = useState<GameStatType>(gameManager.getStat())

  useEffect(() => {
    gameManager.useStat(setStat)
  }, [])

  return (
    <div className={styles.body}>
      <span className={styles.stat_block}>
        Уровень: <b>{stat.level}</b>
      </span>

      <span className={styles.stat_block}>{timerToString(stat.timer)}</span>

      <div className={styles.hit_points}>
        {Array.from({ length: stat.hitPoints }, (_, i) => (
          <img src="/images/hp.png" key={i} className={styles.image} alt="HP" />
        ))}
      </div>

      <span className={styles.stat_block}>
        <b>{stat.points.toLocaleString()}</b> очков
      </span>
    </div>
  )
}
