import { ValidationSchema } from '@protocols/validation-schema'
import { CompositeValidator } from '@validators/validation-composite'
import {
  ArrayValidatorBuilder,
  StringValidatorBuilder,
  TimestampValidatorBuilder
} from '@validators/validator-builders'

/**
 * Initializes an array validator to apply validation rules on an array field.
 * @param message An optional message to return an error if is array validation fails.
 * @returns ArrayValidatorBuilder
 */
export function array(message?: string) {
  return ArrayValidatorBuilder.init(message)
}

/**
 * Initializes an string validator to apply validation rules on a string field.
 * @param message An optional message to return an error if is string validation fails.
 * @returns StringValidatorBuilder
 */
export function string(message?: string) {
  return StringValidatorBuilder.init(message)
}

/**
 * Initializes an timestamp validator to apply validation rules on a timestamp field.
 * @param message An optional message to return an error if is string validation fails.
 * @returns TimestampValidatorBuilder
 */
export function timestamp(message?: string) {
  return TimestampValidatorBuilder.init(message)
}

/**
 * Creates a CompositeValidator instance which implements the composite pattern to apply schema validations
 * in cascade.
 * @param validationSchema A {@link ValidationSchema}
 * @returns CompositeValidator A validator to which all schema validators are injected to iteratively apply
 * validation and all schema fields.
 */
export function schemaValidator<T>(validationSchema: ValidationSchema<T>) {
  return new CompositeValidator<T>(validationSchema)
}
