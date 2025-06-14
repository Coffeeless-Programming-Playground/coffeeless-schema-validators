export class MinLengthArrayError extends Error {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} must contain at least ${num} element(s)`}`)
    this.name = 'MinLengthArrayError'
  }
}
