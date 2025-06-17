import { BadRequestException } from './bad-request-exception'

export class MinLengthArrayError extends BadRequestException {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must contain at least ${num} element(s)`}`)
    this.name = 'MinLengthArrayError'
  }
}
