import faker from '@faker-js/faker'
import {
  CompareStringFieldValidator,
  EmailInputValidator,
  IsStringValidator,
  MaxLengthInputValidator,
  MinLengthInputValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { StringValidatorBuilder } from '.'
import { commonValidatorBuilderTests } from '../test-utils'

describe('StringValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'StringValidatorBuilder',
    'field is not a string',
    StringValidatorBuilder,
    IsStringValidator
  )

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

  test('Should return MaxLengthInputValidator', () => {
    const length = faker.datatype.number()
    const validations = StringValidatorBuilder.init().max(length).build()
    expect(validations).toEqual([new IsStringValidator(), new MaxLengthInputValidator(length)])
  })

  test('Should return MaxLengthInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not meet the max length constraint'
    const length = faker.datatype.number()
    const validations = StringValidatorBuilder.init().max(length, customErrorMessage).build()
    expect(validations).toEqual([
      new IsStringValidator(),
      new MaxLengthInputValidator(length, customErrorMessage)
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
      .max(length)
      .valid(pattern)
      .email()
      .equal(anotherField)
      .build()
    expect(validations).toStrictEqual([
      new IsStringValidator(),
      new RequiredFieldInputValidator(),
      new MinLengthInputValidator(length),
      new MaxLengthInputValidator(length),
      new ValidFieldInputValidator(pattern),
      new EmailInputValidator(),
      new CompareStringFieldValidator(anotherField)
    ])
  })
})
