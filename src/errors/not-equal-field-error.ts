import { ValidationError } from './validation-error'

export class NotEqualFieldError extends ValidationError {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not equal to ${anotherFieldName}`}`)
    this.name = 'NotEqualFieldError'
  }
}
