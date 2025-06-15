import faker from '@faker-js/faker'
import {
  ArrayElementsMatchPatternValidator,
  IsArrayValidator,
  LengthArrayMatchesValidator,
  MinArrayElementsLengthValidator,
  MinLengthArrayValidator,
  RequiredFieldInputValidator,
  ValidFieldInputValidator
} from '@validators/index'

import { ArrayValidatorBuilder } from '.'

describe('ArrayValidatorBuilder', () => {
  test('Should return IsArrayValidator a when init is called', () => {
    const message = 'field is not an array'
    const validations = ArrayValidatorBuilder.init(message).build()
    expect(validations).toEqual([new IsArrayValidator(message)])
  })

  test('Should return RequiredFieldInputValidator', () => {
    const validations = ArrayValidatorBuilder.init().required().build()
    expect(validations).toEqual([new IsArrayValidator(), new RequiredFieldInputValidator()])
  })

  test('Should return RequiredFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field is required'
    const validations = ArrayValidatorBuilder.init().required(customErrorMessage).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new RequiredFieldInputValidator(customErrorMessage)
    ])
  })

  test('Should return ValidFieldInputValidator', () => {
    const pattern = /^[0-1]/
    const validations = ArrayValidatorBuilder.init().valid(pattern).build()
    expect(validations).toEqual([new IsArrayValidator(), new ValidFieldInputValidator(pattern)])
  })

  test('Should return ValidFieldInputValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = ArrayValidatorBuilder.init().valid(pattern, customErrorMessage).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new ValidFieldInputValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return MinLengthArrayValidator', () => {
    const length = faker.datatype.number()
    const validations = ArrayValidatorBuilder.init().min(length).build()
    expect(validations).toEqual([new IsArrayValidator(), new MinLengthArrayValidator(length)])
  })

  test('Should return MinLengthArrayValidator with custom message', () => {
    const customErrorMessage = 'This field does not meet the min length constraint'
    const length = faker.datatype.number()
    const validations = ArrayValidatorBuilder.init().min(length, customErrorMessage).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new MinLengthArrayValidator(length, customErrorMessage)
    ])
  })

  test('Should return MinArrayElementsLengthValidator', () => {
    const length = faker.datatype.number()
    const validations = ArrayValidatorBuilder.init().elementsMinSize(length).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new MinArrayElementsLengthValidator(length)
    ])
  })

  test('Should return MinArrayElementsLengthValidator with custom message', () => {
    const customErrorMessage = 'This field does not meet the min length constraint'
    const length = faker.datatype.number()
    const validations = ArrayValidatorBuilder.init()
      .elementsMinSize(length, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new MinArrayElementsLengthValidator(length, customErrorMessage)
    ])
  })

  test('Should return ArrayElementsMatchPatternValidator', () => {
    const pattern = /^[0-1]/
    const validations = ArrayValidatorBuilder.init().elementsMatchPattern(pattern).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new ArrayElementsMatchPatternValidator(pattern)
    ])
  })

  test('Should return ArrayElementsMatchPatternValidator with custom message', () => {
    const customErrorMessage = 'This field does not match regex pattern'
    const pattern = /^[0-1]/
    const validations = ArrayValidatorBuilder.init()
      .elementsMatchPattern(pattern, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new ArrayElementsMatchPatternValidator(pattern, customErrorMessage)
    ])
  })

  test('Should return LengthArrayMatchesValidator', () => {
    const anotherFieldName = faker.datatype.string()
    const validations = ArrayValidatorBuilder.init().lengthMatches(anotherFieldName).build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new LengthArrayMatchesValidator(anotherFieldName)
    ])
  })

  test('Should return LengthArrayMatchesValidator with custom message', () => {
    const customErrorMessage = 'This array field length does not match another array field length'
    const anotherFieldName = faker.datatype.string()
    const validations = ArrayValidatorBuilder.init()
      .lengthMatches(anotherFieldName, customErrorMessage)
      .build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new LengthArrayMatchesValidator(anotherFieldName, customErrorMessage)
    ])
  })

  test('Should return a list of validations', () => {
    const length = faker.datatype.number()
    const pattern = /^[0-1]/
    const anotherFieldName = faker.datatype.string()
    const validations = ArrayValidatorBuilder.init()
      .required()
      .min(length)
      .valid(pattern)
      .elementsMinSize(length)
      .elementsMatchPattern(pattern)
      .lengthMatches(anotherFieldName)
      .build()
    expect(validations).toEqual([
      new IsArrayValidator(),
      new RequiredFieldInputValidator(),
      new MinLengthArrayValidator(length),
      new ValidFieldInputValidator(pattern),
      new MinArrayElementsLengthValidator(length),
      new ArrayElementsMatchPatternValidator(pattern),
      new LengthArrayMatchesValidator(anotherFieldName)
    ])
  })
})
