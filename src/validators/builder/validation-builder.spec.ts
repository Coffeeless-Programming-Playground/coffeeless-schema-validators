import faker from '@faker-js/faker'
import {
  EmailInputValidator,
  MinLengthInputValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { InputValidatorBuilder } from '.'

describe('InputValidatorBuilder', () => {
  test('Should return RequiredFieldInputValidator', () => {
    const validations = InputValidatorBuilder.init().required().build()
    expect(validations).toEqual([new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = InputValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([new RequiredFieldInputValidator(customErrorMessage)])
  })

  test('Should return MinLengthInputValidator', () => {
    const length = faker.datatype.number()
    const validations = InputValidatorBuilder.init().min(length).build()
    expect(validations).toEqual([new MinLengthInputValidator(length)])
  })

  test('Should return MinLengthInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not meet the min length constraint'
    const length = faker.datatype.number()
    const validations = InputValidatorBuilder.init().min(length, customErrorMessage).build()
    expect(validations).toEqual([new MinLengthInputValidator(length, customErrorMessage)])
  })

  test('Should return EmailInputValidator', () => {
    const validations = InputValidatorBuilder.init().email().build()
    expect(validations).toEqual([new EmailInputValidator()])
  })

  test('Should return EmailInputValidator with custom message', () => {
    const customErrorMessage = 'Email is not valid'
    const validations = InputValidatorBuilder.init().email(customErrorMessage).build()
    expect(validations).toEqual([new EmailInputValidator(customErrorMessage)])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = InputValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = InputValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([new ValidFieldInputValidator(pattern, customErrorMessage)])
  })

  test('Should return a list of validations', () => {
    const length = faker.datatype.number()
    const pattern = /^[0-1]/
    const validations = InputValidatorBuilder.init()
      .required()
      .min(length)
      .email()
      .valid(pattern)
      .build()
    expect(validations).toEqual([
      new RequiredFieldInputValidator(),
      new MinLengthInputValidator(length),
      new EmailInputValidator(),
      new ValidFieldInputValidator(pattern)
    ])
  })
})
