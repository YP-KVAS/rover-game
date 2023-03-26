import styles from './Button.module.css'

export const Button = ({
  type = 'primary',
  children,
  clickHandler,
}: TButton) => {
  const className = `${styles.btn} ${styles['btn-' + type]}`

  return (
    <button onClick={clickHandler} className={className}>
      {children}
    </button>
  )
}
