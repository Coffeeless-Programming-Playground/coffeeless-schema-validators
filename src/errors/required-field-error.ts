import { BadRequestException } from './bad-request-exception'

export class RequiredFieldError extends BadRequestException {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is Required`}`)
    this.name = 'RequiredFieldError'
  }
}
