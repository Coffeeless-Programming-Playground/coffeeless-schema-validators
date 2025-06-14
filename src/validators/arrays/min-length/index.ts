import { MinLengthArrayError } from '@errors/min-length-array.error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an array has a given minimum length.
 */
export class MinLengthArrayValidator extends ChildInputValidator {
  constructor(
    private readonly minLength: number,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that a given array length is equal or greater than the minLength.
   * @param input The input value to validate.
   * @returns MinLengthArrayError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] && input[this.field].length < this.minLength) {
      return new MinLengthArrayError(this.field, this.minLength, this.message)
    }
  }
}
