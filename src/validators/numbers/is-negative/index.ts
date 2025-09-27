import { IsNegativeFieldError } from '@errors/is-negative-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a number field is negative.
 */
export class IsNegativeNumberValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a number is negative
   * @param input The input value to validate.
   * @returns IsNegativeFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] >= 0) {
      return new IsNegativeFieldError(this.field, this.message)
    }
  }
}
