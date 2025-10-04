export interface User {
  timestamp: number
  name: string
  surname?: string
  lastName: string
  email: string
  pets: string[]
  age: number
  info: {
    address: string
    zipCode: number
  }
  password: string
  confirmPassword: string
  phoneNumber: string
  isAlive: boolean
  isBroke: boolean
  isAMillionarie: boolean
  currentBalance: number
  ip?: string
  dogArray: {
    weight: string
    height: string
  }
  dogRegex: {
    weight: string
    height: string
  }
}
