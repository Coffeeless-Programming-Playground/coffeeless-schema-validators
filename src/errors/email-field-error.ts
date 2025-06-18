import { ValidationError } from './validation-error'

export class EmailFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not valid`}`)
    this.name = 'EmailFieldError'
  }
}
