import dotenv from 'dotenv'
import cors from 'cors'
import type { ViteDevServer } from 'vite'

dotenv.config()
import { dbConnect } from './db'
dbConnect()

import express from 'express'
import {
  API_VERSION,
  CATEGORIES_URL,
  COMMENTS_URL,
  TOPICS_URL,
  USER_URL,
} from './src/utils/const-variables/api'
import categoryRouter from './src/router/api-router/CategoryRouter'
import userRouter from './src/router/api-router/UserRouter'
import topicRouter from './src/router/api-router/TopicRouter'
import commentRouter from './src/router/api-router/CommentRouter'
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
import { ThunkUserRepository } from './src/repositories/ThunkUserRepository'
import { ThunkForumRepository } from './src/repositories/ThunkForumRepository'
import serialize from 'serialize-javascript'

async function startServer() {
  const app = express()
  app.use(cors(corsOptions))
  app.use(YA_API_URL, proxy)

  app.use(express.json())
  app.use(`${API_VERSION}${CATEGORIES_URL}`, categoryRouter)
  app.use(`${API_VERSION}${TOPICS_URL}`, topicRouter)
  app.use(`${API_VERSION}${COMMENTS_URL}`, commentRouter)
  app.use(`${API_VERSION}${USER_URL}`, userRouter)
  if (isDev()) {
    const swaggerUi = await import('swagger-ui-express')
    const swaggerDoc = await import('./swagger.json')
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))
  }

  let vite: ViteDevServer | undefined

  const distPath = path.dirname(require.resolve('client/dist/index.html'))
  const srcPath = path.dirname(
    path.dirname(require.resolve('client/package.json'))
  )
  const ssrClientPath = require.resolve('client/dist-ssr/client.cjs')

  if (isDev()) {
    vite = await getViteDevServer(srcPath)
    app.use(vite.middlewares)
  } else {
    app.use('/assets', express.static(path.resolve(distPath, 'assets')))
    app.use('/images', express.static(path.resolve(distPath, 'images')))
    app.use('/sw.js', express.static(path.resolve(distPath, 'sw.js')))
  }

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl

    try {
      let template = getTemplate(distPath, srcPath)
      if (vite) {
        template = await vite.transformIndexHtml(url, template)
      }

      const render: (...args: unknown[]) => Promise<string> = vite
        ? (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render
        : (await import(ssrClientPath)).render

      const [initialState, appHtml] = await render(
        url,
        new ThunkUserRepository(req.headers.cookie),
        new ThunkForumRepository(req.headers.cookie)
      )

      const preloadedState = `<script>window.__PRELOADED_STATE__=${serialize(
        initialState,
        { isJSON: true }
      )}</script>`

      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!--store-outlet-->`, preloadedState)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error)
      }
      next(e)
    }
  })

  app.listen(serverPort, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
  })
}

startServer()
