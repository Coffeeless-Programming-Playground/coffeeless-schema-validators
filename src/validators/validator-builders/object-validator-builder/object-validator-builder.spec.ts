import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/index'
import { IsObjectValidator } from '@validators/objects'
import { ObjectValidatorBuilder } from '.'

describe('ObjectValidatorBuilder', () => {
  test('Should return IsObjectValidator a when init is called', () => {
    const message = 'field is not an object'
    const validations = ObjectValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsObjectValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = ObjectValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsObjectValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = ObjectValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = ObjectValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsObjectValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = ObjectValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const pattern = /^[0-1]/
    const validations = ObjectValidatorBuilder.init().required().valid(pattern).build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new RequiredFieldInputValidator(),
      new ValidFieldInputValidator(pattern)
    ])
  })
})
