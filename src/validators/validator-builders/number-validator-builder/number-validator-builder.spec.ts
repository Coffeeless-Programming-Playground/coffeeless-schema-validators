import faker from '@faker-js/faker'
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/index'

import {
  IsNegativeNumberValidator,
  IsNumberValidator,
  IsPositiveNumberValidator,
  MinNumberValueValidator
} from '@validators/numbers'
import { NumberValidatorBuilder } from '.'
import { commonValidatorBuilderTests } from '../test-utils'

describe('NumberValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'NumberValidatorBuilder',
    'field is not a number',
    NumberValidatorBuilder,
    IsNumberValidator
  )

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

  test('Should return IsPositiveNumberValidator', () => {
    const validations = NumberValidatorBuilder.init().positive().build()
    expect(validations).toEqual([new IsNumberValidator(), new IsPositiveNumberValidator()])
  })

  test('Should return IsPositiveNumberValidator with custom message', () => {
    const customErrorMessage = 'field is not positive'
    const validations = NumberValidatorBuilder.init().positive(customErrorMessage).build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new IsPositiveNumberValidator(customErrorMessage)
    ])
  })

  test('Should return IsNegativeNumberValidator', () => {
    const validations = NumberValidatorBuilder.init().negative().build()
    expect(validations).toEqual([new IsNumberValidator(), new IsNegativeNumberValidator()])
  })

  test('Should return IsNegativeNumberValidator with custom message', () => {
    const customErrorMessage = 'field is not negative'
    const validations = NumberValidatorBuilder.init().negative(customErrorMessage).build()
    expect(validations).toEqual([
      new IsNumberValidator(),
      new IsNegativeNumberValidator(customErrorMessage)
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
