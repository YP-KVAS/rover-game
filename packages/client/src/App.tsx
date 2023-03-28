import { useEffect } from 'react'
import './App.scss'
import { Registration } from './pages/Registration/Registration'

function App() {
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
    <div className="App">
      <Registration />
    </div>
  )
}

export default App
