import faker from '@faker-js/faker'
import { InvalidFieldError } from '@errors/invalid-field-error'
import { ValidFieldInputValidator } from '.'

const objectInitialValue = {
  uuid: '3582e85c-9aaf-446a-ba60-d2d6caf8ab4',
  anotherField: faker.random.word()
}

describe('ValidFieldInputValidator', () => {
  let sut: ValidFieldInputValidator
  const field = 'uuid'
  let myObject = objectInitialValue
  /**
   * UUID regex pattern.
   */
  const pattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

  beforeEach(() => {
    sut = new ValidFieldInputValidator(pattern)
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error if value is invalid without custom message', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError(field))
    expect(error?.message).toBe(`${field} is invalid`)
  })

  test('Should return error if value is invalid with custom message', () => {
    const message = 'The field does not match the regex pattern'
    sut = new ValidFieldInputValidator(pattern, message)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError(field, message))
    expect(error?.message).toBe(message)
  })

  test('Should return falsy is value is valid', () => {
    myObject.uuid = '3582e85c-9aaf-446a-ba60-d2d6caf8ab4f'
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy is value is valid', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldError(field))
    expect(error?.message).toBe(`${field} is invalid`)

    myObject.uuid = '3582e85c-9aaf-446a-ba60-d2d6caf8ab4f'
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
