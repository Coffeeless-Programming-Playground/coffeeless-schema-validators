import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsTimestampValidator } from '.'

const objectInitialValue = {
  timestamp: 1749919521,
  anotherField: faker.random.word()
}

describe('IsTimestampValidator', () => {
  let sut: IsTimestampValidator
  const field = 'timestamp'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsTimestampValidator()
    sut.setField(field)
    objectInitialValue.timestamp = 1749919521
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not a timestamp', () => {
    myObject.timestamp = 0
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.TIMESTAMP}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.TIMESTAMP}`)
  })

  test('Should return error with custom message if field is not a timestamp', () => {
    const customErrorMessage = 'Input field is not a timestamp'
    sut = new IsTimestampValidator(customErrorMessage)
    sut.setField(field)
    myObject.timestamp = 9999999999
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `a ${DATA_TYPES.TIMESTAMP}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is a timestamp', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is a timestamp', () => {
    myObject.timestamp = 0
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.TIMESTAMP}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.TIMESTAMP}`)

    myObject.timestamp = 1749919521
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
