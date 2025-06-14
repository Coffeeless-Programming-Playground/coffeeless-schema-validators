import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { MinLengthFieldError } from '@errors/min-length-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate all string elements inside an array have a min length.
 */
export class MinArrayElementsLengthValidator extends ChildInputValidator {
  constructor(
    private readonly minLength: number,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that all string elements inside an array are equal or greater than the minLength.
   * @param input The input value to validate.
   * @returns MinLengthFieldError | undefined
   */
  validate(input: any): Error | undefined {
    for (const element of input[this.field] as string[]) {
      if (typeof element !== 'string') {
        return new InvalidFieldTypeError('Array element', `a ${DATA_TYPES.STRING}`)
      }
      if (element.length < this.minLength) {
        return new MinLengthFieldError('Array element', this.minLength, this.message)
      }
    }
  }
}
