import { ValidationError } from './validation-error'

export class ForbiddenFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not a valid field`}`)
    this.name = 'ForbiddenFieldError'
  }
}
