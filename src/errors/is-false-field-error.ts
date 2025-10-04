import { ValidationError } from './validation-error'

export class IsFalseFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not false`}`)
    this.name = 'IsFalseFieldError'
  }
}
