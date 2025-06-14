import { ChildInputValidator } from '@protocols/child-input-validator'
import { RequiredFieldInputValidator } from '@validators/generic/required-field'
import { ValidFieldInputValidator } from '@validators/generic/valid-field'

/**
 * Base validator class that provides common operations on all data type validators.
 */
export class BaseValidator<T> {
  protected constructor(protected readonly validators: ChildInputValidator[]) {}

  /**
   * Sets a field as required.
   * @returns T
   */
  required(message?: string): T {
    this.validators.push(new RequiredFieldInputValidator(message))
    return this as unknown as T
  }

  /**
   * Validates that a given input matches a regex pattern.
   * @param pattern A regex pattern {@link RegExp}.
   * @param message An optional message to display error text.
   * @returns InputValidatorBuilder
   */
  valid(pattern: RegExp, message?: string): T {
    this.validators.push(new ValidFieldInputValidator(pattern, message))
    return this as unknown as T
  }

  /**
   * Return all of the validations as an array to be used for the validationSchema.
   * @returns ChildInputValidator array
   */
  build(): ChildInputValidator[] {
    return this.validators
  }
}
