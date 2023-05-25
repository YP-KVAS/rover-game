import styles from '../Forum.module.scss'
import React, { FC, useEffect } from 'react'
import { Button } from '../../Button/Button'
import { AddForumItemForm, AddForumItemFormProps } from './AddForumItemForm'

interface AddForumItemWithStateProps extends AddForumItemFormProps {
  buttonLabel: string
  displayForm: boolean
  setDisplayForm: React.Dispatch<React.SetStateAction<boolean>>
}

export const AddForumItemWithState: FC<AddForumItemWithStateProps> = ({
  buttonLabel,
  submitButtonLabel,
  resetButtonLabel,
  errorMessage,
  children,
  handleFormSubmit,
  handleFormReset,
  displayForm,
  setDisplayForm,
}) => {
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
      <div className={styles.add_forum_item_button}>
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
