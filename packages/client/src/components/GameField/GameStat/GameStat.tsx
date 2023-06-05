import styles from './GameStat.module.scss'
import gameManager from '../../../game-engine/GameManager'
import { useContext, useEffect, useState } from 'react'
import { GameStatType } from '../../../utils/types/game'
import { timerToString } from '../utils/foo'
import { SoundContext } from '../../../contexts/SoundContext'
import useSound from 'use-sound'
import scoreIncrease from '../../../../public/sounds/scoreIncrease.mp3'
import crash from '../../../../public/sounds/crash.mp3'
import { initialHitPoints } from '../../../utils/const-variables/game'

export function GameStat() {
  const [stat, setStat] = useState<GameStatType>(gameManager.getStat())
  const { soundOn, toggleSound } = useContext(SoundContext)

  const [scoreIncreaseSound] = useSound(scoreIncrease)
  const [crashSound] = useSound(crash)

  useEffect(() => {
    gameManager.useStat(setStat)
  }, [])

  useEffect(() => {
    stat.points && soundOn && scoreIncreaseSound()
  }, [stat.points])

  useEffect(() => {
    stat.hitPoints < initialHitPoints && soundOn && crashSound()
  }, [stat.hitPoints])

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

      {soundOn ? (
        <svg className={styles.sound_icon} onClick={() => toggleSound()}>
          <use xlinkHref="./images/icons-sprite.svg#soundon"></use>
        </svg>
      ) : (
        <svg className={styles.sound_icon} onClick={() => toggleSound()}>
          <use xlinkHref="./images/icons-sprite.svg#soundoff"></use>
        </svg>
      )}
    </div>
  )
}
