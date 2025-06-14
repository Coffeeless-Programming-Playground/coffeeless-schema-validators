import faker from '@faker-js/faker'
import { MinArrayElementsLengthValidator } from '.'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import { DATA_TYPES } from '@constants/data-types'
import { MinLengthFieldError } from '@errors/min-length-field-error'

const objectInitialValue = {
  animals: ['mouse', 'cat', 'dog'] as any,
  anotherField: faker.random.word()
}

describe('MinArrayElementsLengthValidator', () => {
  let sut: MinArrayElementsLengthValidator
  const field = 'animals'
  const minLength = 4
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new MinArrayElementsLengthValidator(minLength)
    sut.setField(field)
    objectInitialValue.animals = ['mouse', 'cat', 'dog'] as any
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if an array element is not a string', () => {
    myObject.animals = ['mouse', 1, 'dog']
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError('Array element', `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe(`Array element is not a ${DATA_TYPES.STRING}`)
  })

  test('Should return error without custom message if an array element lengh is less than min length', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError('Array element', minLength))
    expect(error?.message).toBe(`Array element must be ${minLength} characters at least`)
  })

  test('Should return error with custom message if an array element lengh is less than min length', () => {
    const customErrorMessage = 'An array element does not meet the minimum length contraint.'
    sut = new MinArrayElementsLengthValidator(minLength, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError('Array element', minLength, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if array elements length are equal or greater than min length', () => {
    myObject.animals = ['mouse', 'bear', 'panda', 'wumpus']
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if array all elements length are greater than min length', () => {
    myObject.animals = ['mouse', 'doggy', 'panda', 'wumpus']
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test(`Should return error first and then falsy if all array elements length are equal or greater than min 
    length`, () => {
    myObject.animals = ['mouse', 'cat', 'dog']
    let error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError('Array element', minLength))
    expect(error?.message).toBe(`Array element must be ${minLength} characters at least`)

    myObject.animals = ['mouse', 'bear', 'panda', 'wumpus']
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
