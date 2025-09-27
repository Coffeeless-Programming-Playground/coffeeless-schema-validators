import { ChildInputValidator } from '@protocols/child-input-validator'
import { ConditionalValidatorProps } from '@protocols/conditional-validator-props'

/**
 * An {@link ChildInputValidator} implementation to validate a field given a targetField and a {@link ConditionalValidatorProps}.
 * The field that is subject to validation, is validated conditionally based on a targetField validation.
 */
export class ConditionalValidator extends ChildInputValidator {
  constructor(
    private readonly targetField: string,
    private readonly conditionalValidator: ConditionalValidatorProps
  ) {
    super()
  }

  /**
   * Conditionally validates a field based on a targetField validation.
   * @param input The input value to validate.
   * @returns Error | undefined
   */
  validate(input: any): Error | undefined {
    try {
      for (const validation of this.conditionalValidator.is) {
        validation.setField(this.targetField)
        const error = validation.validate(input)
        if (error) {
          throw error
        }
      }
    } catch (error: any) {
      for (const validation of this.conditionalValidator.otherwise) {
        validation.setField(this.field)
        const error = validation.validate(input)
        if (error) {
          return error
        }
      }
      return
    }
    for (const validation of this.conditionalValidator.then) {
      validation.setField(this.field)
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
