import { BadRequestException } from './bad-request-exception'

export class TimestampExpirationError extends BadRequestException {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} has expired`}`)
    this.name = 'TimestampExpirationError'
  }
}
