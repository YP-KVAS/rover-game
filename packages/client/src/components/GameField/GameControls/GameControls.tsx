import styles from './GameControls.module.scss'
import React, { FC, RefObject, useContext, useEffect, useState } from 'react'
import gameManager from '../../../game-engine/GameManager'
import { LevelProgress } from '../../../utils/types/game'
import { StartLevel } from '../../StartLevel/StartLevel'
import { GameControlTitle } from '../GameControlTitle/GameControlTitle'
import controlService from '../../../game-engine/services/ControlService'
import { useAppDispatch } from '../../../hooks/useStore'
import { onScoreUpdate } from '../../../store/thunks/leaderboard-thunk'
import { SoundContext } from '../../../contexts/SoundContext'
import useSound from 'use-sound'

interface GameActionsProps {
  changeIsPlayingState: (isPlaying: boolean) => void
  gameFieldRef: RefObject<HTMLDivElement>
}

export const GameControls: FC<GameActionsProps> = ({
  changeIsPlayingState,
  gameFieldRef,
}) => {
  const dispatch = useAppDispatch()
  const saveScore = (score: number) => dispatch(onScoreUpdate(score))

  const [levelProgress, setLevelProgress] = useState<LevelProgress>(
    gameManager.levelProgress
  )

  const { soundOn } = useContext(SoundContext)
  const [gameOverSound] = useSound('./sounds/gameOver.mp3')

  const retry = () => gameManager.restartGame()

  useEffect(() => {
    gameManager.useChangeLevelProgress(setLevelProgress)
    gameManager.useSaveScoreCallback(saveScore)
  }, [])

  useEffect(() => {
    if (levelProgress === 'notStarted') {
      changeIsPlayingState(false)
    } else if (levelProgress === 'playing') {
      changeIsPlayingState(true)

      if (gameFieldRef.current) {
        controlService.addListeners(gameFieldRef.current)
      }
    } else if (levelProgress === 'failed') {
      soundOn && gameOverSound()
      controlService.removeListeners()
    } else {
      controlService.removeListeners()
    }

    return () => {
      controlService.removeListeners()
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
