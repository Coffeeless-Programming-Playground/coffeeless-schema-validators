export interface User {
  timestamp: number
  name: string
  email: string
  pets: string[]
  age: number
  info: {
    address: string
    zipCode: number
  }
  phoneNumber: string
}
