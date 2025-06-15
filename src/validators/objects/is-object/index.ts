import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an field is an object.
 */
export class IsObjectValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given field is an object.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (
      typeof input[this.field] !== 'object' ||
      input[this.field] === null ||
      Array.isArray(input[this.field]) ||
      Object.keys(input[this.field]).length === 0
    ) {
      return new InvalidFieldTypeError(this.field, `an ${DATA_TYPES.OBJECT}`, this.message)
    }
  }
}
