export class LengthNotEqualError extends Error {
  constructor(fieldName: string, anotherFieldName: string, message?: string) {
    super(`${message ?? `${fieldName} length does not match ${anotherFieldName}`}`)
    this.name = 'LengthNotEqualError'
  }
}
