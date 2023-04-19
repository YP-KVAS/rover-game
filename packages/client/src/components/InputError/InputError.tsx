import { FC, RefObject, useEffect, useRef } from 'react'
import styles from './InputError.module.scss'

interface InputErrorProps {
  message: string
  inputRef: RefObject<HTMLInputElement>
}

export const InputError: FC<InputErrorProps> = ({ message, inputRef }) => {
  const errorRef: RefObject<HTMLParagraphElement> = useRef(null)

  const computeTop = () => {
    const inputHeight = inputRef.current?.clientHeight || 0
    const errorHeight = errorRef.current?.clientHeight || 0

    if (inputHeight > errorHeight) {
      return `${(inputHeight - errorHeight) / 2}px`
    } else if (errorHeight > inputHeight) {
      return `-${(errorHeight - inputHeight) / 2}px`
    } else {
      return '0px'
    }
  }

  useEffect(() => {
    if (errorRef.current) {
      errorRef.current.style.top = computeTop()
    }
  }, [message])

  return (
    <p className={styles.input_error} role="alert" ref={errorRef}>
      {message}
    </p>
  )
}
