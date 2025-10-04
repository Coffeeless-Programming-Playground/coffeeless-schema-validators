import { IsTrueFieldError } from '@errors/is-true-field-error'
import faker from '@faker-js/faker'
import { IsTrueBooleanValidator } from '.'

const objectInitialValue = {
  isPresent: false,
  anotherField: faker.random.word()
}

describe('IsTrueBooleanValidator', () => {
  let sut: IsTrueBooleanValidator
  const field = 'isPresent'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsTrueBooleanValidator()
    sut.setField(field)
    objectInitialValue.isPresent = false
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if boolean field is not true', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsTrueFieldError(field))
    expect(error?.message).toBe(`${field} is not true`)
  })

  test('Should return error with custom message if boolean field is not true', () => {
    const customErrorMessage = 'Input field is not true'
    sut = new IsTrueBooleanValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsTrueFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if boolean field is true', () => {
    myObject.isPresent = true
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when boolean field is true', () => {
    myObject.isPresent = false
    let error = sut.validate(myObject)
    expect(error).toEqual(new IsTrueFieldError(field))
    expect(error?.message).toBe(`${field} is not true`)

    myObject.isPresent = true
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
