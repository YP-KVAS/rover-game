import { FormEventHandler } from 'react'
import styles from './Form.module.scss'

export const Form = ({
  onSubmit,
  children,
}: {
  onSubmit: FormEventHandler
  children: JSX.Element[]
}) => {
  return (
    <form onSubmit={onSubmit} className={styles.form}>
      {children}
    </form>
  )
}
