import React, { FC } from 'react'
import styles from './FormWithEdit.module.scss'
import formStyles from '../../common-styles/Form.module.scss'
import { TitleWithEdit } from '../TitleWithEdit/TitleWithEdit'
import { Form } from '../Form/Form'
import { Button } from '../Button/Button'

interface FormWithEditProps {
  title: string
  editDisabled: boolean
  enableEdit: () => void
  handleFormSubmit: () => void
  handleFormReset: () => void
  children: JSX.Element
  errorMessage: string | null
}

export const FormWithEdit: FC<FormWithEditProps> = ({
  title,
  editDisabled,
  enableEdit,
  handleFormSubmit,
  handleFormReset,
  children,
  errorMessage,
}) => {
  return (
    <div className={styles.form_wrapper}>
      <TitleWithEdit title={title} enableEditHandler={enableEdit} />
      <Form onSubmit={handleFormSubmit} onReset={handleFormReset}>
        {children}
        <>
          {!editDisabled && (
            <div className={formStyles.form_actions}>
              <Button htmlType="submit" type="primary">
                Сохранить изменения
              </Button>
              <Button htmlType="reset" type="secondary">
                Отменить
              </Button>
            </div>
          )}
          {errorMessage && (
            <p className={formStyles.form_error_message}>{errorMessage}</p>
          )}
        </>
      </Form>
    </div>
  )
}
