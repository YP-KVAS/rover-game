import { useEffect, useState } from 'react'
import './App.css'
import { Theme, ThemeContext } from './contexts/ThemeContext'
import { LS_THEME, ThemeColors, THEMES } from './utils/const-variables/theme'
import { Header } from './components/header/Header'
import { MainContent } from './components/main-content/MainContent'

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
    getDefaultTheme()
  )

  useEffect(() => {
    const theme = THEMES[currentThemeName]
    Object.keys(theme).forEach(key =>
      document.documentElement.style.setProperty(
        `--${key}`,
        theme[key as keyof ThemeColors]
      )
    )
    localStorage.setItem(LS_THEME, currentThemeName)
  }, [currentThemeName])

  const changeTheme = (themeName: Theme) => setCurrentThemeName(themeName)

  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])

  return (
    <ThemeContext.Provider
      value={{ themeName: currentThemeName, setThemeName: changeTheme }}>
      <div className="App">
        <Header />
        <MainContent />
      </div>
    </ThemeContext.Provider>
  )
}

export default App
