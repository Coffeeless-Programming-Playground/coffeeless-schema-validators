import faker from '@faker-js/faker'
import {
  IsTimestampValidator,
  RequiredFieldInputValidator,
  TimestampExpirationValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { TimestampValidatorBuilder } from '.'
import { commonValidatorBuilderTests } from '../test-utils'

describe('TimestampValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'TimestampValidatorBuilder',
    'field is not a timestamp',
    TimestampValidatorBuilder,
    IsTimestampValidator
  )

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
