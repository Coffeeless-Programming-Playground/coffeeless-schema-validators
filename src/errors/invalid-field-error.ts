import { BadRequestException } from './bad-request-exception'

export class InvalidFieldError extends BadRequestException {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is invalid`}`)
    this.name = 'InvalidFieldError'
  }
}
