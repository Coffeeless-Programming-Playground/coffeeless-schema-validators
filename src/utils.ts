import { ValidationSchema } from '@protocols/validation-schema'
import { InputValidatorBuilder, CompositeValidator } from '@validators/index'

export function email() {
  return InputValidatorBuilder.init().email()
}

export function min(minLength: number) {
  return InputValidatorBuilder.init().min(minLength)
}

export function required() {
  return InputValidatorBuilder.init().required()
}

export function valid(pattern: RegExp) {
  return InputValidatorBuilder.init().valid(pattern)
}

export function schemaValidator<T>(validationSchema: ValidationSchema<T>) {
  return new CompositeValidator<T>(validationSchema)
}
