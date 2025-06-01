import { InputValidatorBuilder } from '@validators/builder'
import { email, min, required, schemaValidator, valid } from './utils'
import { CompositeValidator } from '@validators/validation-composite'

interface User {
  name: string
  lastName: string
}

describe('Utils tests', () => {
  test('Ensure email returns an InputValidatorBuilder instance', () => {
    const validationBuilder = InputValidatorBuilder.init()
    validationBuilder.email()
    expect(email()).toEqual(validationBuilder)
  })

  test('Ensure min returns an InputValidatorBuilder instance', () => {
    const validationBuilder = InputValidatorBuilder.init()
    validationBuilder.min(5)
    expect(min(5)).toEqual(validationBuilder)
  })

  test('Ensure required returns an InputValidatorBuilder instance', () => {
    const validationBuilder = InputValidatorBuilder.init()
    validationBuilder.required()
    expect(required()).toEqual(validationBuilder)
  })

  test('Ensure valid returns an InputValidatorBuilder instance', () => {
    const validationBuilder = InputValidatorBuilder.init()
    validationBuilder.valid(/hello/)
    expect(valid(/hello/)).toEqual(validationBuilder)
  })

  test('Ensure schemaValidator returns a CompositeValidator instance', () => {
    const compositeValidator = new CompositeValidator<User>({
      name: required().build(),
      lastName: required().build()
    })
    expect(
      schemaValidator<User>({
        name: required().build(),
        lastName: required().build()
      })
    ).toEqual(compositeValidator)
  })
})
