export interface UserSignIn extends Record<string, unknown> {
  login: string
  password: string
}

export interface UserSignUp extends UserSignIn {
  first_name: string
  second_name: string
  email: string
  phone: string
}

export interface UserSettings extends Omit<UserSignUp, 'password'> {
  display_name: string
}

export interface User extends UserSettings {
  id: number
  avatar: string | null
}

export interface UserPassword extends Record<string, unknown> {
  oldPassword: string
  newPassword: string
}
