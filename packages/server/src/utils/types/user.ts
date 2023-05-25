import type { RolesEnum } from './api'

export interface User {
  id: number
  login: string
  first_name: string
  second_name: string
  email: string
  phone: string
  display_name: string
  avatar: string
}

export interface UserWithRole extends User {
  role: RolesEnum
}
