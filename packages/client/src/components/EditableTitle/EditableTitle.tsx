import { FC } from 'react'
import styles from './EditableTitle.module.scss'

interface EditableTitleProps {
  title: string
  enableEditHandler: () => void
}

export const EditableTitle: FC<EditableTitleProps> = ({
  title,
  enableEditHandler,
}) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.header_edit} onClick={enableEditHandler}>
        <svg className={styles.svg_icon}>
          <use xlinkHref="./images/icons-sprite.svg#edit"></use>
        </svg>
        <span className={styles.header_edit_text}>Редактировать</span>
      </div>
    </div>
  )
}
