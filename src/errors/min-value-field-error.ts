import { ValidationError } from './validation-error'

export class MinValueFieldError extends ValidationError {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} value must be at least ${num}`}`)
    this.name = 'MinValueFieldError'
  }
}
