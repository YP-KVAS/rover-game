import { Theme } from '../../contexts/ThemeContext'

// TODO: replace with actual theme colors
export enum Color {
  JUNGLE_GREEN = '#1ca086',
  BLACK = '#121212',
  LIGHT_GREY = '#EBECF0',
}

export interface ThemeColors {
  primary: Color
  background: Color
}

export const THEMES: Record<Theme, ThemeColors> = {
  light: {
    primary: Color.BLACK,
    background: Color.LIGHT_GREY,
  },
  dark: {
    primary: Color.JUNGLE_GREEN,
    background: Color.BLACK,
  },
}

export const LS_THEME = 'theme'
