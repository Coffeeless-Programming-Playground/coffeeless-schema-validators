import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an field is a boolean.
 */
export class IsBooleanValidator extends ChildInputValidator {
  constructor(
    private readonly message?: string,
    isOptional?: boolean
  ) {
    super(isOptional)
  }

  /**
   * Validates that a given field is a boolean.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (this.isOptionalAndFieldIsNotPresent(input)) return

    if (typeof input[this.field] !== 'boolean') {
      return new InvalidFieldTypeError(this.field, `a ${DATA_TYPES.BOOLEAN}`, this.message)
    }
  }
}
