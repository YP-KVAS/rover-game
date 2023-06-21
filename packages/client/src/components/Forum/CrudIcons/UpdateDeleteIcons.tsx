import { FC } from 'react'
import styles from './CrudIcons.module.scss'

interface UpdateDeleteIconsProps {
  editHandler: () => void
  deleteHandler: () => void
}

export const UpdateDeleteIcons: FC<UpdateDeleteIconsProps> = ({
  editHandler,
  deleteHandler,
}) => {
  return (
    <div className={styles.svg_icons}>
      <svg className={styles.svg_icon} onClick={editHandler}>
        <use xlinkHref="./images/icons-sprite.svg#edit"></use>
      </svg>
      <svg className={styles.svg_icon} onClick={deleteHandler}>
        <use xlinkHref="./images/icons-sprite.svg#delete"></use>
      </svg>
    </div>
  )
}
