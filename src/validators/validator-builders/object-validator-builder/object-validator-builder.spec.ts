import { PatternValidatorProps } from '@protocols/pattern-validator-props'
import { RequiredFieldInputValidator, ValidFieldInputValidator } from '@validators/index'
import { IsObjectValidator, ObjectKeyValueMatchesValidator } from '@validators/objects'
import { ObjectValidatorBuilder } from '.'
import { array, number, string } from '../../../utils'
import { commonValidatorBuilderTests } from '../test-utils'
import { ObjectValidator } from '@protocols/object-validator'

describe('ObjectValidatorBuilder', () => {
  commonValidatorBuilderTests(
    'ObjectValidatorBuilder',
    'field is not an object',
    ObjectValidatorBuilder,
    IsObjectValidator
  )

  test('Should return ObjectValidatorBuilder with an IsObjectValidator containing an objectValidator', () => {
    const objectSchemaValidation: ObjectValidator = {
      profile: {
        address: {
          street: string().required().build(),
          city: string().required().build()
        },
        phoneNumber: number().required().build()
      },
      anotherField: string().required().build()
    }
    const validations = ObjectValidatorBuilder.init(objectSchemaValidation).build()
    expect(validations).toEqual([new IsObjectValidator(objectSchemaValidation)])
  })

  test('Should return ObjectKeyValueMatchesValidator with string array key names', () => {
    const patternValidatorProps: PatternValidatorProps = {
      allowedKeys: ['user', 'application'],
      allowedValues: array()
        .elementsMatchPattern(/diego|ronny|blog-services/)
        .build()
    }
    const validations = ObjectValidatorBuilder.init().pattern(patternValidatorProps).build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new ObjectKeyValueMatchesValidator(patternValidatorProps)
    ])
  })

  test('Should return ObjectKeyValueMatchesValidator with string array key names and with custom message', () => {
    const customErrorMessage = 'Object fields are not valid'
    const patternValidatorProps: PatternValidatorProps = {
      allowedKeys: ['user', 'application'],
      allowedValues: array()
        .elementsMatchPattern(/diego|ronny|blog-services/)
        .build()
    }
    const validations = ObjectValidatorBuilder.init()
      .pattern(patternValidatorProps, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new ObjectKeyValueMatchesValidator(patternValidatorProps, customErrorMessage)
    ])
  })

  test('Should return ObjectKeyValueMatchesValidator with regex key names', () => {
    const patternValidatorProps: PatternValidatorProps = {
      allowedKeys: /user|application/,
      allowedValues: array()
        .elementsMatchPattern(/diego|ronny|blog-services/)
        .build()
    }
    const validations = ObjectValidatorBuilder.init().pattern(patternValidatorProps).build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new ObjectKeyValueMatchesValidator(patternValidatorProps)
    ])
  })

  test('Should return ObjectKeyValueMatchesValidator with regex key names and with custom message', () => {
    const customErrorMessage = 'Object fields are not valid'
    const patternValidatorProps: PatternValidatorProps = {
      allowedKeys: /user|application/,
      allowedValues: array()
        .elementsMatchPattern(/diego|ronny|blog-services/)
        .build()
    }
    const validations = ObjectValidatorBuilder.init()
      .pattern(patternValidatorProps, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsObjectValidator(),
      new ObjectKeyValueMatchesValidator(patternValidatorProps, customErrorMessage)
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
