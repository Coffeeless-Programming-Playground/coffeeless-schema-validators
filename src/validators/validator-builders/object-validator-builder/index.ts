import { IsObjectValidator } from '@validators/objects'
import { BaseValidatorBuilder } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on object fields
 * meant to be use for schema/input validation.
 */
export class ObjectValidatorBuilder extends BaseValidatorBuilder<ObjectValidatorBuilder> {
  /**
   * Initializes a object validation builder to add validation rules and adds an {@link IsObjectValidator}
   * @param message An optional message to display error text when is object validation fails.
   * @param optional An optional boolean value to determine if a field should not be validated if marked as optional.
   * @returns ObjectValidatorBuilder
   */
  static init(message?: string, optional?: boolean): ObjectValidatorBuilder {
    return new ObjectValidatorBuilder([new IsObjectValidator(message, optional)])
  }
}
