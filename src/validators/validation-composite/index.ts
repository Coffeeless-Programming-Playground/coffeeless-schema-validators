import { ChildInputValidator, InputValidator, ValidationSchema } from '@protocols/index'

/**
 * A class that implements the Composite pattern to execute all validators defined in the
 * {@link ValidationSchema} with a single method call.
 */
export class CompositeValidator<T = any> implements InputValidator<T> {
  private readonly validators: ChildInputValidator[] = []
  private readonly errors: Error[] = []
  private fail: boolean = false

  constructor(validationSchema: ValidationSchema<T>) {
    this.addValidators(validationSchema)
  }

  /**
   * Loops through all key and values of the validation schema to append all input validators
   * to the validators list, setting their field to the key to which they map. The field
   * will be the property of a given object that will be validated.
   * @param validationSchema The {@link ValidationSchema}
   */
  private addValidators(validationSchema: ValidationSchema<any>) {
    for (const [key, validators] of Object.entries(validationSchema)) {
      for (const validator of validators) {
        validator.setField(key)
        this.validators.push(validator)
      }
    }
  }

  /**
   * Calls all input validators in a loop to perform all validations as described in the {@link ValidationSchema}.
   * If failFast was called, validate will throw the first exception return by any of the validators; otherwise,
   * validate will return the list of errors that the client can use to customize the output to the user.
   * @param An input given that will be validated according to the {@link ValidationSchema}.
   * @returns Error[] | undefined
   */
  validate(input: T): Error[] | undefined {
    for (const validator of this.validators) {
      const error = validator.validate(input) as Error
      if (this.fail && error) {
        throw error
      } else if (error) {
        this.errors.push(error)
      }
    }
    return this.errors
  }

  /**
   * Instructs the CompositeValidator to throw the first exception being returned by any of the input validators.
   * @returns CompositeValidator
   */
  failFast(): CompositeValidator {
    this.fail = true
    return this
  }
}
