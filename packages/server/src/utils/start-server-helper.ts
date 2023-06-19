import fs from 'fs'
import path from 'path'
import { BASE_YA_URL } from './const-variables/api-yandex'

export const isDev = () => process.env.NODE_ENV === 'development'

export const clientPort = Number(process.env.CLIENT_PORT) || 3000
export const serverPort = Number(process.env.SERVER_PORT) || 5000

export function getTemplate(distPath: string, srcPath: string) {
  return isDev()
    ? fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8')
    : fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8')
}

export async function getViteDevServer(srcPath: string) {
  const { createServer } = await import('vite')
  return await createServer({
    server: { middlewareMode: true },
    root: srcPath,
    appType: 'custom',
  })
}

export const corsOptions = {
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
  origin: isDev()
    ? [
        `http://127.0.0.1:${clientPort}`,
        `http://localhost:${clientPort}`,
        `http://127.0.0.1:${serverPort}`,
        `http://localhost:${serverPort}`,
        BASE_YA_URL,
      ]
    : process.env.CORS_ORIGINS?.split(' '),
}
