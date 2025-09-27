import { MaxLengthFieldError } from '@errors/max-length-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field has a given maximum length.
 */
export class MaxLengthInputValidator extends ChildInputValidator {
  constructor(
    private readonly maxLength: number,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that the input value is less or equal than the maxLength.
   * @param input The input value to validate.
   * @returns MaxLengthFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] && input[this.field].length > this.maxLength) {
      return new MaxLengthFieldError(this.field, this.maxLength, this.message)
    }
  }
}
