import {
  IsNegativeNumberValidator,
  IsNumberValidator,
  IsPositiveNumberValidator,
  MinNumberValueValidator
} from '@validators/numbers'
import { BaseValidator } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on number fields
 * meant to be use for schema/input validation.
 */
export class NumberValidatorBuilder extends BaseValidator<NumberValidatorBuilder> {
  /**
   * Initializes a number validation builder to add validation rules and adds an {@link IsNumberValidator}
   * @param message An optional message to display error text when is number validation fails.
   * @returns NumberValidatorBuilder
   */
  static init(message?: string, optional?: boolean): NumberValidatorBuilder {
    return new NumberValidatorBuilder([new IsNumberValidator(message, optional)])
  }

  /**
   * Validates if a given number is equal or greater than a given value.
   * @param minValue The minimum value to compare a number field against.
   * @param message An optional message to display error text.
   * @returns NumberValidatorBuilder
   */
  min(minValue: number, message?: string): NumberValidatorBuilder {
    this.validators.push(new MinNumberValueValidator(minValue, message))
    return this
  }

  /**
   * Validates if a given number is positive.
   * @param message An optional message to display error text.
   * @returns NumberValidatorBuilder
   */
  positive(message?: string): NumberValidatorBuilder {
    this.validators.push(new IsPositiveNumberValidator(message))
    return this
  }

  /**
   * Validates if a given number is negative.
   * @param message An optional message to display error text.
   * @returns NumberValidatorBuilder
   */
  negative(message?: string): NumberValidatorBuilder {
    this.validators.push(new IsNegativeNumberValidator(message))
    return this
  }
}
