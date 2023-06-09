import { FormInputNames } from './forms'
import { UserRolesEnum } from '../const-variables/user-roles'

export interface UserSignIn extends Record<string, unknown> {
  [FormInputNames.LOGIN]: string
  [FormInputNames.PASSWORD]: string
}

export interface UserSignUp extends UserSignIn {
  [FormInputNames.FIRST_NAME]: string
  [FormInputNames.SECOND_NAME]: string
  [FormInputNames.EMAIL]: string
  [FormInputNames.PHONE]: string
}

export interface UserSettings extends Omit<UserSignUp, 'password'> {
  [FormInputNames.DISPLAY_NAME]: string
}

export interface User extends UserSettings {
  id: number
  [FormInputNames.AVATAR]: string | null
}

export interface UserExtended extends User {
  role: UserRolesEnum
  best_score: number | null
}

export interface IUserPassword extends Record<string, unknown> {
  [FormInputNames.OLD_PASSWORD]: string
  [FormInputNames.NEW_PASSWORD]: string
}

export interface UserScore {
  id: number
  best_score: number
}

export interface LeaderboardUser extends UserScore {
  [FormInputNames.AVATAR]: string | null
  [FormInputNames.DISPLAY_NAME]: string | null
}
