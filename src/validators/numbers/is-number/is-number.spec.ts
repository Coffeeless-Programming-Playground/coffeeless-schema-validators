import { DATA_TYPES } from '@constants/data-types'
import { InvalidFieldTypeError } from '@errors/invalid-field-type-error'
import faker from '@faker-js/faker'
import { IsNumberValidator } from '.'

const objectInitialValue = {
  cats: 3 as any,
  anotherField: faker.random.word()
}

describe('IsNumberValidator', () => {
  let sut: IsNumberValidator
  const field = 'cats'
  let myObject = objectInitialValue

  beforeEach(() => {
    sut = new IsNumberValidator()
    sut.setField(field)
    objectInitialValue.cats = 3
    myObject = { ...objectInitialValue }
  })

  test('Should return error without custom message if field is not a number', () => {
    myObject.cats = 'Hello'
    const error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.NUMBER}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.NUMBER}`)
  })

  test('Should return error with custom message if field is not a number', () => {
    const customErrorMessage = 'Input field is not a number'
    sut = new IsNumberValidator(customErrorMessage)
    sut.setField(field)
    myObject.cats = 'Hello'
    const error = sut.validate(myObject)
    expect(error).toEqual(
      new InvalidFieldTypeError(field, `a ${DATA_TYPES.NUMBER}`, customErrorMessage)
    )
    expect(error?.message).toBe(customErrorMessage)
  })

  test('Should return falsy if field is a number', () => {
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  test('Should not perform validation if the validator is optional and the field is not present', () => {
    sut = new IsNumberValidator(undefined, true)
    sut.setField(field)
    myObject[field] = undefined as any
    const error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })

  /**
   * This test acts as the user fixing a validation error through a form input update.
   */
  test('Should return error first and then falsy when field is a number', () => {
    myObject.cats = 'Hello'
    let error = sut.validate(myObject)
    expect(error).toEqual(new InvalidFieldTypeError(field, `a ${DATA_TYPES.NUMBER}`))
    expect(error?.message).toBe(`${field} is not a ${DATA_TYPES.NUMBER}`)

    myObject.cats = 3
    error = sut.validate(myObject)
    expect(error).toBeFalsy()
  })
})
