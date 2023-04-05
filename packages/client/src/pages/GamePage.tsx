import React, { FC } from 'react'
import { GameField } from '../components/game-field/GameField'
import gameManager from '../game-engine/GameManager'

export const GamePage: FC = () => {
  // TODO: replace with actual game level, add game level progress, timer, etc.
  const [level, setLevel] = React.useState(1)

  gameManager.setChangeLevelFoo(setLevel)

  return <GameField level={level} />
}
