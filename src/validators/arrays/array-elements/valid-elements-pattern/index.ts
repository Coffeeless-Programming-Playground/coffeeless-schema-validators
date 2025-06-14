import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldError } from '@errors/invalid-field-error'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate the elements of an array comply with a given
 * regex pattern.
 */
export class ArrayElementsMatchPatternValidator extends ChildInputValidator {
  constructor(
    private readonly pattern: RegExp,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that the elements of an array comply with a regex pattern.
   * @param input The input value to validate.
   * @returns InvalidFieldError | InvalidFieldError | undefined
   */
  validate(input: any): Error | undefined {
    for (const element of input[this.field] as string[]) {
      if (typeof element !== 'string') {
        return new InvalidFieldTypeError('Array element', `a ${DATA_TYPES.STRING}`)
      }
      if (!this.pattern.test(element)) {
        return new InvalidFieldError('Array element', this.message)
      }
    }
  }
}
