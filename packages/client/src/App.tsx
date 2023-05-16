import styles from './App.module.css'
import { useEffect, useMemo, useState } from 'react'
import { Theme, ThemeContext } from './contexts/ThemeContext'
import { LS_THEME, ThemeColors, THEMES } from './utils/const-variables/theme'
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
    typeof window === 'undefined' ? 'light' : getDefaultTheme()
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

  const changeTheme = () =>
    setCurrentThemeName(prevState => (prevState === 'dark' ? 'light' : 'dark'))

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

const mapRoutesRecursive = (routes: Array<IRoute>) => {
  return routes.map(route => {
    return (
      <Route path={route.path} element={route.element} key={route.path}>
        {route.children && mapRoutesRecursive(route.children)}
      </Route>
    )
  })
}
