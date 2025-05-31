import { InputValidatorBuilder } from '@validators/builder'
import { email, min, required, valid } from './utils'

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
})
