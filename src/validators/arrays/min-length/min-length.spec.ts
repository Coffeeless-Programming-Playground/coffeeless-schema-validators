import { MinLengthArrayError } from '@errors/min-length-array.error'
import faker from '@faker-js/faker'
import { MinLengthArrayValidator } from '.'

const objectInitialValue = {
  animals: ['mouse', 'cat', 'dog'],
  anotherField: faker.random.word()
}

describe('MinLengthArrayValidator', () => {
  let sut: MinLengthArrayValidator
  const field = 'animals'
  const minLength = 4
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new MinLengthArrayValidator(minLength)
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if array length is less than min length', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthArrayError(field, minLength))
    expect(error?.message).toBe(`${field} must contain at least ${minLength} element(s)`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'The array does not meet the minimum length contraint.'
    sut = new MinLengthArrayValidator(minLength, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthArrayError(field, minLength, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if array length is equal to min length', () => {
    myObject.animals = ['mouse', 'cat', 'dog', 'bat']
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if array length is greater than min length', () => {
    myObject.animals = ['mouse', 'cat', 'dog', 'bat', 'wumpus']
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if array length is equal to min length', () => {
    myObject.animals = ['mouse', 'cat', 'dog']
    let error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthArrayError(field, minLength))
    expect(error?.message).toBe(`${field} must contain at least ${minLength} element(s)`)

    myObject.animals = ['mouse', 'cat', 'dog', 'bat']
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
