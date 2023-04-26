import styles from './Dropdown.module.scss'
import { FC, useState } from 'react'
import { Button } from '../Button/Button'

interface OptionProps {
  id: number
  name: string
}

interface DropdownProps {
  options: Array<OptionProps>
  defaultOption?: OptionProps
  onSelect: (id: number) => void
}

export const Dropdown: FC<DropdownProps> = ({
  options,
  defaultOption,
  onSelect,
}) => {
  const [isOpened, setIsOpened] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    defaultOption ?? options[0]
  )

  const toggleDropdown = () => setIsOpened(!isOpened)
  const closeDropdownOnMouseLeave = () => setIsOpened(false)

  const handleOptionSelect = (option: OptionProps) => {
    if (option.id !== selectedOption.id) {
      setSelectedOption(option)
      onSelect(option.id)
    }
    toggleDropdown()
  }

  return (
    <div
      className={styles.dropdown_wrapper}
      onMouseLeave={closeDropdownOnMouseLeave}>
      <div className={`${styles.dropdown} ${isOpened ? styles.opened : ''}`}>
        <Button clickHandler={toggleDropdown}>{selectedOption.name}</Button>
        <ul className={styles.options}>
          {options.map(option => (
            <li
              key={option.id}
              className={styles.option_item}
              onClick={() => handleOptionSelect(option)}>
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
