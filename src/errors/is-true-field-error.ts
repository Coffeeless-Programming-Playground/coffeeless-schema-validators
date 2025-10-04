import { ValidationError } from './validation-error'

export class IsTrueFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not true`}`)
    this.name = 'IsTrueFieldError'
  }
}
