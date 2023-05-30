import { BASE_YA_URL } from '../utils/const-variables/api-yandex'
import { createProxyMiddleware } from 'http-proxy-middleware'

const proxyOptions = {
  target: BASE_YA_URL,
  changeOrigin: true,
  pathRewrite: { '^/ya-api': '' },
  secure: false,
  cookieDomainRewrite: { '*': '' },
}
const proxy = createProxyMiddleware(proxyOptions)

export default proxy
