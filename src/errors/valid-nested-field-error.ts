import { ValidationError } from './validation-error'

export class ValidNestedFieldError extends ValidationError {
  constructor(message: string) {
    super(message)
    this.name = 'ValidNestedFieldError'
  }
}
