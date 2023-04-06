import { FC } from 'react'
import styles from './Layout.module.scss'
import { Header } from '../Header/Header'
import { Outlet } from 'react-router-dom'

export const Layout: FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main_content}>
        <Outlet />
      </main>
    </div>
  )
}
