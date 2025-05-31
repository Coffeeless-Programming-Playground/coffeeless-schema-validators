import { MinLengthFieldError } from '@errors/min-length-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field has a given minimum length.
 */
export class MinLengthInputValidator extends ChildInputValidator {
  constructor(
    private readonly minLength: number,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that the input value is equal or greater than the minLength.
   * @param input The input value to validate
   * @returns MinLengthFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] && input[this.field].length < this.minLength) {
      return new MinLengthFieldError(this.field, this.minLength, this.message)
    }
  }
}
