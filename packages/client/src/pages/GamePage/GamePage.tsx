import { FC, RefObject, useEffect, useRef, useState } from 'react'
import styles from './GamePage.module.scss'
import { GameField } from '../../components/GameField/GameField'
import { Button } from '../../components/Button/Button'
import gameManager from '../../game-engine/GameManager'
import RequireAuth from '../../hocs/requireAuth'
import { EnumPages } from '../../utils/const-variables/pages'
import { GameCompleted } from '../../components/GameField/GameCompleted/GameCompleted'
import { GameImages } from '../../game-engine/GameImages'
import { Loader } from '../../components/Loader/Loader'
import { SoundContext } from '../../contexts/SoundContext'
import useSound from 'use-sound'
import { LS_SOUND } from '../../utils/const-variables/sound'

const GamePage: FC = () => {
  const gamePageRef: RefObject<HTMLDivElement> = useRef(null)
  const gameFieldRef: RefObject<HTMLDivElement> = useRef(null)

  const [level, setLevel] = useState(gameManager.level)
  const [gameCompleted, setGameCompleted] = useState(gameManager.gameCompleted)
  const [gameEnabled, setGameEnabled] = useState(false)

  useEffect(() => {
    gameManager.useChangeLevel(setLevel)
    gameManager.useChangeGameCompletedState(setGameCompleted)
    GameImages.getInstance().useChangeAllImagesLoadedState(setGameEnabled)

    return () => {
      if (gameManager.levelProgress === 'playing') {
        gameManager.restartLevel()
      } else if (
        gameManager.levelProgress === 'failed' ||
        gameManager.levelProgress === 'willFail'
      ) {
        gameManager.restartGame()
      }
    }
  }, [])

  const getSoundState = (): boolean => {
    const lsSoundState = localStorage.getItem(LS_SOUND)

    return lsSoundState === null ? true : lsSoundState === 'on' ? true : false
  }

  const [currentSoundState, setSoundState] = useState<boolean>(
    typeof window === 'undefined' ? true : getSoundState()
  )

  useEffect(
    () => localStorage.setItem(LS_SOUND, currentSoundState ? 'on' : 'off'),
    [currentSoundState]
  )

  const toggleSound = () => {
    setSoundState(prevState => !prevState)
    gameFieldRef.current?.focus()
  }
  const [gameCompleteSound] = useSound('./sounds/complete.mp3')

  if (gameCompleted && currentSoundState) {
    gameCompleteSound()
  }

  const setFullScreen = () => {
    gamePageRef.current
      ?.requestFullscreen()
      // focus needed for keyboard events
      .then(() => gameFieldRef.current?.focus())
      .catch(() => console.warn('Fullscreen is not supported'))
  }

  return (
    <SoundContext.Provider value={{ soundOn: currentSoundState, toggleSound }}>
      {!gameEnabled ? (
        <Loader />
      ) : gameCompleted ? (
        <GameCompleted />
      ) : (
        <div className={styles.game}>
          <div ref={gamePageRef}>
            <GameField level={level} gameFieldRef={gameFieldRef} />
          </div>
          <Button clickHandler={setFullScreen}>
            Перейти в полноэкранный режим
          </Button>
        </div>
      )}
    </SoundContext.Provider>
  )
}

const GamePageWithAuth: FC = RequireAuth(GamePage, EnumPages.GAME_PAGE)

export { GamePageWithAuth as GamePage }
