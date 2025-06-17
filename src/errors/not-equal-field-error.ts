import { BadRequestException } from './bad-request-exception'

export class NotEqualFieldError extends BadRequestException {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not equal to ${anotherFieldName}`}`)
    this.name = 'NotEqualFieldError'
  }
}
