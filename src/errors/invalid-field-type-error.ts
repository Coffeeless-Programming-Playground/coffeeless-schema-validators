export class InvalidFieldTypeError extends Error {
  constructor(fieldName: string, fieldType: string, message?: string) {
    super(`${message ?? `${fieldName} is not ${fieldType}`}`)
    this.name = 'InvalidFieldTypeError'
  }
}
