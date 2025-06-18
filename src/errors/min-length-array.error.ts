import { ValidationError } from './validation-error'

export class MinLengthArrayError extends ValidationError {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must contain at least ${num} element(s)`}`)
    this.name = 'MinLengthArrayError'
  }
}
