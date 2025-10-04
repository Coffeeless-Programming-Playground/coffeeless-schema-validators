import { IsFalseFieldError } from '@errors/is-false-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a boolean value is false.
 */
export class IsFalseBooleanValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that a given boolean value is false.
   * @param input The input value to validate.
   * @returns IsFalseFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] === true) {
      return new IsFalseFieldError(this.field, this.message)
    }
  }
}
