import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsArrayValidator } from '.'

const objectInitialValue = {
  animals: ['mouse', 'cat', 'dog'] as any,
  anotherField: faker.random.word()
}

describe('IsArrayValidator', () => {
  let sut: IsArrayValidator
  const field = 'animals'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsArrayValidator()
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not an array', () => {
    myObject.animals = 1
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.ARRAY}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.ARRAY}`)
  })

  test('Should return error with custom message if field is not an array', () => {
    const customErrorMessage = 'Input field is not an array'
    sut = new IsArrayValidator(customErrorMessage)
    sut.setField(field)
    myObject.animals = 1
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `an ${DATA_TYPES.ARRAY}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is an array', () => {
    myObject.animals = ['mouse', 'cat', 'dog']
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is an array', () => {
    myObject.animals = 1
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.ARRAY}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.ARRAY}`)

    myObject.animals = ['mouse', 'cat', 'dog']
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
