import { FieldError } from 'react-hook-form'
import styles from './FormInput.module.css'

type TInputSettings = {
  [key: string]: unknown
}

type TInputErrors = FieldError | undefined

type TInputErrorsMsgs = {
  [key: string]: string
}

type FormInputProps = {
  type?: 'text' | 'email' | 'password' | 'tel' | 'text'
  label?: string
  registerObj: TInputSettings
  errors: TInputErrors
  errorsMsgs: TInputErrorsMsgs
}

export const FormInput = ({
  label,
  type = 'text',
  registerObj,
  errors,
  errorsMsgs,
}: FormInputProps) => {
  return (
    <div className={styles['input--container']}>
      {label && <label className={styles['input--label']}>{label}</label>}
      <input
        type={type}
        className={styles.input}
        {...registerObj}
        aria-invalid={errors ? 'true' : 'false'}
      />
      {errors?.type === 'required' && (
        <p className={styles['input--error']} role="alert">
          {errorsMsgs.required}
        </p>
      )}
      {errors?.type === 'pattern' && (
        <p className={styles['input--error']} role="alert">
          {errorsMsgs.pattern}
        </p>
      )}
      {errors?.type === 'minLength' && (
        <p className={styles['input--error']} role="alert">
          {errorsMsgs.minLength}
        </p>
      )}
      {errors?.type === 'maxLength' && (
        <p className={styles['input--error']} role="alert">
          {errorsMsgs.minLength}
        </p>
      )}
    </div>
  )
}
