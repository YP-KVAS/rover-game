type TButton = {
  type: 'primary' | 'secondary' | 'accent'
  children: string
  clickHandler?: MouseEventHandler | undefined
}
