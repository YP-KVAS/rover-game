import styles from './PageLinks.module.scss'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { getPaginationItems } from '../../utils/paginate'
import { PAGE_QUERY } from '../../utils/const-variables/routes'

interface PageLinksProps {
  currentPage: number
  maxPage: number
}

export const PageLinks: FC<PageLinksProps> = ({ currentPage, maxPage }) => {
  const pages = getPaginationItems(currentPage, maxPage)

  return (
    <div className={styles.links}>
      {pages.map((page, idx) => {
        return page ? (
          <Link
            key={idx}
            to={{ search: `?${PAGE_QUERY}=${page}` }}
            className={page === currentPage ? styles.active : ''}>
            {page}
          </Link>
        ) : (
          <span key={idx}>...</span>
        )
      })}
    </div>
  )
}
