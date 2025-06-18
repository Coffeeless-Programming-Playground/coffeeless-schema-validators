import { ValidationError } from './validation-error'

export class InvalidFieldTypeError extends ValidationError {
  constructor(fieldName: string, fieldType: string, message?: string) {
    super(`${message ?? `${fieldName} is not ${fieldType}`}`)
    this.name = 'InvalidFieldTypeError'
  }
}
