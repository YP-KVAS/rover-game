import { FieldError, UseFormRegisterReturn } from 'react-hook-form'
import styles from './FormInput.module.scss'
import { useEffect, useRef } from 'react'

type TInputErrors = FieldError | undefined

type TInputErrorsMsgs = {
  [key: string]: string
}

type FormInputProps = {
  type?: 'text' | 'email' | 'password' | 'tel' | 'text'
  label?: string
  registerObj: UseFormRegisterReturn
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
  const { ref } = registerObj

  const errorRef = useRef<HTMLParagraphElement>(null)
  let inputRef: HTMLInputElement | null = null

  function computeTop() {
    const inputHeight = inputRef?.clientHeight || 0
    const errorHeight = errorRef.current?.clientHeight || 0

    if (inputHeight > errorHeight) {
      return `${(inputHeight - errorHeight) / 2}px`
    } else if (errorHeight > inputHeight) {
      return `-${(errorHeight - inputHeight) / 2}px`
    } else {
      return '0px'
    }
  }

  function setErrorsComponent() {
    return (
      <p className={styles.input_error} role="alert" ref={errorRef}>
        {errors?.type === 'required' && <>{errorsMsgs.required}</>}
        {errors?.type === 'minLength' && <>{errorsMsgs.minLength}</>}
        {errors?.type === 'maxLength' && <>{errorsMsgs.maxLength}</>}
        {errors?.type === 'pattern' && <>{errorsMsgs.pattern}</>}
      </p>
    )
  }

  useEffect(() => {
    setErrorsComponent()
    if (errorRef.current) {
      errorRef.current.style.top = computeTop()
    }
  }, [errors])

  return (
    <>
      {label && <label className={styles.input_label}>{label}</label>}

      <div className={styles.input_container}>
        <input
          {...registerObj}
          ref={element => {
            ref(element)
            inputRef = element
          }}
          type={type}
          className={styles.input}
          aria-invalid={errors ? 'true' : 'false'}
        />
        {errors && setErrorsComponent()}
      </div>
    </>
  )
}
