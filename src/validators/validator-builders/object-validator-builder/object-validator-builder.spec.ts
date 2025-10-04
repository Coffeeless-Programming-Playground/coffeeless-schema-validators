import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/index'
import { IsObjectValidator } from '@validators/objects'
import { ObjectValidatorBuilder } from '.'
import { commonValidatorBuilderTests } from '../test-utils'

describe('ObjectValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'ObjectValidatorBuilder',
    'field is not an object',
    ObjectValidatorBuilder,
    IsObjectValidator
  )

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
