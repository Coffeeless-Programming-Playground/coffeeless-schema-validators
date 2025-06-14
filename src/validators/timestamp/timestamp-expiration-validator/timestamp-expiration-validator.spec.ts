import faker from '@faker-js/faker'
import { TimestampExpirationError } from '@errors/timestamp-expiration-error'
import { TimestampExpirationValidator } from '.'

const objectInitialValue = {
  timestamp: 1749919521,
  anotherField: faker.random.word()
}

describe('TimestampExpirationValidator', () => {
  let sut: TimestampExpirationValidator
  const field = 'timestamp'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new TimestampExpirationValidator()
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if timestamp has expired', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new TimestampExpirationError(field))
    expect(error?.message).toBe(`${field} has expired`)
  })

  test('Should return error with custom message if field is empty', () => {
    const customErrorMessage = 'Timestamp has expired.'
    sut = new TimestampExpirationValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new TimestampExpirationError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if timestamp has not expired', () => {
    const now = Math.floor(Date.now() / 1000) // Current time in seconds
    const oneHourAhead = now + 60 // Current time plus 1 second
    myObject.timestamp = oneHourAhead
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
