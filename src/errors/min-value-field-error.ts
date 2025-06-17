import { BadRequestException } from './bad-request-exception'

export class MinValueFieldError extends BadRequestException {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} value must be at least ${num}`}`)
    this.name = 'MinValueFieldError'
  }
}
