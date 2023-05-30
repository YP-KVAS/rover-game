import { useNavigate, useSearchParams } from 'react-router-dom'
import { PAGE_QUERY } from '../utils/const-variables/routes'
import { useEffect } from 'react'

export const useCurrentPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const page = searchParams.get(PAGE_QUERY)
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore expect to be null or not parsable to int, extra isNaN check added
  const currentPage = parseInt(page)

  useEffect(() => {
    if (isNaN(currentPage)) {
      navigate({ search: `?${PAGE_QUERY}=1` })
    }
  }, [currentPage])

  return currentPage
}
