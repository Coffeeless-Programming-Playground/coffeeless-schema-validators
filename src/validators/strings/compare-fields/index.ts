import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { NotEqualFieldError } from '@errors/not-equal-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate string field is equal to another string field.
 */
export class CompareStringFieldValidator extends ChildInputValidator {
  constructor(
    private readonly anotherField: string,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that a given string field is equal to another string field
   * @param input The input value to validate.
   * @returns NotEqualFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.anotherField] !== undefined && typeof input[this.anotherField] !== 'string') {
      return new InvalidFieldTypeError(this.anotherField, `a ${DATA_TYPES.STRING}`)
    }

    if (input[this.field] !== undefined && input[this.field] !== input[this.anotherField]) {
      return new NotEqualFieldError(this.field, this.anotherField, this.message)
    }
  }
}
