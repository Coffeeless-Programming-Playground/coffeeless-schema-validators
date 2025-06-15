export class NotEqualFieldError extends Error {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} is not equal to ${anotherFieldName}`}`)
    this.name = 'NotEqualFieldError'
  }
}
