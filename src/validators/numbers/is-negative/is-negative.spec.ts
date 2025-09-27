import { IsNegativeFieldError } from '@errors/is-negative-field-error'
import faker from '@faker-js/faker'
import { IsNegativeNumberValidator } from '.'

const objectInitialValue = {
  debt: 0,
  anotherField: faker.random.word()
}

describe('IsNegativeNumberValidator', () => {
  let sut: IsNegativeNumberValidator
  const field = 'debt'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsNegativeNumberValidator()
    sut.setField(field)
    objectInitialValue.debt = 0
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if number is not negative', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsNegativeFieldError(field))
    expect(error?.message).toBe(`${field} is not negative`)
  })

  test('Should return error with custom message if number is not negative', () => {
    const customErrorMessage = 'The field value is not negative.'
    sut = new IsNegativeNumberValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsNegativeFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if number is negative', () => {
    myObject.debt = -1
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if number is negative', () => {
    myObject.debt = 1
    let error = sut.validate(myObject)
    expect(error).toEqual(new IsNegativeFieldError(field))
    expect(error?.message).toBe(`${field} is not negative`)

    myObject.debt = -1
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
