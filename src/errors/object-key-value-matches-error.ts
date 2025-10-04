import { ValidationError } from './validation-error'

export class ObjectKeyValueMatchesError extends ValidationError {
  constructor(keyName: string, fieldName: string, message?: string) {
    super(`${message ?? `${keyName} in ${fieldName} is not valid`}`)
    this.name = 'ObjectKeyValueMatchesError'
  }
}
