import { MouseEventHandler } from 'react'
import './Button.css'

type TButton = {
  type: 'primary' | 'secondary' | 'accent'
  children: string
  clickHandler?: MouseEventHandler | undefined
}

export const Button = ({
  type = 'primary',
  children,
  clickHandler,
}: TButton) => {
  const className = `btn btn-${type}`

  return (
    <button
      onClick={clickHandler ? clickHandler : undefined}
      className={className}>
      {children}
    </button>
  )
}
