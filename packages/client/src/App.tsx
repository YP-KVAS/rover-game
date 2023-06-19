import styles from './App.module.css'
import { useEffect, useMemo, useState } from 'react'
import { ThemeContext } from './contexts/ThemeContext'
import {
  LS_THEME,
  Theme,
  ThemeColors,
  THEMES,
} from './utils/const-variables/theme'
import { Route, Routes } from 'react-router-dom'
import { IRoute, routes } from './router'

function App() {
  const getDefaultTheme = (): Theme => {
    const lsTheme = localStorage.getItem(LS_THEME) as Theme
    const browserDefault = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light'
    return lsTheme || browserDefault
  }

  const [currentThemeName, setCurrentThemeName] = useState<Theme>(
    typeof window === 'undefined' ? Theme.LIGHT : getDefaultTheme()
  )

  useEffect(() => {
    const theme = THEMES[currentThemeName]
    Object.keys(theme).forEach(key =>
      document.documentElement.style.setProperty(
        `${key.replaceAll('_', '-')}`,
        theme[key as keyof ThemeColors]
      )
    )
    localStorage.setItem(LS_THEME, currentThemeName)
  }, [currentThemeName])

  const changeTheme = (theme: Theme) => setCurrentThemeName(() => theme)

  const appRoutes = useMemo(() => {
    return mapRoutesRecursive(routes)
  }, [routes])

  return (
    <ThemeContext.Provider value={{ themeName: currentThemeName, changeTheme }}>
      <div className={styles.app}>
        <Routes>{appRoutes}</Routes>
      </div>
    </ThemeContext.Provider>
  )
}

export default App

const mapRoutesRecursive = (routes: IRoute[]) => {
  return routes.map(route => {
    return (
      <Route path={route.path} element={route.element} key={route.path}>
        {route.children && mapRoutesRecursive(route.children)}
      </Route>
    )
  })
}
