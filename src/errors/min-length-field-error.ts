import { BadRequestException } from './bad-request-exception'

export class MinLengthFieldError extends BadRequestException {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must be ${num} characters at least`}`)
    this.name = 'MinLengthFieldError'
  }
}
