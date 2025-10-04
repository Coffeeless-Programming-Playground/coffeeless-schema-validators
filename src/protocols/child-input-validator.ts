import { InputValidator } from './input-validator'

/**
 * Base class for all child input validators.
 */
export abstract class ChildInputValidator implements InputValidator {
  /**
   * The name of the input field to be validated.
   */
  protected field!: string

  /**
   * Takes a boolean to check if a series of validations to perform on
   * a field are optional. The default behavior is to perform validations on a field.
   * @param optional A boolean.
   */
  constructor(protected readonly optional: boolean = false) {}

  /**
   * Sets the field to be validated.
   * @param field The name of the input field to be validated.
   */
  setField(field: string): void {
    this.field = field
  }

  /**
   * Returns a field subject to validation.
   * @returns A field subject to validation.
   */
  getField() {
    return this.field
  }

  /**
   * Checks if a given validator is optional.
   * @returns a boolean.
   */
  isOptional(): boolean {
    return this.optional
  }

  /**
   * Validates the field from a given input.
   * @param input Any input.
   * @returns Error | undefined
   */
  abstract validate(input: any): Error | undefined
}
