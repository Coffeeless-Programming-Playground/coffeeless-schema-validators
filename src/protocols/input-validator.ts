import type { ValidationSchema } from './validation-schema'
/**
 * Interface that is implemented by all input validators to enforce Composite pattern
 * which will help abstract all child validators logic from the user.
 */
export interface InputValidator<T = any> {
  /**
   * Validates a given input.
   * @param input An input given that will be validated according to the {@link ValidationSchema}.
   * @returns Error | Error [] | undefined.
   */
  validate: (input: T) => Error | Error[] | undefined
}
