import styles from '../Forum.module.scss'
import { FC, FormEvent, useEffect, useRef } from 'react'
import { Button } from '../../Button/Button'
import { Form } from '../../Form/Form'

export interface AddForumItemFormProps {
  children: JSX.Element
  handleFormSubmit: (e: FormEvent) => void
  handleFormReset: () => void
  errorMessage?: string | null
  submitButtonLabel?: string
  resetButtonLabel?: string
  flexGrow?: number
}

export const AddForumItemForm: FC<AddForumItemFormProps> = ({
  submitButtonLabel = 'Сохранить',
  resetButtonLabel = 'Отменить',
  flexGrow = 1,
  errorMessage = null,
  children,
  handleFormSubmit,
  handleFormReset,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  return (
    <div style={{ flex: flexGrow }} ref={ref}>
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
