import faker from '@faker-js/faker'
import {
  CompareStringFieldValidator,
  EmailInputValidator,
  IsStringValidator,
  MinLengthArrayValidator,
  MinLengthInputValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { StringValidatorBuilder } from '.'

describe('StringValidatorBuilder', () => {
  test('Should return IsArrayValidator a when init is called', () => {
    const message = 'field is not a string'
    const validations = StringValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsStringValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = StringValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsStringValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = StringValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = StringValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsStringValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = StringValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return MinLengthInputValidator', () => {
    const length = faker.datatype.number()
    const validations = StringValidatorBuilder.init().min(length).build()
    expect(validations).toEqual([new IsStringValidator(), new MinLengthInputValidator(length)])
  })

  test('Should return MinLengthInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not meet the min length constraint'
    const length = faker.datatype.number()
    const validations = StringValidatorBuilder.init().min(length, customErrorMessage).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new MinLengthInputValidator(length, customErrorMessage)
    ])
  })

  test('Should return EmailInputValidator', () => {
    const validations = StringValidatorBuilder.init().email().build()
    expect(validations).toEqual([new IsStringValidator(), new EmailInputValidator()])
  })

  test('Should return EmailInputValidator with custom message', () => {
    const customErrorMessage = 'Email is not valid'
    const validations = StringValidatorBuilder.init().email(customErrorMessage).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new EmailInputValidator(customErrorMessage)
    ])
  })

  test('Should return CompareStringFieldValidator', () => {
    const anotherField = faker.random.word()
    const validations = StringValidatorBuilder.init().equal(anotherField).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new CompareStringFieldValidator(anotherField)
    ])
  })

  test('Should return CompareStringFieldValidator with custom message', () => {
    const anotherField = faker.random.word()
    const customErrorMessage = 'Strings are not equal'
    const validations = StringValidatorBuilder.init()
      .equal(anotherField, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new CompareStringFieldValidator(anotherField, customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const length = faker.datatype.number()
    const pattern = /^[0-1]/
    const anotherField = faker.random.word()
    const validations = StringValidatorBuilder.init()
      .required()
      .min(length)
      .valid(pattern)
      .email()
      .equal(anotherField)
      .build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new RequiredFieldInputValidator(),
      new MinLengthArrayValidator(length),
      new ValidFieldInputValidator(pattern),
      new EmailInputValidator(),
      new CompareStringFieldValidator(anotherField)
    ])
  })
})
