import { IsTrueFieldError } from '@errors/is-true-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a boolean value is true.
 */
export class IsTrueBooleanValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given boolean value is true.
   * @param input The input value to validate.
   * @returns IsTrueFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] === false) {
      return new IsTrueFieldError(this.field, this.message)
    }
  }
}
