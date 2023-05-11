import dotenv from 'dotenv'
import cors from 'cors'
import type { ViteDevServer } from 'vite'

dotenv.config()
import { createClientAndConnect } from './db'
createClientAndConnect()

import express from 'express'
import * as path from 'path'
import { YA_API_URL } from './src/utils/const-variables/api-yandex'
import proxy from './src/middlewares/proxy-middleware'
import {
  corsOptions,
  getTemplate,
  getViteDevServer,
  isDev,
  serverPort,
} from './src/utils/start-server-helper'

async function startServer() {
  const app = express()
  app.use(cors(corsOptions))
  app.use(YA_API_URL, proxy)

  let vite: ViteDevServer | undefined
  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(require.resolve('client'))
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  if (isDev()) {
    vite = await getViteDevServer(srcPath)
    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/images', express.static(path.resolve(distPath, 'images')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = getTemplate(distPath, srcPath)
      if (isDev()) {
        template = await vite!.transformIndexHtml(url, template)
      }

      const render: (...args: Array<unknown>) => Promise<string> = isDev()
        ? (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
        : (await import(ssrClientPath)).render

      const appHtml = await render()

      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (isDev()) {
        vite!.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(serverPort, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
  })
}

startServer()
