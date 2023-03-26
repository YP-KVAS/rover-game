type TInputSettings = {
  [key: string]: unknown
}

type TInputErrors = FieldError | undefined

type TInputErrorsMsgs = {
  [key: string]: string
}

type FormInputProps = {
  type?: 'text' | 'email' | 'password' | 'tel' | 'text'
  label?: string
  registerObj: TInputSettings
  errors: TInputErrors
  errorsMsgs: TInputErrorsMsgs
}
