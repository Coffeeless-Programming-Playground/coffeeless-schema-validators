import { IsFalseFieldError } from '@errors/is-false-field-error'
import faker from '@faker-js/faker'
import { IsFalseBooleanValidator } from '.'

const objectInitialValue = {
  isPresent: true,
  anotherField: faker.random.word()
}

describe('IsFalseBooleanValidator', () => {
  let sut: IsFalseBooleanValidator
  const field = 'isPresent'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsFalseBooleanValidator()
    sut.setField(field)
    objectInitialValue.isPresent = true
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if boolean field is not false', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsFalseFieldError(field))
    expect(error?.message).toBe(`${field} is not false`)
  })

  test('Should return error with custom message if boolean field is not false', () => {
    const customErrorMessage = 'Input field is not false'
    sut = new IsFalseBooleanValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new IsFalseFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if boolean field is false', () => {
    myObject.isPresent = false
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when boolean field is false', () => {
    myObject.isPresent = true
    let error = sut.validate(myObject)
    expect(error).toEqual(new IsFalseFieldError(field))
    expect(error?.message).toBe(`${field} is not false`)

    myObject.isPresent = false
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
