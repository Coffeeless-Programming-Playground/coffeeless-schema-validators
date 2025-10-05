import { PatternValidatorProps } from '@protocols/pattern-validator-props'
import { IsObjectValidator, ObjectKeyValueMatchesValidator } from '@validators/objects'
import { BaseValidatorBuilder } from '../base-validator-builder'
import { ObjectValidator } from '@protocols/object-validator'

/**
 * Builder class that implements the Builder pattern to add validation rules on object fields
 * meant to be use for schema/input validation.
 */
export class ObjectValidatorBuilder extends BaseValidatorBuilder<ObjectValidatorBuilder> {
  /**
   * Initializes a object validation builder to add validation rules and adds an {@link IsObjectValidator}
   * @param objectValidator An {@link ObjectValidator}
   * @param message An optional message to display error text when is object validation fails.
   * @param optional An optional boolean value to determine if a field should not be validated if marked as optional.
   * @returns ObjectValidatorBuilder
   */
  static init<T = any>(
    objectValidator?: ObjectValidator<T>,
    message?: string,
    optional?: boolean
  ): ObjectValidatorBuilder {
    return new ObjectValidatorBuilder([new IsObjectValidator(objectValidator, message, optional)])
  }

  /**
   * @remarks
   * ⚠️ use this method for objects with one level of nesting.
   *
   * Verifies that object keys contain expected key names and that values
   * are valid against provided schema validators.
   * @param patternValidatorProps A {@link PatternValidatorProps}
   *
   * The `allowedKey` property can take either a regex expression or an array of strings
   * to compare against each object key.
   * @param message An optional message to display error text.
   * @returns ObjectValidatorBuilder
   */
  pattern(patternValidatorProps: PatternValidatorProps, message?: string): ObjectValidatorBuilder {
    this.validators.push(new ObjectKeyValueMatchesValidator(patternValidatorProps, message))
    return this
  }
}
