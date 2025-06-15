export class MinValueFieldError extends Error {
  constructor(fieldName: string, num: number, message?: string) {
    super(`${message ?? `${fieldName} value must be at least ${num}`}`)
    this.name = 'MinValueFieldError'
  }
}
