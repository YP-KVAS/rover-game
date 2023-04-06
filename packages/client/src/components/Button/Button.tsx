import { MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'accent'
  children: string
  clickHandler?: MouseEventHandler | undefined
  isDisabled?: boolean
}

export const Button = ({
  type = 'primary',
  children,
  clickHandler,
  isDisabled,
}: ButtonProps) => {
  const className = `${styles.btn} ${styles['btn_' + type]}`

  return (
    <button className={className} onClick={clickHandler} disabled={isDisabled}>
      {children}
    </button>
  )
}
