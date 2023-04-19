import styles from '../Forum.module.scss'
import { FC, useEffect, useState } from 'react'
import { Button } from '../../Button/Button'
import { AddForumItemForm, AddForumItemFormProps } from './AddForumItemForm'

interface AddForumItemWithStateProps extends AddForumItemFormProps {
  buttonLabel: string
}

export const AddForumItemWithState: FC<AddForumItemWithStateProps> = ({
  buttonLabel,
  submitButtonLabel,
  resetButtonLabel,
  errorMessage,
  children,
  handleFormSubmit,
  handleFormReset,
}) => {
  const [displayForm, setDisplayForm] = useState(false)
  const displayInputs = () => setDisplayForm(true)

  useEffect(() => {
    window.scrollTo({ behavior: 'smooth', top: document.body.scrollHeight })
  }, [displayForm])

  const onReset = () => {
    handleFormReset()
    setDisplayForm(false)
  }

  return (
    <div className={styles.add_forum_item}>
      <div>
        <Button clickHandler={displayInputs}>{buttonLabel}</Button>
      </div>
      {displayForm && (
        <AddForumItemForm
          submitButtonLabel={submitButtonLabel}
          resetButtonLabel={resetButtonLabel}
          errorMessage={errorMessage}
          handleFormSubmit={handleFormSubmit}
          handleFormReset={onReset}>
          {children}
        </AddForumItemForm>
      )}
    </div>
  )
}
