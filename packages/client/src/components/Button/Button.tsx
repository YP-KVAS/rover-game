import { CSSProperties, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

type ButtonProps = {
  type?: 'primary' | 'secondary' | 'accent'
  htmlType?: 'submit' | 'reset' | 'button'
  children: string
  clickHandler?: MouseEventHandler | undefined
  isDisabled?: boolean
  style?: CSSProperties
}

export const Button = ({
  type = 'primary',
  htmlType = 'button',
  children,
  clickHandler,
  isDisabled,
  style,
}: ButtonProps) => {
  const className = `${styles.btn} ${styles['btn_' + type]}`

  return (
    <button
      className={className}
      onClick={clickHandler}
      disabled={isDisabled}
      type={htmlType}
      style={style}>
      {children}
    </button>
  )
}
