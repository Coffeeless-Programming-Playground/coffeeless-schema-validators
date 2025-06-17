import { BadRequestException } from './bad-request-exception'

export class EmailFieldError extends BadRequestException {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not valid`}`)
    this.name = 'EmailFieldError'
  }
}
