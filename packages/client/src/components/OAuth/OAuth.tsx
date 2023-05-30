import { FC } from 'react'
import { Button } from '../Button/Button'
import { getOAuthUrl, getServiceId } from '../../utils/rest-api/oauth-api'
import { OAUTH_REDIRECT_URI } from '../../utils/const-variables/api'

export const OAuth: FC = () => {
  const onRedirectToOAuth = async () => {
    const { service_id: serviceId } = await getServiceId(OAUTH_REDIRECT_URI)
    const oauthUrl = getOAuthUrl(serviceId, OAUTH_REDIRECT_URI)

    window.location.href = oauthUrl
  }

  return (
    <Button type="primary" htmlType="button" clickHandler={onRedirectToOAuth}>
      Войти c помощью Яндекс
    </Button>
  )
}
