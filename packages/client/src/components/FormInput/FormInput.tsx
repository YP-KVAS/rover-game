import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './FormInput.module.scss'
import { useEffect, useRef } from 'react'
import { InputError } from '../InputError/InputError'
import { InputType } from '../../utils/types/forms'

type FormInputProps = {
  type?: InputType
  label?: string
  placeholder?: string
  disabled?: boolean
  defaultValue?: string
  registerObj: UseFormRegisterReturn
  errorMsg?: string
  accept?: string
  rows?: number
}

export const FormInput = ({
  label,
  type = 'text',
  disabled = false,
  placeholder,
  defaultValue = '',
  registerObj,
  errorMsg,
  accept,
  rows = 1,
}: FormInputProps) => {
  const { ref } = registerObj
  const inputRef = useRef(null)

  useEffect(() => {
    ref(inputRef.current)
  }, [ref])

  const Input = rows > 1 ? 'textarea' : 'input'

  return (
    <>
      {label && <label className={styles.input_label}>{label}</label>}

      <div className={styles.input_container}>
        <Input
          {...registerObj}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          defaultValue={defaultValue}
          accept={accept}
          className={styles.input}
          aria-invalid={errorMsg ? 'true' : 'false'}
          rows={rows}
        />
        {errorMsg && <InputError message={errorMsg} inputRef={inputRef} />}
      </div>
    </>
  )
}
