import { ObjectKeyValueMatchesError } from '@errors/object-key-value-matches-error'
import faker from '@faker-js/faker'
import { PatternValidatorProps } from '@protocols/pattern-validator-props'
import { ObjectKeyValueMatchesValidator } from '.'
import { array } from '../../../utils'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { DATA_TYPES } from '@constants/data-types'

const objectInitialValue = {
  excludeRecipients: {
    user: ['diego', 'ronny'],
    application: ['blog-services']
  },
  anotherField: faker.random.word()
}

describe('ObjectKeyMatchesValidator', () => {
  let sut: ObjectKeyValueMatchesValidator
  const field = 'excludeRecipients'
  let myObject = objectInitialValue

  const patternValidatorProps: PatternValidatorProps = {
    allowedKeys: ['user', 'application'],
    allowedValues: array()
      .elementsMatchPattern(/diego|ronny|blog-services/)
      .build()
  }

  beforeEach(() => {
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps)
    sut.setField(field)
    myObject = JSON.parse(JSON.stringify(objectInitialValue))
  })

  test(`Should return error without custom message if one of the object keys names are not allowed
    with key array input`, () => {
    ;(myObject.excludeRecipients as any).tail = 'long'
    const error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field))
    expect(error?.message).toBe(`tail in ${field} is not valid`)
  })

  test(`Should return error with custom message if one of the object keys names are not allowed
    with key array input`, () => {
    const customErrorMessage = 'Something is wrong'
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps, customErrorMessage)
    sut.setField(field)
    ;(myObject.excludeRecipients as any).tail = 'long'
    const error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test(`Should return error without custom message if one of the object keys names are not allowed
    with key regex input`, () => {
    patternValidatorProps.allowedKeys = /user|application/
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps)
    sut.setField(field)
    ;(myObject.excludeRecipients as any).tail = 'long'
    const error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field))
    expect(error?.message).toBe(`tail in ${field} is not valid`)
  })

  test(`Should return error without custom message if one of the object keys names are not allowed
    with key regex input`, () => {
    const customErrorMessage = 'Something is wrong'
    patternValidatorProps.allowedKeys = /user|application/
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps, customErrorMessage)
    sut.setField(field)
    ;(myObject.excludeRecipients as any).tail = 'long'
    const error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return error without custom message if a value of an object key is not valid', () => {
    const customErrorMessage = 'Something is wrong'
    patternValidatorProps.allowedKeys = /user|application/
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps, customErrorMessage)
    sut.setField(field)
    myObject.excludeRecipients.user = [1, 2] as any
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError('Array element', `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe('Array element is not a string')
  })

  test('Should return falsy if object keys are valid', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when object keys are valid', () => {
    ;(myObject.excludeRecipients as any).tail = 'long'
    patternValidatorProps.allowedKeys = ['user', 'application']
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps)
    sut.setField(field)
    let error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field))
    expect(error?.message).toBe(`tail in ${field} is not valid`)
    myObject = JSON.parse(JSON.stringify(objectInitialValue))
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
    ;(myObject.excludeRecipients as any).tail = 'long'
    patternValidatorProps.allowedKeys = /user|application/
    sut = new ObjectKeyValueMatchesValidator(patternValidatorProps)
    sut.setField(field)
    error = sut.validate(myObject)
    expect(error).toEqual(new ObjectKeyValueMatchesError('tail', field))
    expect(error?.message).toBe(`tail in ${field} is not valid`)
    myObject = JSON.parse(JSON.stringify(objectInitialValue))
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
