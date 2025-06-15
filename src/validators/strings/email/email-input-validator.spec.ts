import faker from '@faker-js/faker'
import { EmailFieldError } from '@errors/email-field-error'
import { EmailInputValidator } from '.'

const objectInitialValue = {
  email: faker.random.alphaNumeric(5),
  anotherField: faker.random.word()
}

describe('EmailInputValidator', () => {
  let sut: EmailInputValidator
  const field = 'email'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new EmailInputValidator()
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if value is invalid', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new EmailFieldError(field))
    expect(error?.message).toBe(`${field} is not valid`)
  })

  test('Should return error with custom message if value is invalid', () => {
    const customErrorMessage = 'Input field is not an email'
    sut = new EmailInputValidator(customErrorMessage)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new EmailFieldError(field, customErrorMessage))
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if value is valid', () => {
    myObject.email = 'dominicsc2hs@gmail.com'
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when email is valid', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new EmailFieldError(field))
    expect(error?.message).toBe(`${field} is not valid`)

    myObject.email = 'dominicsc2hs@gmail.com'
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
