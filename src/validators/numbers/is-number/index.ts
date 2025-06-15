import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an field is a number.
 */
export class IsNumberValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given field is a number.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] !== undefined && typeof input[this.field] !== 'number') {
      return new InvalidFieldTypeError(this.field, `a ${DATA_TYPES.NUMBER}`, this.message)
    }
  }
}
