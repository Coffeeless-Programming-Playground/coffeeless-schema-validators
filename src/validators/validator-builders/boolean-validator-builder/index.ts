import { IsBooleanValidator } from '@validators/booleans'
import { BaseValidator } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on boolean fields
 * meant to be use for schema/input validation.
 */
export class BooleanValidatorBuilder extends BaseValidator<BooleanValidatorBuilder> {
  /**
   * Initializes a boolean validation builder to add validation rules and adds an {@link IsBooleanValidator}
   * @param message An optional message to display error text when is number validation fails.
   * @returns BooleanValidatorBuilder
   */
  static init(message?: string, optional?: boolean): BooleanValidatorBuilder {
    return new BooleanValidatorBuilder([new IsBooleanValidator(message, optional)])
  }
}
