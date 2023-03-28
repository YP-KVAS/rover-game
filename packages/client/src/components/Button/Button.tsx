import { MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  type: 'primary' | 'secondary' | 'accent'
  children: string
  clickHandler?: MouseEventHandler | undefined
}

export const Button = ({
  type = 'primary',
  children,
  clickHandler,
}: ButtonProps) => {
  const className = `${styles.btn} ${styles['btn-' + type]}`

  return (
    <button onClick={clickHandler} className={className}>
      {children}
    </button>
  )
}
