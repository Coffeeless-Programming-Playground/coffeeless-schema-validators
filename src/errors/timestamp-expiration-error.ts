export class TimestampExpirationError extends Error {
  constructor(fieldName: string, message?: string) {
    super(`${message ?? `${fieldName} has expired`}`)
    this.name = 'TimestampExpirationError'
  }
}
