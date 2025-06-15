import faker from '@faker-js/faker'
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/index'

import { IsNumberValidator, MinNumberValueValidator } from '@validators/numbers'
import { NumberValidatorBuilder } from '.'

describe('NumberValidatorBuilder', () => {
  test('Should return IsNumberValidator a when init is called', () => {
    const message = 'field is not a number'
    const validations = NumberValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsNumberValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = NumberValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsNumberValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = NumberValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = NumberValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsNumberValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = NumberValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return MinNumberValueValidator', () => {
    const minValue = faker.datatype.number()
    const validations = NumberValidatorBuilder.init().min(minValue).build()
    expect(validations).toEqual([new IsNumberValidator(), new MinNumberValueValidator(minValue)])
  })

  test('Should return MinNumberValueValidator with custom message', () => {
    const minValue = faker.datatype.number()
    const customErrorMessage = 'timestamp in the field given has expired'
    const validations = NumberValidatorBuilder.init().min(minValue, customErrorMessage).build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new MinNumberValueValidator(minValue, customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const minValue = faker.datatype.number()
    const pattern = /^[0-1]/
    const validations = NumberValidatorBuilder.init()
      .required()
      .valid(pattern)
      .min(minValue)
      .build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new RequiredFieldInputValidator(),
      new ValidFieldInputValidator(pattern),
      new MinNumberValueValidator(minValue)
    ])
  })
})
