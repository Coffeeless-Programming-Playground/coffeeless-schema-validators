import faker from '@faker-js/faker'
import { MinLengthFieldError } from '@errors/min-length-field-error'
import { MinLengthInputValidator } from '.'

const objectInitialValue = {
  name: faker.random.alphaNumeric(5),
  anotherField: faker.random.word()
}

describe('MinLengthInputValidation', () => {
  let sut: MinLengthInputValidator
  const field = 'name'
  const minLength = 6
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new MinLengthInputValidator(minLength)
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError(field, minLength))
    expect(error?.message).toBe(`${field} must be ${minLength} characters at least`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'The field does not meet the minimum length contraint.'
    sut = new MinLengthInputValidator(minLength, customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError(field, minLength, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field length is greater than min length', () => {
    myObject.name = faker.random.alphaNumeric(minLength + 1)
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field length is equal to min length', () => {
    myObject.name = faker.random.alphaNumeric(minLength)
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field length is equal to min length', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new MinLengthFieldError(field, minLength))
    expect(error?.message).toBe(`${field} must be ${minLength} characters at least`)

    myObject.name = faker.random.alphaNumeric(minLength)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
