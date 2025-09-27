import { ConditionalValidatorProps } from '@protocols/conditional-validator-props'
import { ValidationSchema } from '@protocols/validation-schema'
import { ConditionalValidator } from '@validators/conditional-validator'
import { ForbiddenFieldInputValidator } from '@validators/forbidden-validator'
import { CompositeValidator } from '@validators/validation-composite'
import {
  ArrayValidatorBuilder,
  BooleanValidatorBuilder,
  NumberValidatorBuilder,
  ObjectValidatorBuilder,
  StringValidatorBuilder,
  TimestampValidatorBuilder
} from '@validators/validator-builders'

/**
 * Initializes an object validator to apply validation rules on an object field.
 * @param message An optional message to return an error if is object validation fails.
 * @returns ObjectValidatorBuilder
 */
export function object(message?: string) {
  return ObjectValidatorBuilder.init(message)
}

/**
 * Initializes a boolean validator to apply validation rules on a boolean field.
 * @param message An optional message to return an error if is boolean validation fails.
 * @returns BooleanValidatorBuilder
 */
export function boolean(message?: string) {
  return BooleanValidatorBuilder.init(message)
}

/**
 * Initializes a number validator to apply validation rules on a number field.
 * @param message An optional message to return an error if is number validation fails.
 * @returns NumberValidatorBuilder
 */
export function number(message?: string) {
  return NumberValidatorBuilder.init(message)
}

/**
 * Initializes an array validator to apply validation rules on an array field.
 * @param message An optional message to return an error if is array validation fails.
 * @returns ArrayValidatorBuilder
 */
export function array(message?: string) {
  return ArrayValidatorBuilder.init(message)
}

/**
 * Initializes a string validator to apply validation rules on a string field.
 * @param message An optional message to return an error if is string validation fails.
 * @returns StringValidatorBuilder
 */
export function string(message?: string) {
  return StringValidatorBuilder.init(message)
}

/**
 * Initializes a timestamp validator to apply validation rules on a timestamp field.
 * @param message An optional message to return an error if is string validation fails.
 * @returns TimestampValidatorBuilder
 */
export function timestamp(message?: string) {
  return TimestampValidatorBuilder.init(message)
}

/**
 * Executes a validator on `then` field when `is` condition is met for a `targetField`; otherwise
 * executes validator on `otherwise` field.
 * @param targetField The field that subject to the validator on `is` field.
 * @param conditionalValidator A {@link ConditionalValidatorProps}.
 * @returns TimestampValidatorBuilder
 */
export function when(targetField: string, conditionalValidator: ConditionalValidatorProps) {
  return [new ConditionalValidator(targetField, conditionalValidator)]
}

/**
 * Validates that a field does not exist in the schema.
 * @param message An optional message to return an error if the field exists in the schema.
 * @returns ForbiddenFieldInputValidator
 */
export function forbidden(message?: string) {
  return [new ForbiddenFieldInputValidator(message)]
}

/**
 * Sets field validators as optional. If the field is present in the schema, field validations will apply; otherwise,
 * field validations will be omitted.
 * @returns A set of validator builders.
 */
export function optional() {
  return {
    object: (message?: string) => ObjectValidatorBuilder.init(message, true),
    boolean: (message?: string) => BooleanValidatorBuilder.init(message, true),
    number: (message?: string) => NumberValidatorBuilder.init(message, true),
    array: (message?: string) => ArrayValidatorBuilder.init(message, true),
    string: (message?: string) => StringValidatorBuilder.init(message, true),
    timestamp: (message?: string) => TimestampValidatorBuilder.init(message, true),
    when: (targetField: string, conditionalValidator: ConditionalValidatorProps) => [
      new ConditionalValidator(targetField, conditionalValidator, true)
    ]
  }
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
