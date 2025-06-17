import { BadRequestException } from './bad-request-exception'

export class LengthNotEqualError extends BadRequestException {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} length does not match ${anotherFieldName}`}`)
    this.name = 'LengthNotEqualError'
  }
}
