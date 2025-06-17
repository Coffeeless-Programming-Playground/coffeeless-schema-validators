import { BadRequestException } from './bad-request-exception'

export class InvalidFieldTypeError extends BadRequestException {
  constructor(fieldName: string, fieldType: string, message?: string) {
    super(`${message ?? `${fieldName} is not ${fieldType}`}`)
    this.name = 'InvalidFieldTypeError'
  }
}
