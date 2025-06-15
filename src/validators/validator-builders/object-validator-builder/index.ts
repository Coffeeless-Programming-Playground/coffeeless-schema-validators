import { IsObjectValidator } from '@validators/objects'
import { BaseValidator } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on object fields
 * meant to be use for schema/input validation.
 */
export class ObjectValidatorBuilder extends BaseValidator<ObjectValidatorBuilder> {
  /**
   * Initializes a object validation builder to add validation rules and adds an {@link IsObjectValidator}
   * @param message An optional message to display error text when is object validation fails.
   * @returns ObjectValidatorBuilder
   */
  static init(message?: string): ObjectValidatorBuilder {
    return new ObjectValidatorBuilder([new IsObjectValidator(message)])
  }
}
