import { MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'accent'
  htmlType?: 'submit' | 'reset' | 'button'
  children: string
  clickHandler?: MouseEventHandler | undefined
  isDisabled?: boolean
}

export const Button = ({
  type = 'primary',
  htmlType = 'button',
  children,
  clickHandler,
  isDisabled,
}: ButtonProps) => {
  const className = `${styles.btn} ${styles['btn-' + type]}`

  return (
    <button
      className={className}
      onClick={clickHandler}
      disabled={isDisabled}
      type={htmlType}>
      {children}
    </button>
  )
}
