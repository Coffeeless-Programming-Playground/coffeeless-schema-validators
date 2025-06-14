import { TimestampExpirationError } from '@errors/timestamp-expiration-error'
import { ChildInputValidator } from '@protocols/child-input-validator'

/**
 * An {@link ChildInputValidator} implementation to validate if a given timestamp
 * has expired.
 */
export class TimestampExpirationValidator extends ChildInputValidator {
  constructor(private readonly message?: string) {
    super()
  }

  /**
   * Validates if a given Unix timestamp has expired by comparing it
   * to the current time in seconds.
   * @param input The input value to validate.
   * @returns TimestampExpirationError if the timestamp has expired.
   */
  validate(input: any): Error | undefined {
    const now = Math.floor(Date.now() / 1000)
    if (input[this.field] && input[this.field] < now) {
      return new TimestampExpirationError(this.field, this.message)
    }
  }
}
