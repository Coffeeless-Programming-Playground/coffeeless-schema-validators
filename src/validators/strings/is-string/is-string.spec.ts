import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsStringValidator } from '.'

const objectInitialValue = {
  name: faker.random.alphaNumeric(5) as any,
  anotherField: faker.random.word()
}

describe('IsStringValidator', () => {
  let sut: IsStringValidator
  const field = 'name'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsStringValidator()
    sut.setField(field)
    objectInitialValue.name = faker.random.alphaNumeric(5)
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not a string', () => {
    myObject.name = 1
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.STRING}`)
  })

  test('Should return error with custom message if field is not a string', () => {
    const customErrorMessage = 'Input field is not a string'
    sut = new IsStringValidator(customErrorMessage)
    sut.setField(field)
    myObject.name = 1
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `a ${DATA_TYPES.STRING}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is a string', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should not perform validation if the validator is optional and the field is not present', () => {
    sut = new IsStringValidator(undefined, true)
    sut.setField(field)
    myObject[field] = undefined as any
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is a string', () => {
    myObject.name = 1
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.STRING}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.STRING}`)

    myObject.name = faker.random.alphaNumeric(5)
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
