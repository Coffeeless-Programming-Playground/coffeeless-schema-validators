import { ForbiddenFieldError } from '@errors/forbidden-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate a field is not present in the schema.
 */
export class ForbiddenFieldInputValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates a input field is not present in a schema.
   * @param input The input value to validate.
   * @returns ForbiddenFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (input[this.field] !== null && input[this.field] !== undefined) {
      return new ForbiddenFieldError(this.field, this.message)
    }
  }
}
