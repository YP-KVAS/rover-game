import { createContext } from 'react'

type SoundContextType = {
  soundOn: boolean
  toggleSound: () => void
}

export const SoundContext = createContext<SoundContextType>({
  soundOn: false,
  toggleSound: () => null,
})
