import { ValidationError } from './validation-error'

export class LengthNotEqualError extends ValidationError {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} length does not match ${anotherFieldName}`}`)
    this.name = 'LengthNotEqualError'
  }
}
