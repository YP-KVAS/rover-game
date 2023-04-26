import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDoc from './swagger.json'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { dbConnect } from './db'
import { BASE_YA_URL, YA_API_URL } from './src/utils/const-variables/api-yandex'
import {
  API_VERSION,
  CATEGORIES_URL,
  TOPICS_URL,
  USERS_URL,
} from './src/utils/const-variables/api'
import categoryRouter from './src/router/api-router/CategoryRouter'
import userRouter from './src/router/api-router/UserRouter'
import topicRouter from './src/router/api-router/TopicRouter'

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const clientPort = Number(process.env.CLIENT_PORT) || 3000
const serverPort = Number(process.env.SERVER_PORT) || 3001

// TODO: configure cors origin
const corsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  origin: [
    `http://127.0.0.1:${clientPort}`,
    `http://localhost:${clientPort}`,
    `http://127.0.0.1:${serverPort}`,
    `http://localhost:${serverPort}`,
    BASE_YA_URL,
  ],
}
app.use(cors(corsOptions))

// TODO: configure cookieDomainRewrite
const proxyOptions = {
  target: BASE_YA_URL,
  changeOrigin: true,
  pathRewrite: { '^/ya-api': '' },
  secure: false,
  cookieDomainRewrite: { '.ya-praktikum.tech': 'localhost' },
}
const proxy = createProxyMiddleware(proxyOptions)

dbConnect()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :)')
})
app.use(`${API_VERSION}${CATEGORIES_URL}`, categoryRouter)
app.use(`${API_VERSION}${TOPICS_URL}`, topicRouter)
app.use(`${API_VERSION}${USERS_URL}`, userRouter)
app.use(YA_API_URL, proxy)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))

app.listen(serverPort, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${serverPort}`)
})
