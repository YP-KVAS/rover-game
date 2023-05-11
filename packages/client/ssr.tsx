// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: react for ssr
import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'

export function render() {
  return renderToString(<App />)
}
