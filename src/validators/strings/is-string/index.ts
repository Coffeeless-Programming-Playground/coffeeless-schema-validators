import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field is a string.
 */
export class IsStringValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given field is a string.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (typeof input[this.field] !== 'string') {
      return new InvalidFieldTypeError(this.field, `a ${DATA_TYPES.STRING}`, this.message)
    }
  }
}
