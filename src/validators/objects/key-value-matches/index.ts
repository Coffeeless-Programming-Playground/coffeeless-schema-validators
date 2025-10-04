import { ObjectKeyValueMatchesError } from '@errors/object-key-value-matches-error'
import { ChildInputValidator } from '@protocols/child-input-validator'
import { PatternValidatorProps } from '@protocols/pattern-validator-props'

/**
 * An {@link ChildInputValidator} implementation to validate object keys contain
 * expected key names, and that values are valid against provided schema validators.
 * This validator should only be used for objects with 1 level of nesting.
 */
export class ObjectKeyValueMatchesValidator extends ChildInputValidator {
  constructor(
    private readonly patternValidatorProps: PatternValidatorProps,
    private readonly message?: string
  ) {
    super()
  }

  /**
   * Validates that object keys are named as specified and values are valid.
   * @param input The input value to validate.
   * @returns ObjectKeyValueMatchesError | undefined
   */
  validate(input: any): Error | undefined {
    for (const key in input[this.field]) {
      if (Array.isArray(this.patternValidatorProps.allowedKeys)) {
        if (!this.patternValidatorProps.allowedKeys.includes(key)) {
          return new ObjectKeyValueMatchesError(key, this.field, this.message)
        }
      } else {
        if (!this.patternValidatorProps.allowedKeys.test(key)) {
          return new ObjectKeyValueMatchesError(key, this.field, this.message)
        }
      }

      for (const validator of this.patternValidatorProps.allowedValues) {
        validator.setField(key)
        const error = validator.validate(input[this.field])
        if (error) {
          return error
        }
      }
    }
  }
}
