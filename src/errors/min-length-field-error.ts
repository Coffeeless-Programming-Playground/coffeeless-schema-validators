import { ValidationError } from './validation-error'

export class MinLengthFieldError extends ValidationError {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must be ${num} characters at least`}`)
    this.name = 'MinLengthFieldError'
  }
}
