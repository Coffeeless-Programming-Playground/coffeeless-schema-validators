import { EmailFieldError } from '@errors/email-field-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate an email field.
 */
export class EmailInputValidator extends ChildInputValidator {
  private readonly regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates that the input field value is a valid email.
   * @param input The input value to validate.
   * @returns EmailFieldError | undefined
   */
  validate(input: any): Error | undefined {
    if (!this.regex.test(input[this.field])) {
      return new EmailFieldError(this.field, this.message)
    }
  }
}
