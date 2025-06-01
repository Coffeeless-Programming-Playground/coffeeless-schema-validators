import { ChildInputValidator } from '@protocols/child-input-validator'
import {
  EmailInputValidator,
  MinLengthInputValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator
} from '@validators/index'

/**
 * Builder class that implements the Builder pattern to add validation rules meant to be use for schema/input validation.
 */
export class InputValidatorBuilder {
  private constructor(private readonly validators: ChildInputValidator[]) {}

  /**
   * Initialized the validator array to add validation rules.
   * @returns InputValidatorBuilder
   */
  static init(): InputValidatorBuilder {
    return new InputValidatorBuilder([])
  }

  /**
   * Sets a field as required.
   * @returns InputValidatorBuilder
   */
  required(message?: string): InputValidatorBuilder {
    this.validators.push(new RequiredFieldInputValidator(message))
    return this
  }

  /**
   * Sets the minimum length of characters a field should contain.
   * @param length number parameter. Represents minimum length of the input.
   * @returns InputValidatorBuilder
   */
  min(minLength: number, message?: string): InputValidatorBuilder {
    this.validators.push(new MinLengthInputValidator(minLength, message))
    return this
  }

  /**
   * Verifies email being valid.
   * @param message An optional message to display error text.
   * @returns InputValidatorBuilder
   */
  email(message?: string): InputValidatorBuilder {
    this.validators.push(new EmailInputValidator(message))
    return this
  }

  /**
   * Validates that a given input matches a regex pattern.
   * @param pattern A regex pattern {@link RegExp}.
   * @param message An optional message to display error text.
   * @returns InputValidatorBuilder
   */
  valid(pattern: RegExp, message?: string): InputValidatorBuilder {
    this.validators.push(new ValidFieldInputValidator(pattern, message))
    return this
  }

  /**
   * Return all of the validations as an array to be used for the validationSchema.
   * @returns ChildInputValidator array
   */
  build(): ChildInputValidator[] {
    return this.validators
  }
}
