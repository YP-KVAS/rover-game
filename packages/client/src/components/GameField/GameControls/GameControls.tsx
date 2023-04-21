import styles from './GameControls.module.scss'
import React, { FC, useEffect, useState } from 'react'
import gameManager from '../../../game-engine/GameManager'
import { LevelProgress } from '../../../utils/types/game'
import { StartLevel } from '../../StartLevel/StartLevel'
import { GameControlTitle } from '../GameControlTitle/GameControlTitle'

interface GameActionsProps {
  changeIsPlayingState: (isPlaying: boolean) => void
}

export const GameControls: FC<GameActionsProps> = ({
  changeIsPlayingState,
}) => {
  const [levelProgress, setLevelProgress] = useState<LevelProgress>(
    gameManager.levelProgress
  )

  const retry = () => gameManager.restartGame()

  useEffect(() => {
    gameManager.useChangeLevelProgress(setLevelProgress)
  }, [])

  useEffect(() => {
    if (levelProgress === 'notStarted') {
      changeIsPlayingState(false)
    } else if (levelProgress === 'playing') {
      changeIsPlayingState(true)
    }
  }, [levelProgress])

  return (
    <div className={styles.controls}>
      {levelProgress === 'notStarted' && <StartLevel />}
      {levelProgress === 'failed' && (
        <div className={styles.game_over}>
          <div className={styles.wave_text}>
            {'Game over'.split('').map((letter, idx) => (
              <span key={idx} style={{ '--i': idx + 1 } as React.CSSProperties}>
                {letter}
              </span>
            ))}
          </div>
          <GameControlTitle
            title="Нажмите сюда, чтобы начать сначала"
            clickHandler={retry}
          />
        </div>
      )}
    </div>
  )
}
