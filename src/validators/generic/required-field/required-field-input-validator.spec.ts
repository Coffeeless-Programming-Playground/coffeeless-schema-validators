import faker from '@faker-js/faker'
import { RequiredFieldError } from '@errors/required-field-error'
import { RequiredFieldInputValidator } from '.'

const objectInitialValue = {
  password: '',
  anotherField: faker.random.word()
}

describe('RequiredFieldInputValidator', () => {
  let sut: RequiredFieldInputValidator
  const field = 'password'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new RequiredFieldInputValidator()
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is empty', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new RequiredFieldError(field))
    expect(error?.message).toBe(`${field} is Required`)
  })

  test('Should return error with custom message if field is empty', () => {
    const customErrorMessage = 'This field is required.'
    sut = new RequiredFieldInputValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new RequiredFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is not positive', () => {
    myObject.password = 0 as any
    let error = sut.validate(myObject)
    expect(error).toBeFalsy()
    myObject.password = -1 as any
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field is not empty', () => {
    myObject.password = faker.random.alphaNumeric(5)
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field is not empty', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new RequiredFieldError(field))
    expect(error?.message).toBe(`${field} is Required`)

    myObject.password = faker.random.alphaNumeric(5)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
