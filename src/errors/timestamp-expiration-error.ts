import { ValidationError } from './validation-error'

export class TimestampExpirationError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} has expired`}`)
    this.name = 'TimestampExpirationError'
  }
}
