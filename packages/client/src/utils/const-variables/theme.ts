export enum Color {
  MAGENTA = '#c850c0',
  BLUE = '#4158d0',
  YELLOW = '#ffcc70',
  BLACK = '#000',
  WHITE = '#fff',
  GREY = '#b3b3b3',
  DARK_GREY = '#404040',

  YA_YELLOW = '#fc0',
  YA_BLUE = '#000080',
}

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  YA = 'ya',
}

export interface ThemeColors {
  __color_primary: Color
  __color_secondary: Color
  __color_accent: Color
  __color_text_on_light: Color
  __color_text_on_dark: Color
  __color_text_error: Color
  __color_gradient_start: Color
  __color_gradient_middle: Color
  __color_gradient_end: Color
}

export const THEMES: Record<Theme, ThemeColors> = {
  light: {
    __color_primary: Color.MAGENTA,
    __color_secondary: Color.BLUE,
    __color_accent: Color.YELLOW,
    __color_text_on_light: Color.BLACK,
    __color_text_on_dark: Color.WHITE,
    __color_text_error: Color.YELLOW,
    __color_gradient_start: Color.BLUE,
    __color_gradient_middle: Color.MAGENTA,
    __color_gradient_end: Color.YELLOW,
  },
  dark: {
    __color_primary: Color.DARK_GREY,
    __color_secondary: Color.BLACK,
    __color_accent: Color.YELLOW,
    __color_text_on_light: Color.BLACK,
    __color_text_on_dark: Color.WHITE,
    __color_text_error: Color.YELLOW,
    __color_gradient_start: Color.BLACK,
    __color_gradient_middle: Color.DARK_GREY,
    __color_gradient_end: Color.GREY,
  },
  ya: {
    __color_primary: Color.YA_YELLOW,
    __color_secondary: Color.YA_YELLOW,
    __color_accent: Color.YA_YELLOW,
    __color_text_on_light: Color.BLACK,
    __color_text_on_dark: Color.YA_BLUE,
    __color_text_error: Color.YELLOW,
    __color_gradient_start: Color.WHITE,
    __color_gradient_middle: Color.WHITE,
    __color_gradient_end: Color.WHITE,
  },
}

const lightButtonStyles = {
  color: Color.WHITE,
  backgroundColor: Color.MAGENTA,
}

const darkButtonStyles = {
  color: THEMES.dark.__color_text_on_dark,
  backgroundColor: THEMES.dark.__color_primary,
}

const yaButtonStyles = {
  color: THEMES.ya.__color_text_on_dark,
  backgroundColor: THEMES.ya.__color_primary,
}

export const themes = [
  { name: Theme.LIGHT, label: 'Светлая', buttonStyle: lightButtonStyles },
  { name: Theme.DARK, label: 'Темная', buttonStyle: darkButtonStyles },
  { name: Theme.YA, label: 'Яндекс', buttonStyle: yaButtonStyles },
]

export const LS_THEME = 'theme'
