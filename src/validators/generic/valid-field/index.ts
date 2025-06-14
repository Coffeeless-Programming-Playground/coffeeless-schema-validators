import { InvalidFieldError } from '@errors/invalid-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field.
 */
export class ValidFieldInputValidator extends ChildInputValidator {
  constructor(
    private readonly pattern: RegExp,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that a given input matches a regex pattern.
   * @param input The input value to validate.
   * @returns InvalidFieldError | undefined
   */
  validate(input: any): Error | undefined {
    return (
      input[this.field] &&
      !this.pattern.test(input[this.field]) &&
      new InvalidFieldError(this.field, this.message)
    )
  }
}
