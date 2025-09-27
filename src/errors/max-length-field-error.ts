import { ValidationError } from './validation-error'

export class MaxLengthFieldError extends ValidationError {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must be ${num} characters at most`}`)
    this.name = 'MaxLengthFieldError'
  }
}
