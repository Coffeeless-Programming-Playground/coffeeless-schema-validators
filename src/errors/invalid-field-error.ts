import { ValidationError } from './validation-error'

export class InvalidFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is invalid`}`)
    this.name = 'InvalidFieldError'
  }
}
