import React, { useEffect } from 'react'
import './App.css'
import { router } from './router'
import { RouterProvider } from 'react-router-dom'

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
      <RouterProvider router={router} />
    </div>
  )
}

export default App
