import { IsPositiveFieldError } from '@errors/index'
import faker from '@faker-js/faker'
import { IsPositiveNumberValidator } from '.'

const objectInitialValue = {
  debt: 0,
  anotherField: faker.random.word()
}

describe('IsPositiveNumberValidator', () => {
  let sut: IsPositiveNumberValidator
  const field = 'debt'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsPositiveNumberValidator()
    sut.setField(field)
    objectInitialValue.debt = 0
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if number is not positive', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsPositiveFieldError(field))
    expect(error?.message).toBe(`${field} is not positive`)
  })

  test('Should return error with custom message if number is not positive', () => {
    const customErrorMessage = 'The field value is not positive.'
    sut = new IsPositiveNumberValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsPositiveFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if number is positive', () => {
    myObject.debt = 1
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if number is positive', () => {
    myObject.debt = -1
    let error = sut.validate(myObject)
    expect(error).toEqual(new IsPositiveFieldError(field))
    expect(error?.message).toBe(`${field} is not positive`)

    myObject.debt = 1
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
