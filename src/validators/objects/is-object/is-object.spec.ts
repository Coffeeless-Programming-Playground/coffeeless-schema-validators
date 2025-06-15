import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsObjectValidator } from '.'

const objectInitialValue = {
  payload: JSON.parse(faker.datatype.json()),
  anotherField: faker.random.word()
}

describe('IsObjectValidator', () => {
  let sut: IsObjectValidator
  const field = 'payload'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsObjectValidator()
    sut.setField(field)
    objectInitialValue.payload = JSON.parse(faker.datatype.json())
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not an object', () => {
    myObject.payload = 'Hello'
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.OBJECT}`)
  })

  test('Should return error with custom message if field is not an object', () => {
    const customErrorMessage = 'Input field is not an object'
    sut = new IsObjectValidator(customErrorMessage)
    sut.setField(field)
    myObject.payload = 'Hello'
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is an object', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is an object', () => {
    myObject.payload = 'Hello'
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `an ${DATA_TYPES.OBJECT}`))
    expect(error?.message).toBe(`${field} is not an ${DATA_TYPES.OBJECT}`)

    myObject.payload = JSON.parse(faker.datatype.json())
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
