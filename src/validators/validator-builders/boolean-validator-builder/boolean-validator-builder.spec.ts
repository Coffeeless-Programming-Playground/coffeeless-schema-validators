import { IsBooleanValidator } from '@validators/booleans'
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/generic'
import { BooleanValidatorBuilder } from '.'

describe('BooleanValidatorBuilder', () => {
  test('Should return BooleanValidatorBuilder a when init is called', () => {
    const message = 'field is not a boolean'
    const validations = BooleanValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsBooleanValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = BooleanValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsBooleanValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = BooleanValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = BooleanValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsBooleanValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = BooleanValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const pattern = /^[0-1]/
    const validations = BooleanValidatorBuilder.init().required().valid(pattern).build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new RequiredFieldInputValidator(),
      new ValidFieldInputValidator(pattern)
    ])
  })
})
