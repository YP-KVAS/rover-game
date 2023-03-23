import { FormEventHandler } from 'react'
import './Form.css'

export const Form = ({
  onSubmit,
  children,
}: {
  onSubmit: FormEventHandler
  children: JSX.Element[]
}) => {
  return (
    <form onSubmit={onSubmit} className="form">
      {children}
    </form>
  )
}
