import {
  ArrayElementsMatchPatternValidator,
  IsArrayValidator,
  LengthArrayMatchesValidator,
  MinArrayElementsLengthValidator,
  MinLengthArrayValidator
} from '@validators/arrays'
import { BaseValidator } from '../base-validator-builder'

/**
 * Builder class that implements the Builder pattern to add validation rules on array fields
 * meant to be use for schema/input validation.
 */
export class ArrayValidatorBuilder extends BaseValidator<ArrayValidatorBuilder> {
  /**
   * Initializes the validator array to add validation rules and adds an {@link IsArrayValidator}
   * @param message An optional message to display error text when is array validation fails.
   * @returns ArrayValidatorBuilder
   */
  static init(message?: string): ArrayValidatorBuilder {
    return new ArrayValidatorBuilder([new IsArrayValidator(message)])
  }

  /**
   * Sets the minimum length of elements an array should contain.
   * @param length number parameter. Represents minimum length of the array.
   * @param message An optional message to display error text.
   * @returns ArrayValidatorBuilder
   */
  min(minLength: number, message?: string): ArrayValidatorBuilder {
    this.validators.push(new MinLengthArrayValidator(minLength, message))
    return this
  }

  // TODO: implement max, and length ref: https://joi.dev/api/?v=17.13.3#arrayminlimit

  /**
   * Sets the minimum length of each string element inside an array.
   * @param length number parameter. Represents minimum length of each string element inside an array.
   * @param message An optional message to display error text.
   * @returns ArrayValidatorBuilder
   */
  elementsMinSize(minLength: number, message?: string): ArrayValidatorBuilder {
    this.validators.push(new MinArrayElementsLengthValidator(minLength, message))
    return this
  }

  /**
   * Validates that all elements inside an array match a regex pattern.
   * @param pattern A regex pattern {@link RegExp}.
   * @param message An optional message to display error text.
   * @returns ArrayValidatorBuilder
   */
  elementsMatchPattern(pattern: RegExp, message?: string): ArrayValidatorBuilder {
    this.validators.push(new ArrayElementsMatchPatternValidator(pattern, message))
    return this
  }

  /**
   * Validates that a given array length maches anotherArray in the schema.
   * @param otherFieldName The name of the other array field in the schema.
   * @param message An optional message to display error text.
   * @returns ArrayValidatorBuilder
   */
  lengthMatches(otherFieldName: string, message?: string): ArrayValidatorBuilder {
    this.validators.push(new LengthArrayMatchesValidator(otherFieldName, message))
    return this
  }
}
