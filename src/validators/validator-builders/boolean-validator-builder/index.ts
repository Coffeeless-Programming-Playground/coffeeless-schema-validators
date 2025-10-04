import {
  IsBooleanValidator,
  IsFalseBooleanValidator,
  IsTrueBooleanValidator
} from '@validators/booleans'
import { BaseValidatorBuilder } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on boolean fields
 * meant to be use for schema/input validation.
 */
export class BooleanValidatorBuilder extends BaseValidatorBuilder<BooleanValidatorBuilder> {
  /**
   * Initializes a boolean validation builder to add validation rules and adds an {@link IsBooleanValidator}
   * @param message An optional message to display error text when is number validation fails.
   * @param optional An optional boolean value to determine if a field should not be validated if marked as optional.
   * @returns BooleanValidatorBuilder
   */
  static init(message?: string, optional?: boolean): BooleanValidatorBuilder {
    return new BooleanValidatorBuilder([new IsBooleanValidator(message, optional)])
  }

  /**
   * Validates if a given boolean value is true.
   * @param message An optional message to display error text.
   * @returns A BooleanValidatorBuilder.
   */
  isTrue(message?: string): BooleanValidatorBuilder {
    this.validators.push(new IsTrueBooleanValidator(message))
    return this
  }

  /**
   * Validates if a given boolean value is false.
   * @param message An optional message to display error text.
   * @returns A BooleanValidatorBuilder.
   */
  isFalse(message?: string): BooleanValidatorBuilder {
    this.validators.push(new IsFalseBooleanValidator(message))
    return this
  }
}
