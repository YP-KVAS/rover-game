import { createContext } from 'react'
import { Theme } from '../utils/const-variables/theme'

type ThemeContextType = {
  themeName: Theme
  changeTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  themeName: Theme.LIGHT,
  changeTheme: () => null,
})
