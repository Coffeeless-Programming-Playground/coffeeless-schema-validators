import faker from '@faker-js/faker'
import {
  IsTimestampValidator,
  RequiredFieldInputValidator,
  TimestampExpirationValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { TimestampValidatorBuilder } from '.'

describe('TimestampValidatorBuilder', () => {
  test('Should return IsTimestampValidator a when init is called', () => {
    const message = 'field is not a timestamp'
    const validations = TimestampValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsTimestampValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = TimestampValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsTimestampValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = TimestampValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsTimestampValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = TimestampValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsTimestampValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = TimestampValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsTimestampValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return TimestampExpirationValidator', () => {
    const validations = TimestampValidatorBuilder.init().expired().build()
    expect(validations).toEqual([new IsTimestampValidator(), new TimestampExpirationValidator()])
  })

  test('Should return TimestampExpirationValidator with custom message', () => {
    const customErrorMessage = 'timestamp in the field given has expired'
    const validations = TimestampValidatorBuilder.init().expired(customErrorMessage).build()
    expect(validations).toEqual([
      new IsTimestampValidator(),
      new TimestampExpirationValidator(customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const length = faker.datatype.number()
    const pattern = /^[0-1]/
    const validations = TimestampValidatorBuilder.init().required().valid(pattern).expired().build()
    expect(validations).toEqual([
      new IsTimestampValidator(),
      new RequiredFieldInputValidator(),
      new ValidFieldInputValidator(pattern),
      new TimestampExpirationValidator()
    ])
  })
})
