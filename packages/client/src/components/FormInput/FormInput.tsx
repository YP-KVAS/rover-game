import { FieldError } from 'react-hook-form'
import './FormInput.css'

type TInputSettings = {
  [key: string]: unknown
}

type TInputErrors = FieldError | undefined

type TInputErrorsMsgs = {
  [key: string]: string
}

type FormInputProps = {
  label: string
  registerObj: TInputSettings
  errors: TInputErrors
  errorsMsgs: TInputErrorsMsgs
}

export const FormInput = ({
  label,
  registerObj,
  errors,
  errorsMsgs,
}: FormInputProps) => {
  return (
    <div className="input--container">
      {label && <label className="input--label">{label}</label>}
      <input
        className="input"
        {...registerObj}
        aria-invalid={errors ? 'true' : 'false'}
      />
      {errors?.type === 'required' && (
        <p className="input--error" role="alert">
          {errorsMsgs.required}
        </p>
      )}
      {errors?.type === 'pattern' && (
        <p className="input--error" role="alert">
          {errorsMsgs.pattern}
        </p>
      )}
      {errors?.type === 'minLength' && (
        <p className="input--error" role="alert">
          {errorsMsgs.minLength}
        </p>
      )}
      {errors?.type === 'maxLength' && (
        <p className="input--error" role="alert">
          {errorsMsgs.minLength}
        </p>
      )}
    </div>
  )
}
