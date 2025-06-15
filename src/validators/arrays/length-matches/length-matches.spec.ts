import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { LengthArrayMatchesValidator } from '.'
import { LengthNotEqualError } from '@errors/length-not-equal-error'

const objectInitialValue = {
  animals: ['mouse', 'cat', 'dog'],
  mammals: ['mouse', 'cat', 'dog'] as any,
  anyField: faker.random.word()
}

describe('LengthArrayMatchesValidator', () => {
  let sut: LengthArrayMatchesValidator
  const field = 'animals'
  const anotherField = 'mammals'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new LengthArrayMatchesValidator(anotherField)
    sut.setField(field)
    objectInitialValue.mammals = ['mouse', 'cat', 'dog']
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if anotherField array is not an array', () => {
    myObject.mammals = 'hello'
    sut = new LengthArrayMatchesValidator(anotherField)
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(anotherField, `an ${DATA_TYPES.ARRAY}`))
    expect(error?.message).toBe(`${anotherField} is not an ${DATA_TYPES.ARRAY}`)
  })

  test('Should return error without custom message if field array length is not equal to anotherField array length', () => {
    myObject.animals = ['dog', 'cat']
    sut = new LengthArrayMatchesValidator(anotherField)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new LengthNotEqualError(field, anotherField))
    expect(error?.message).toBe(`${field} length does not match ${anotherField}`)
  })

  test('Should return error with custom message if field array length is not equal to anotherField array length', () => {
    myObject.animals = ['dog', 'cat']
    const customErrorMessage = 'The array length is not equal to the other array field length.'
    sut = new LengthArrayMatchesValidator(anotherField, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new LengthNotEqualError(field, anotherField, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if array length is equal the other array field length', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if array length is equal the other array field length', () => {
    myObject.animals = ['dog', 'cat']
    let error = sut.validate(myObject)
    expect(error).toEqual(new LengthNotEqualError(field, anotherField))
    expect(error?.message).toBe(`${field} length does not match ${anotherField}`)

    myObject.animals = ['mouse', 'cat', 'dog']
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
