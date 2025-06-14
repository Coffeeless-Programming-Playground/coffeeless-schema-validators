import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field is a timestamp.
 */
export class IsTimestampValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given field is a timestamp.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (
      input[this.field] !== undefined &&
      (typeof input[this.field] !== 'number' ||
        !Number.isFinite(input[this.field]) ||
        input[this.field] <= 0 ||
        input[this.field] >= 9999999999)
    ) {
      return new InvalidFieldTypeError(this.field, `a ${DATA_TYPES.TIMESTAMP}`, this.message)
    }
  }
}
