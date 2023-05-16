import styles from './Modal.module.scss'
import ReactDOM from 'react-dom'
import { FC, ReactNode, useEffect } from 'react'

interface ModalProps {
  onClose: () => void
  children: ReactNode
}

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === 'Escape' ? onClose() : null
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [onClose])

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.modal_overlay} onClick={onClose}></div>
      <div className={styles.modal_content}>
        <svg className={styles.close_icon} onClick={onClose} tabIndex={0}>
          <use xlinkHref="./images/icons-sprite.svg#close"></use>
        </svg>
        <div className={styles.modal_info}>{children}</div>
      </div>
    </div>,
    document.getElementById('modal')!
  )
}
