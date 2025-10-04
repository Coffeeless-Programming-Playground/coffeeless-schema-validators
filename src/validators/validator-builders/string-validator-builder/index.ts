import { EmailInputValidator, MinLengthInputValidator } from '@validators/index'
import {
  CompareStringFieldValidator,
  IsStringValidator,
  MaxLengthInputValidator
} from '@validators/strings'
import { BaseValidatorBuilder } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on string fields
 * meant to be use for schema/input validation.
 */
export class StringValidatorBuilder extends BaseValidatorBuilder<StringValidatorBuilder> {
  /**
   * Initialized the validator array to add validation rules and adds an {@link IsStringValidator}
   * @param message An optional message to display error text when is string validation fails.
   * @param optional An optional boolean value to determine if a field should not be validated if marked as optional.
   * @returns StringValidatorBuilder
   */
  static init(message?: string, optional?: boolean): StringValidatorBuilder {
    return new StringValidatorBuilder([new IsStringValidator(message, optional)])
  }

  /**
   * Sets the minimum length of characters a field should contain.
   * @param minLength number parameter. Represents minimum length of the input.
   * @param message An optional message to display error text.
   * @returns StringValidatorBuilder
   */
  min(minLength: number, message?: string): StringValidatorBuilder {
    this.validators.push(new MinLengthInputValidator(minLength, message))
    return this
  }

  /**
   * Sets the maximum length of characters a field should contain.
   * @param maxLength number parameter. Represents maximum length of the input.
   * @param message An optional message to display error text.
   * @returns StringValidatorBuilder
   */
  max(maxLength: number, message?: string): StringValidatorBuilder {
    this.validators.push(new MaxLengthInputValidator(maxLength, message))
    return this
  }

  /**
   * Verifies email being valid.
   * @param message An optional message to display error text.
   * @returns StringValidatorBuilder
   */
  email(message?: string): StringValidatorBuilder {
    this.validators.push(new EmailInputValidator(message))
    return this
  }

  /**
   * Verifies a given string has the same value as another string in the schema.
   * @param anotherField An existing field in the schema.
   * @param message An optional message to display error text.
   * @returns StringValidatorBuilder
   */
  equal(anotherField: string, message?: string): StringValidatorBuilder {
    this.validators.push(new CompareStringFieldValidator(anotherField, message))
    return this
  }
}
