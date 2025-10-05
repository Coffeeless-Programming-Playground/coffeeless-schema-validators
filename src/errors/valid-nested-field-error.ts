import { ValidationError } from './validation-error'

export class ValidNestedFieldError extends ValidationError {
  constructor(keyName: string, fieldName: string, message?: string)
  constructor(message: string)
  constructor(param1: unknown, param2?: unknown, param3?: unknown) {
    if (param2 === undefined) {
      super(param1 as string)
    } else {
      super(
        `${(param3 as string) ?? `${param1 as string} in ${param2 as string} field is not valid`}`
      )
    }
    this.name = 'ValidNestedFieldError'
  }
}
