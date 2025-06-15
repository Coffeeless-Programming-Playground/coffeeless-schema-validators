import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { LengthNotEqualError } from '@errors/length-not-equal-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an array length is equal to another array length
 */
export class LengthArrayMatchesValidator extends ChildInputValidator {
  constructor(
    private readonly anotherField: string,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that a given array length is equal to another array length
   * @param input The input value to validate.
   * @returns LengthNotEqualError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.anotherField] !== undefined && !Array.isArray(input[this.anotherField])) {
      return new InvalidFieldTypeError(this.anotherField, `an ${DATA_TYPES.ARRAY}`)
    }

    if (
      input[this.field] !== undefined &&
      input[this.field].length !== input[this.anotherField].length
    ) {
      return new LengthNotEqualError(this.field, this.anotherField, this.message)
    }
  }
}
