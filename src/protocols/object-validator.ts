import { ChildInputValidator } from './child-input-validator'

/**
 * A type which maps a given interface to an object schema validator
 * to allow for property autocompletion.
 */
export type ObjectValidator<T = any> = {
  [K in keyof T]: ChildInputValidator[] | ObjectValidator<T[K]>
}
