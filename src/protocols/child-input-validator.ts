import { InputValidator } from './input-validator'

/**
 * Base class for all child input validators
 */
export abstract class ChildInputValidator implements InputValidator {
  protected field!: string

  /**
   * Sets the field to be validated
   * @param field The name of the input field to be validated.
   */
  setField(field: string): void {
    this.field = field
  }

  /**
   * Validates the field from a given input
   * @param input Any input
   * @returns Error | undefined
   */
  abstract validate(input: any): Error | undefined
}
