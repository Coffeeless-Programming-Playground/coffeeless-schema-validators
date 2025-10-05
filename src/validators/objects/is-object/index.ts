import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError, ValidNestedFieldError } from '@errors/index'
import { ChildInputValidator, ObjectValidator } from '@protocols/index'

/**
 * An {@link ChildInputValidator} implementation to validate an field is an object.
 */
export class IsObjectValidator extends ChildInputValidator {
  constructor(
    private readonly objectValidator?: ObjectValidator<any>,
    private readonly message?: string,
    isOptional?: boolean
  ) {
    super(isOptional)
  }

  /**
   * Validates that a given field is an object.
   * @param input The input value to validate.
   * @returns InvalidFieldTypeError | undefined
   */
  validate(input: any): Error | undefined {
    if (this.isOptionalAndFieldIsNotPresent(input)) return

    if (
      typeof input[this.field] !== 'object' ||
      input[this.field] === null ||
      Array.isArray(input[this.field]) ||
      Object.keys(input[this.field]).length === 0
    ) {
      return new InvalidFieldTypeError(this.field, `an ${DATA_TYPES.OBJECT}`, this.message)
    }

    return (
      this.objectValidator &&
      this.validateRecursively(this.objectValidator, input[this.field], this.field)
    )
  }

  private validateRecursively(schema: any, target: any, parentField: string): Error | undefined {
    if (target === undefined || parentField === undefined) {
      return new ValidNestedFieldError(`Your input on field ${this.field} is malformed.`)
    }
    for (const key in schema) {
      const value = schema[key]
      if (Array.isArray(value)) {
        for (const validator of value) {
          validator.setField(key)
          if (validator.validate(target)) {
            return new ValidNestedFieldError(key, parentField, this.message)
          }
        }
      } else {
        const error = this.validateRecursively(value, target[key], key)
        if (error) {
          return error
        }
      }
    }
  }
}
