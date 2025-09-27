import { MaxLengthFieldError } from '@errors/index'
import faker from '@faker-js/faker'
import { MaxLengthInputValidator } from '.'

const objectInitialValue = {
  name: faker.random.alphaNumeric(5),
  anotherField: faker.random.word()
}

describe('MaxLengthInputValidator', () => {
  let sut: MaxLengthInputValidator
  const field = 'name'
  const maxLength = 4
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new MaxLengthInputValidator(maxLength)
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MaxLengthFieldError(field, maxLength))
    expect(error?.message).toBe(`${field} must be ${maxLength} characters at most`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'The field does not meet the maximum length contraint.'
    sut = new MaxLengthInputValidator(maxLength, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new MaxLengthFieldError(field, maxLength, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field length is less than max length', () => {
    myObject.name = faker.random.alphaNumeric(maxLength - 1)
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field length is equal to max length', () => {
    myObject.name = faker.random.alphaNumeric(maxLength)
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field length is equal to max length', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new MaxLengthFieldError(field, maxLength))
    expect(error?.message).toBe(`${field} must be ${maxLength} characters at most`)

    myObject.name = faker.random.alphaNumeric(maxLength)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
