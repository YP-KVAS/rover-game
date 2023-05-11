// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: react for ssr
import React from 'react'
import App from './src/App'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { StaticRouter } from 'react-router-dom/server'

export function render(url: string) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>
  )
}
