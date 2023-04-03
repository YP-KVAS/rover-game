import React, { FC } from 'react'
import styles from './ToggleCheckbox.module.scss'

interface ToggleCheckboxProps {
  defaultChecked: boolean
  toggleChange: () => void
}

export const ToggleCheckbox: FC<ToggleCheckboxProps> = ({
  defaultChecked,
  toggleChange,
}) => {
  return (
    <label>
      <input
        type="checkbox"
        className={styles.toggle_input}
        defaultChecked={defaultChecked}
        onChange={toggleChange}
      />
      <div className={styles.toggle_state}>
        <div className={styles.toggle_control}>
          <div className={styles.toggle_inner}></div>
        </div>
      </div>
    </label>
  )
}
