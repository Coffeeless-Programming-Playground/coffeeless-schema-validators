import { InputValidatorBuilder } from '@validators/builder'

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
