import { createContext } from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextType = {
  themeName: Theme
  changeTheme: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: 'light',
  changeTheme: () => null,
})
