import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an field is an array.
 */
export class IsArrayValidator extends ChildInputValidator {
  constructor(
    private readonly message?: string,
    isOptional?: boolean
  ) {
    super(isOptional)
  }

  /**
   * Validates that a given field is an array.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] && !Array.isArray(input[this.field])) {
      return new InvalidFieldTypeError(this.field, `an ${DATA_TYPES.ARRAY}`, this.message)
    }
  }
}
