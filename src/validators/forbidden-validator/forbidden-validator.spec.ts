import { ForbiddenFieldError } from '@errors/forbidden-field-error'
import faker from '@faker-js/faker'
import { ForbiddenFieldInputValidator } from '.'

const objectInitialValue = {
  age: 10,
  anotherField: faker.random.word()
}

describe('ForbiddenFieldInputValidator', () => {
  let sut: ForbiddenFieldInputValidator
  const field = 'age'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new ForbiddenFieldInputValidator()
    sut.setField(field)
    myObject = { ...objectInitialValue }
  })

  test('Should return error if field is present in the schema without custom message', () => {
    const error = sut.validate(myObject)
    expect(error).toEqual(new ForbiddenFieldError(field))
    expect(error?.message).toBe(`${field} is not a valid field`)
  })

  test('Should return error if value is present in the schema with custom message', () => {
    const message = 'The field does not match the regex pattern'
    sut = new ForbiddenFieldInputValidator(message)
    sut.setField(field)
    const error = sut.validate(myObject)
    expect(error).toEqual(new ForbiddenFieldError(field, message))
    expect(error?.message).toBe(message)
  })

  test('Should return falsy if field is not present in the schema', () => {
    myObject.age = undefined as any
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy if field is not present in the schema', () => {
    let error = sut.validate(myObject)
    expect(error).toEqual(new ForbiddenFieldError(field))
    expect(error?.message).toBe(`${field} is not a valid field`)

    myObject.age = undefined as any
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
