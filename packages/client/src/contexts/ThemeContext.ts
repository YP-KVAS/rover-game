import { createContext } from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextType = {
  themeName: Theme
  setThemeName: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: 'light',
  setThemeName: () => null,
})