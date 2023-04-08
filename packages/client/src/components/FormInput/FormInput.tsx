import { UseFormRegisterReturn } from 'react-hook-form'
import styles from './FormInput.module.scss'
import { useEffect, useRef } from 'react'
import { InputError } from '../InputError/InputError'
import { InputType } from '../../utils/types/forms'

type FormInputProps = {
  type?: InputType
  label?: string
  placeholder?: string
  registerObj: UseFormRegisterReturn
  errorMsg?: string
}

export const FormInput = ({
  label,
  type = 'text',
  placeholder,
  registerObj,
  errorMsg,
}: FormInputProps) => {
  const { ref } = registerObj
  const inputRef = useRef(null)

  useEffect(() => {
    ref(inputRef.current)
  }, [ref])

  return (
    <>
      {label && <label className={styles.input_label}>{label}</label>}

      <div className={styles.input_container}>
        <input
          {...registerObj}
          ref={inputRef}
          type={type}
          placeholder={placeholder}
          className={styles.input}
          aria-invalid={errorMsg ? 'true' : 'false'}
        />
        {errorMsg && <InputError message={errorMsg} inputRef={inputRef} />}
      </div>
    </>
  )
}
