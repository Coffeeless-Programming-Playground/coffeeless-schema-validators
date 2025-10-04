import { IsTimestampValidator, TimestampExpirationValidator } from '@validators/timestamp'
import { BaseValidatorBuilder } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on unix timestamp fields
 * meant to be use for schema/input validation.
 */
export class TimestampValidatorBuilder extends BaseValidatorBuilder<TimestampValidatorBuilder> {
  /**
   * Initializes a timestamp validation builder to add validation rules and adds an {@link IsTimestampValidator}
   * @param message An optional message to display error text when is timestamp validation fails.
   * @param optional An optional boolean value to determine if a field should not be validated if marked as optional.
   * @returns TimestampValidatorBuilder
   */
  static init(message?: string, optional?: boolean): TimestampValidatorBuilder {
    return new TimestampValidatorBuilder([new IsTimestampValidator(message, optional)])
  }

  /**
   * Validates if a given timestamp has expired.
   * @param message An optional message to display error text.
   * @returns TimestampValidatorBuilder
   */
  expired(message?: string): TimestampValidatorBuilder {
    this.validators.push(new TimestampExpirationValidator(message))
    return this
  }
}
