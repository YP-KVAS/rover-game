import { useNavigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { RoutesEnum } from '../utils/const-variables/routes'

export const useIntegerParams = (param: string) => {
  const navigate = useNavigate()
  const { [param]: pathParam } = useParams()

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore expect to be null or not parsable to int, extra isNaN check added
  const integerParam = parseInt(pathParam)

  useEffect(() => {
    if (isNaN(integerParam)) {
      navigate(RoutesEnum.MAIN)
    }
  }, [integerParam])

  return integerParam
}
