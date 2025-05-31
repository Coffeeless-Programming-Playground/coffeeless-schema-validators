import { RequiredFieldError } from '@errors/required-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field is required.
 */
export class RequiredFieldInputValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates a input field is not empty
   * @param input The input value to validate
   * @returns RequiredFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (!input[this.field]) {
      return new RequiredFieldError(this.field, this.message)
    }
  }
}
