import {
  IsBooleanValidator,
  IsFalseBooleanValidator,
  IsTrueBooleanValidator
} from '@validators/booleans'
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/generic'
import { BooleanValidatorBuilder } from '.'
import { commonValidatorBuilderTests } from '../test-utils'

describe('BooleanValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'BooleanValidatorBuilder',
    'field is not a boolean',
    BooleanValidatorBuilder,
    IsBooleanValidator
  )

  test('Should return IsTrueBooleanValidator', () => {
    const validations = BooleanValidatorBuilder.init().isTrue().build()
    expect(validations).toEqual([new IsBooleanValidator(), new IsTrueBooleanValidator()])
  })

  test('Should return IsTrueBooleanValidator with custom message', () => {
    const customErrorMessage = 'field is not true'
    const validations = BooleanValidatorBuilder.init().isTrue(customErrorMessage).build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new IsTrueBooleanValidator(customErrorMessage)
    ])
  })

  test('Should return IsFalseBooleanValidator', () => {
    const validations = BooleanValidatorBuilder.init().isFalse().build()
    expect(validations).toEqual([new IsBooleanValidator(), new IsFalseBooleanValidator()])
  })

  test('Should return IsFalseBooleanValidator with custom message', () => {
    const customErrorMessage = 'field is not false'
    const validations = BooleanValidatorBuilder.init().isFalse(customErrorMessage).build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new IsFalseBooleanValidator(customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const pattern = /^[0-1]/
    const validations = BooleanValidatorBuilder.init()
      .isTrue()
      .isFalse()
      .required()
      .valid(pattern)
      .build()
    expect(validations).toEqual([
      new IsBooleanValidator(),
      new IsTrueBooleanValidator(),
      new IsFalseBooleanValidator(),
      new RequiredFieldInputValidator(),
      new ValidFieldInputValidator(pattern)
    ])
  })
})
