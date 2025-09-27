import { IsPositiveFieldError } from '@errors/is-positive-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a number field is positive.
 */
export class IsPositiveNumberValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a number is positive.
   * @param input The input value to validate.
   * @returns IsPositiveFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] <= 0) {
      return new IsPositiveFieldError(this.field, this.message)
    }
  }
}
