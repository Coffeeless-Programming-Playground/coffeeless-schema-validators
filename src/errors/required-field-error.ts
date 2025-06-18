import { ValidationError } from './validation-error'

export class RequiredFieldError extends ValidationError {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is Required`}`)
    this.name = 'RequiredFieldError'
  }
}
