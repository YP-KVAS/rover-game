import { FC } from 'react'
import { GameField } from '../components/GameField/GameField'

export const GamePage: FC = () => {
  // TODO: replace with actual game level, add game level progress, timer, etc.
  return <GameField level={2} />
}
