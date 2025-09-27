import { ValidationError } from './validation-error'

export class IsNegativeFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not negative`}`)
    this.name = 'IsNegativeFieldError'
  }
}
