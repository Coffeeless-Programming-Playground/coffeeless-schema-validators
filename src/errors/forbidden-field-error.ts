import { ValidationError } from './validation-error'

export class ForbiddenFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is a forbidden field`}`)
    this.name = 'ForbiddenFieldError'
  }
}
