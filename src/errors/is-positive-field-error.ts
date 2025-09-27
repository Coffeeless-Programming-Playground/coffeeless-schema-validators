import { ValidationError } from './validation-error'

export class IsPositiveFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not positive`}`)
    this.name = 'IsPositiveFieldError'
  }
}
