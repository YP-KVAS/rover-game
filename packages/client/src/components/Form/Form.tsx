import { FC, FormEventHandler } from 'react'
import styles from './Form.module.scss'

interface FormProps {
  onSubmit: FormEventHandler
  onReset?: FormEventHandler
  children: JSX.Element[]
}

export const Form: FC<FormProps> = ({ onSubmit, onReset, children }) => {
  return (
    <form onSubmit={onSubmit} onReset={onReset} className={styles.form}>
      {children}
    </form>
  )
}
