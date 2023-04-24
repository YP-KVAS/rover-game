import { FC, useEffect, useRef } from 'react'
import styles from '../Forum.module.scss'
import { Button } from '../../Button/Button'
import { Form } from '../../Form/Form'

export interface AddForumItemFormProps {
  children: JSX.Element
  handleFormSubmit: () => void
  handleFormReset: () => void
  errorMessage?: string | null
  submitButtonLabel?: string
  resetButtonLabel?: string
}

export const AddForumItemForm: FC<AddForumItemFormProps> = ({
  submitButtonLabel = 'Сохранить',
  resetButtonLabel = 'Отменить',
  errorMessage = null,
  children,
  handleFormSubmit,
  handleFormReset,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'nearest',
    })
  }, [])

  return (
    <div className={styles.form} ref={ref}>
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        {children}
        <div className={styles.actions}>
          <Button type="primary" htmlType="submit">
            {submitButtonLabel}
          </Button>
          <Button type="secondary" htmlType="reset">
            {resetButtonLabel}
          </Button>
        </div>
        <div>
          {errorMessage && <p className={styles.form_error}>{errorMessage}</p>}
        </div>
      </Form>
    </div>
  )
}
