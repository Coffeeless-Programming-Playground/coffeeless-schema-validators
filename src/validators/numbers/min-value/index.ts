import { MinValueFieldError } from '@errors/min-value-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a number field has a given minimum value.
 */
export class MinNumberValueValidator extends ChildInputValidator {
  constructor(
    private readonly minValue: number,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that the number input value is equal or greater than the minimum value.
   * @param input The input value to validate.
   * @returns MinValueFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] !== undefined && input[this.field] < this.minValue) {
      return new MinValueFieldError(this.field, this.minValue, this.message)
    }
  }
}
