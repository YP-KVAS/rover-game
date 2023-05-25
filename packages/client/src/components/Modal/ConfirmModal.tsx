import styles from './Modal.module.scss'
import { FC } from 'react'
import { Modal } from './Modal'
import { Button } from '../Button/Button'

interface ConfirmModalProps {
  confirmHandler: () => void
  cancelHandler: () => void
  message: string
}

export const ConfirmModal: FC<ConfirmModalProps> = ({
  confirmHandler,
  cancelHandler,
  message,
}) => {
  return (
    <Modal onClose={cancelHandler}>
      <div className={styles.confirm_modal}>
        <p>{message}</p>
        <div className={styles.actions}>
          <Button clickHandler={confirmHandler} type="primary">
            Удалить
          </Button>
          <Button clickHandler={cancelHandler} type="secondary">
            Отменить
          </Button>
        </div>
      </div>
    </Modal>
  )
}
